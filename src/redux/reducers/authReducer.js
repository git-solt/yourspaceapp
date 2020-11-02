const initialState = {
  user: {},
  token: undefined
}


const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN' : {
      return {
        user: action.user,
        token: action.token
      }     
    }

    case 'LOGOUT' : {
      return {
        user: {},
        token: undefined
      }
    }

    default: 
      return state
  }
}


export default authReducer