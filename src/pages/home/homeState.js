const initialState = {
  cnt: 0,
  selected: null
}

const home = (state = initialState, action) => {
  switch (action.type) {
    case 'HOME_BOREHOLE_SELECTED': {
      return {
        ...state,
        selected: action.borehole
      }
    }
    default:
      return state;
  }
}

export default home
