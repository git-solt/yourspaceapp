const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_POST': {

      return [...state,action.post]
    }
    
    case 'CLEAR_POSTS' : {
      return []
    }

    case 'DELETE_POST' : {
      return state.filter(({id}) => id !== action.id) 
    }

    case 'UPDATE_POST' : {
      if (!action.updates.published) {
        return state.filter(({id}) => id !== action.id)
      }

      return state.map((cur) => {
        if(cur.id === action.id) {
          return {
            ...cur,
            ...action.updates
          }
        } else {
          return cur
        }
      })
    }
      
    
  
    default:
      return state
      
  }
}

export default postReducer