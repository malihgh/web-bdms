const initialState = {
  isFetching: false,
  filter: {
    identifier: ''
  }
}

const search = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_INDENTIFIER_CHANGED': {
      return {
        ...state,
        filter: {
          ...state.filter,
          identifier: action.identifier
        }
      }
    }
    default:
      return state
  }
}

export default search
