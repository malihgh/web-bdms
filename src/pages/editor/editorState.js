const initialState = {
  pselected: null,
  bselected: null,
  mselected: null
}

const editor = (state = initialState, action) => {
  switch (action.type) {
    case 'EDITOR_PROJECT_SELECTED': {
      return {
        ...state,
        pselected: action.selected
      }
    }
    case 'EDITOR_BOREHOLE_SELECTED': {
      return {
        ...state,
        bselected: action.selected
      }
    }
    case 'EDITOR_MULTIPLE_SELECTED': {
      return {
        ...state,
        mselected: action.selection
      }
    }
    default:
      return state;
  }
}

export default editor
