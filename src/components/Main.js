import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Post from '../components/Post'
import LoadPage from './LoadPage'
import postSelector from '../hooks/selectors/postSelector'
import fetchPosts from '../utils/fetchPosts'
import { addPost } from "../redux/generators/posts";

const Main = (props) => {
    let parsed = new DOMParser().parseFromString('&#9679;&#9679;&#9679;', 'text/html')
    const [circles] = useState(parsed.body.innerText)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [skip, setSkip] = useState(5)
    const NO_MORE_POSTS = 'No other posts found'

    function alertError(e) {
        setError(e)
        setTimeout(() => {
            setError('')
        }, 3000)
    }
    useEffect(() => {
        if (props.posts.length > 0) {
            setLoading(false)
        }

        console.log("Main re-rendering")

    }, [props.posts])




    return (
        <div>
            {loading && <LoadPage />}
            {postSelector(props.posts, props.filter).map((cur) => <Post dispatch={props.dispatch}
                token={props.user.token}
                isAdmin={props.user.user.isAdmin}
                key={cur.id}{...cur} />)}
            {props.posts.length > 0 && (
                <div className="tooltip container container__content-center tiny link-button--fetch-post">
                    <p className="max" onClick={(e) => {
                        fetchPosts({ limit: 5, skip })
                            .then(data => {
                                if (data.length > 0) {
                                    data.forEach((cur) => {
                                        const { title, content, published, _id: id, createdAt, pics, owner } = cur
                                        if (!props.posts.some(cur => cur.id === id)) {
                                            props.dispatch(addPost({ title, content, published, id, createdAt, pics, owner }))
                                            setSkip(5)
                                        } else {
                                            alertError(NO_MORE_POSTS)
                                        }

                                    })
                                } else alertError(NO_MORE_POSTS)
                            })
                    }}>{error || circles}</p>
                    <span className="tooltip--hint">More posts</span>
                </div>)}

        </div>
    )
}

const mapStateToProps = (state) => ({
    posts: state.posts,
    user: state.authentication,
    filter: state.filter
})


export default connect(mapStateToProps)(Main)
