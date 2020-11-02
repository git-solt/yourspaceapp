export default (state, action) => {
  switch (action.type) {
    case 'ADD_DRAFT': {
      return state.concat({
        ...action.draft
      })
    }
    case 'REMOVE_IMAGE': {
      return state.map((cur) => {


        if (cur._id === action.id) {
          return {
            ...cur,
            pics: cur.pics.filter((image) => image.image !== action.image)
          }
        } else {
          return cur
        }
      })
    }
    case 'ADD_IMAGE': {
      return state.map((cur) => {


        if(cur._id === action.id) {
          return {
            ...cur,
            pics: cur.pics.filter((cur) => cur.image !== 'loader').concat(action.image)
          }
        }

          return cur

      })
    }
    default:
      return state
  }
}

