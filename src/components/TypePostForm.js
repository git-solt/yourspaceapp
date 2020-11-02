import React, { useState, useEffect } from 'react'
import uuid from 'uuid/v4'

const TypePostForm = (props) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(true)
  const titleStyle = !props.isDraft ? "post__create" : "post__create post__create--draft"
  const contentStyle = !props.isDraft ? "post__create post__create--content" : "post__create--draft-content"
  const buttonStyle = !props.isDraft ? "button button--margin button--pri" : "button button--margin button--draft button--marginb button--pri"



  const id = uuid()


  useEffect(() => {
    setTitle(props.post.title)
    setContent(props.post.content)
    setPublished(props.post.published)
  }, [props])





  return (
    <form
      className="container__content-center column"
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault()
        props.submitHandler({ title, content, published })
      }}>
      <input
        className={titleStyle}
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => { setTitle(e.target.value) }}
      />
      <textarea
        className={contentStyle}
        name="content"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {props.createPost ?
        <div className="container__content-center-x2 column">
          <h2>Publish</h2>
          <input hidden className="checkbox__input check-id" type="checkbox" name="checkbox" id="checkbox" checked={published} onChange={(e) => {
            published ? setPublished(false) : setPublished(true)

          }} />
          <label className="checkbox" htmlFor="checkbox"></label>
        </div>
        :
        <div className="container__content-center-x2 column">
          <h2>Published</h2>

          <input hidden className="checkbox__input" type="checkbox" name="checkbox" id={`checkbox${id}`} checked={published} onChange={(e) => {
            published ? setPublished(false) : setPublished(true)

          }} />
          <label className="checkbox" htmlFor={`checkbox${id}`}></label>

        </div>
      }
      <button className={buttonStyle} type="submit" disabled={!title || !content}>Add</button>
    </form>
  )
}

TypePostForm.defaultProps = {
  post: {
    title: '',
    content: '',
    published: true
  }
}

export default TypePostForm
