const setAuth = (user, token) => ({
  type: 'LOGIN',
  user,
  token
})

const clearAuth = () => ({
  type: 'LOGOUT'
})

export {clearAuth, setAuth}
