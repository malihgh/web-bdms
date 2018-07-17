const initialState = {
  isFetching: false,
  borehole: null
}

const detail_borehole = (state = initialState, action) => {
  switch (action.type) {
    case 'GETBOREHOLEDETAILS': {
      return {
        ...initialState,
        isFetching: true
      }
    }
    case 'GETBOREHOLEDETAILS_OK': {
      return {
        ...state,
        isFetching: false,
        borehole: action.borehole
      }
    }
    default:
      return state;
  }
}

export default detail_borehole
