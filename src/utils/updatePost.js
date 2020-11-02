const updatePost = async (post, token, id, draft) => {
  
  const url = draft === true ? `${process.env.BASE_URL}/posts/drafts/${id}` : `${process.env.BASE_URL}/posts/${id}` 

  const updates= {...post}

  try {
    const request = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updates)
    })
  
    return request.json()
  } catch (error) {
    console.log({error})
  }

}

export default updatePost