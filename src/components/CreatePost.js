import React from 'react'
import TypePostForm from './TypePostForm'
import createPost from '../utils/createPost'
import { connect } from 'react-redux'
import { addPost } from '../redux/generators/posts'



const CreatePost = (props) => {
  const submitHandler = (postContent) => {
  
    
    createPost(postContent, props.user.token)
      .then(({content, title, published, _id:id, images, createdAt, owner}) => {
        if (published) {
          createdAt = Date.now(createdAt)
          props.dispatch(addPost({content, title, published, id, images, createdAt, owner},true))
        }
        props.history.push('/')
      })
      .catch(e => console.log({e}))
  }

  return (
    <div className="container container--full">
      <h2>Go ahead and make a new post</h2>
      <TypePostForm className="container__flex" createPost={true} submitHandler={submitHandler}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  user: state.authentication
})


export default connect(mapStateToProps)(CreatePost)