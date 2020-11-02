const updateLayout = async (layout, post, image, token) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/posts/layout/${post}/${image}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ layout })
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }

}

export default updateLayout