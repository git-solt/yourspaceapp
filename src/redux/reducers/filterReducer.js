const initState = {
  title: '',
  content: '',
  createdAt: undefined
}

const filterReducer = (state = initState, action) => {
  switch(action.type) {
    case 'ADD_TITLE' : {
      return {
        ...state,
        title: action.title,
        content: ''
      }
    }
    case 'ADD_CONTENT' : {
      return {
        ...state,
        content: action.content,
        title: ''
      }

    }

    case 'ADD_TITLE_CONTENT' :{
      return {
        ...state,
        title: action.search,
        content: action.search
      }
    }

    default :
    return state
  }
}

export default filterReducer