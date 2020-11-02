const setCurrentUser = (dispatch, generator) => {
  const token = localStorage.getItem('jwt')
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  if (token && currentUser) {
    dispatch(generator(currentUser, token))
  }

}

export default setCurrentUser