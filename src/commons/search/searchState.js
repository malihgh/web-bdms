const initialState = {
  isFetching: false,
  mapfilter: false,
  extent: null,
  filter: {
    identifier: '',
    kind: null,
    restriction: null,
    status: null,
    extent: null
  }
}

const search = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_MAPFILTER_CHANGED': {
      if(action.active === true){
        return {
          ...state,
          filter: {
            ...state.filter,
            extent: state.extent
          },
          mapfilter: action.active
        }
      }
      return {
        ...state,
        filter: {
          ...state.filter,
          extent: null
        },
        mapfilter: action.active
      }
    }
    case 'SEARCH_INDENTIFIER_CHANGED': {
      return {
        ...state,
        filter: {
          ...state.filter,
          identifier: action.identifier
        }
      }
    }
    case 'SEARCH_KIND_CHANGED': {
      return {
        ...state,
        filter: {
          ...state.filter,
          kind: action.id
        }
      }
    }
    case 'SEARCH_RESTRICTION_CHANGED': {
      return {
        ...state,
        filter: {
          ...state.filter,
          restriction: action.id
        }
      }
    }
    case 'SEARCH_STATUS_CHANGED': {
      return {
        ...state,
        filter: {
          ...state.filter,
          status: action.id
        }
      }
    }
    case 'SEARCH_EXTENT_CHANGED': {
      if(state.mapfilter === true){
        return {
          ...state,
          extent: action.extent,
          filter: {
            ...state.filter,
            extent: action.extent
          }
        }
      }
      return {
        ...state,
        extent: action.extent
      }
    }
    default:
      return state
  }
}

export default search
