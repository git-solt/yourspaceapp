import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import uploadFile from '../utils/uploadFile'
import { patchPost, addPost } from '../redux/generators/posts'

const UploadImage = (props) => {



  const [error, setError] = useState(undefined)
  return (
    <div className="container">
      {error && <p className="msg msg--alert container--text-center">{error}</p>}
      <form className="container container__flex">
        <label className="button button--border button--pri" htmlFor="fileInput" >Upload file</label>
        <input id="fileInput" className="hidden-default-file-browser-button" type='file' onChange={(e) => {
          const file = e.target.files[0]
          if(!file.type.match(/^image\/(png|jpg|jpeg)$/)) {
            setError('Can only upload image files')
            return e.target.value = ''
          }
          uploadFile(file, props.id, props.user.token)
            .then(res => res.json())
            .then(({ _id, title, published, content, pics }) => {
              props.setUpload(false)

              props.dispatch(patchPost(props.id, { title, published, content, pics }))
              if(!published) {
                
                props.dispatchDraft({type: 'ADD_IMAGE',id: props.id || _id, 'image': pics[pics.length - 1]})
              }
            })
            .catch(err => setError('Could not upload. Please retry'))

            //to display loader gif
            props.dispatch(patchPost(props.id, {published: true, pics: props.pics.concat({_id: 'loader', image: 'loader'})}))
            if (!props.published) {
              props.dispatchDraft({type:'ADD_IMAGE', id: props.id || _id, image: {image:'loader'}})
            }
        }} />
      </form>
    </div>
  )
}

UploadImage.defaultProps = {
  pics: []
}
const mapStateToProps = (state) => ({
  posts: state.posts,
  user: state.authentication

})


export default connect(mapStateToProps)(UploadImage)