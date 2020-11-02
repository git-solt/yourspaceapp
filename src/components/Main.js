import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import Post from '../components/Post'
import LoadPage from './LoadPage'
import postSelector from '../hooks/selectors/postSelector'
import fetchPosts from '../utils/fetchPosts'
import {addPost} from "../redux/generators/posts";

const Main = (props) => {
    let parsed = new DOMParser().parseFromString('&#9679;&#9679;&#9679;', 'text/html')
    const [circles] = useState(parsed.body.innerText)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [skip, setSkip] = useState(5)
    useEffect(() => {
        if (props.posts.length > 0) {
            setLoading(false)
        }

        console.log("Main re-rendering")

    }, [props.posts])

    // useEffect(() => {
    //   fetchPosts()
    //     .then((posts) => {
    //       posts.forEach(({title, content, published, _id:id}) => {
    //         props.dispatch(addPost({title, content, published, id}))

    //       })

    //     })

    //     return () => props.dispatch(clearPosts())

    // }, [])

    // useEffect(() => {
    //   console.log(props.posts)
    // }, [props.posts])


    return (
        <div>
            {loading && <LoadPage/>}
            {postSelector(props.posts, props.filter).map((cur) => <Post dispatch={props.dispatch}
                                                                        token={props.user.token}
                                                                        isAdmin={props.user.user.isAdmin}
                                                                        key={cur.id}{...cur} />)}
            {props.posts.length > 0 && <p onClick={(e) => {
                fetchPosts({limit: 5, skip})
                    .then(data => {
                        if (data.length > 0) {
                            data.forEach((cur) => {
                                const {title, content, published, _id: id, createdAt, pics, owner} = cur
                                if (!props.posts.some(cur => cur.id === id)) {
                                    props.dispatch(addPost({title, content, published, id, createdAt, pics, owner}))
                                    console.log(data)
                                    setSkip(5)
                                } else {
                                    setError('No other posts found')
                                    setTimeout(() => {
                                        setError('')
                                    }, 3000)
                                }

                            })
                        }
                    })
            }}>{error || circles}</p>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    posts: state.posts,
    user: state.authentication,
    filter: state.filter
})


export default connect(mapStateToProps)(Main)
