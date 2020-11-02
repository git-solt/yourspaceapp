const deleteImage = async (id, imageId, token) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/posts/${id}/deleteimage/${imageId}`, {
      method: 'DELETE',
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
    return response.json()
  } catch (error) {
    return {error}
  }
}

export default deleteImage