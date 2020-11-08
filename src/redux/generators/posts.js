const addPost = ({title, content, published = true, id, pics, owner, createdAt} = {}, first = false) => {

  createdAt = new Date(createdAt).valueOf()

  return {
    type: 'ADD_POST',
    post: {
      title,
      content,
      published,
      id,
      pics,
      owner,
      createdAt
    },
    first
  }
}


const clearPosts = () => ({
  type: 'CLEAR_POSTS'
})

const deletePost = (id) => ({
  type: 'DELETE_POST',
  id
})

const patchPost = (id, updates) => ({
  type: 'UPDATE_POST',
  id,
  updates
})

export {addPost , clearPosts, deletePost, patchPost}