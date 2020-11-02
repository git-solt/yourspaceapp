const postSelector = (posts, filter) => {
  const { title, content } = filter
  if (title && !content) {
    return posts.filter((cur) => cur.title.toLowerCase().includes(title.toLowerCase()))
  }

  if (content && !title) {
    return posts.filter((cur) => cur.content.toLowerCase().includes(content.toLowerCase()))

  }

  if (title && content) {
    return posts.filter(cur => cur.title.toLowerCase().includes(title.toLowerCase()) && cur.content.toLowerCase().includes(content.toLowerCase()))
    
  }

  else return posts
}

export default postSelector