const createPost = async ({title, content, published = true}, token, id) => {
  
  const post = {
    title,
    published,
    content
  }


  const url = !id ? `${process.env.BASE_URL}/posts/addPost` : `${process.env.BASE_URL}/drafts/${id}`
  

    try {
      const request = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(post)
      })

      return await request.json()

    } catch (error) {
      console.log({error})
    }
}

export default createPost