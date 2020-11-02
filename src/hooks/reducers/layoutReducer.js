export default (state, action) => {
  switch (action.type) {
    case 'COVER': {
      return 'img-fit--cover'
    }

    case 'FILL': {
      return 'img-fit--fill'
    }

    case 'SCALEDOWN' : {
      return 'img-fit--scale'
    }

    case 'CONTAIN' : {
      return 'img-fit--contain'
    }
    default:
      return state
  }
}