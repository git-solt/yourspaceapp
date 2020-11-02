const fetchPosts = async ({limit, skip}={}) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/posts?limit=${limit}&skip=${skip}`)
    return response.json()
  } catch (error) {
    return {error}
  }
}

const fetchDrafts = async (token) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/posts/drafts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.json()
  } catch (error) {
    return {error}
  }
}

export {fetchDrafts, fetchPosts as default }

