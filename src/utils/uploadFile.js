const uploadFile = async (file, id, token) => {
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await fetch(`${process.env.BASE_URL}/posts/image/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })

    return response
  } catch (error) {
    return {error}
  }

}

export default uploadFile