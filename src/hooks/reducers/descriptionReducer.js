export default (state, action) => {
  switch (action.type) {
    case 'ADD_DESCRIPTION': {
      return state.concat(action.descriptions)
    }

    case 'REMOVE_DESCRIPTION' : {

      return state.filter((cur) => cur._id !== action.id)
    }
    default:
      return state
  
    
  }
}