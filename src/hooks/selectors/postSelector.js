const postSelector = (posts, filter) => {
  const { title, content } = filter
  
  return (() => {
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
  })().sort((a,b)=> {
    if(a.createdAt === b.createdAt) return 0
    return a.createdAt > b.createdAt ? -1 : 1
  })

}

export default postSelector