const initialState = {
  cnt: 0,
  selected: null,
  hover: null
}

const home = (state = initialState, action) => {
  switch (action.type) {
    case 'HOME_BOREHOLE_SELECTED': {
      return {
        ...state,
        selected: action.borehole
      }
    }
    case 'HOME_BOREHOLE_HOVER': {
      return {
        ...state,
        hover: action.borehole
      }
    }
    default:
      return state;
  }
}

export default home
