const startLogOut = async (token, bool = false) => {
  if (typeof bool !== 'boolean') {
    throw new Error('Provide a boolean. If unprovided it defaults to false')
  }
  console.log(token)
  try {
    const url = !bool ? `${process.env.BASE_URL}/users/logout` : `${process.env.BASE_URL}/users/logoutall`
    const request = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return await request
  } catch (error) {
    console.log({error})
  }

}

export default startLogOut