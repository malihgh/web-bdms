const initialState = {
  isFetching: false,
  filter: {
    project_name: '',
    project: null,
    last_update: '',
    creation: '',
    original_name: '',
    completness: 'all'
  }
}

const searchEditor = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_EDITOR_COMPLETNESS_CHANGED': {
      return {
        ...state,
        filter: {
          ...state.filter,
          completness: action.completness
        }
      }
    }
    case 'SEARCH_EDITOR_PROJECT_CHANGED': {
      return {
        ...state,
        filter: {
          ...state.filter,
          project: action.id
        }
      }
    }
    case 'SEARCH_EDITOR_LASTUPDATE_CHANGED': {
      return {
        ...state,
        filter: {
          ...state.filter,
          last_update: action.date
        }
      }
    }
    case 'SEARCH_EDITOR_ORIGINALNAME_CHANGED': {
      return {
        ...state,
        filter: {
          ...state.filter,
          original_name: action.original_name
        }
      }
    }
    case 'SEARCH_EDITOR_CREATION_CHANGED': {
      return {
        ...state,
        filter: {
          ...state.filter,
          creation: action.date
        }
      }
    }
    default:
      return state
  }
}

export default searchEditor
