const deletePost = async (id, token) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return response.json()
  } catch (error) {
    return {error}
  }
}

export default deletePost