const startAuthenticating = async ({email, password ,userName}, type = 'login') => {

    const url = type === 'register' ? `${process.env.BASE_URL}/users/${type}` : `${process.env.BASE_URL}/users/login`

    try {
      
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password, userName})
    })
    
      return await response.json()
    } catch (error) {
      console.log({error})
    }
}

export default startAuthenticating