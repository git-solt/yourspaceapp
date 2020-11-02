import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import TypePostForm from './TypePostForm'
import updatePost from '../utils/updatePost'
import removePost from '../utils/removePost'
import { deletePost, patchPost } from '../redux/generators/posts'

const EditPost = (props) => {
  const [post, setPost] = useState([])

  const submitHandler = (update) => {
    updatePost(update, props.user.token, post.id)
      .then(({ title, content, published, _id: id }) => {

        props.dispatch(patchPost(id, { title, content, published }))
        // if(published) { 
        //   props.dispatch(addPost({title, content, published, id}))
        //   //else dispatch an action that removes the post
        // } else {
        //   props.dispatch(deletePost(id))
        // }
        props.history.push('/')
      })
      .catch(e => console.log(e))
  }



  useEffect(() => {

    const post = props.posts.find(({ id }) => id === props.match.params.id)

    if (!post) {
      props.history.push('/')
    }
    setPost(post)

  }, [])
  return (
    <div className="container">
      <h2>Edit the post</h2>
      <div className="container">
      </div>
      <div className="container__flexfooter">
        <div className="container__flexfooter--mc50">
          <TypePostForm submitHandler={submitHandler} post={post} />

        </div>
        <div className="container container--text-center">
          <button className="button button--delete" onClick={(e) => {
            removePost(post.id, props.user.token)
              .then(({ removed }) => {

                props.dispatch(deletePost(removed._id))
                props.history.push('/')
              })
          }}>Delete Post</button>
        </div>

      </div>
    </div>
  )
}


const mapStateToProps = (state) => ({
  posts: state.posts,
  user: state.authentication
})

export default connect(mapStateToProps)(EditPost)