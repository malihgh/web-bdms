import _ from 'lodash';

const initialState = {
  isFetching: false,
  filter: {
    refresh: 1,
    project_name: '',
    project: null,
    last_update: '',
    creation: '',
    original_name: '',
    completness: 'all',
    kind: null,
    restriction: null,
    status: null
  }
}

const searchEditor = (
    state = {
      ...initialState,
      filter: {
        ...initialState.filter
      }
    }, action) => {
  switch (action.type) {
    case 'SEARCH_EDITOR_FILTER_CHANGED': {
      const copy = {...state};
      const path = `filter.${action.key}`;
      if (_.has(copy, path)){
        if (_.isNil(action.value) || action.value===''){
          if (_.isString(action.value)){
            _.set(copy, path, '');
          }else{
            _.set(copy, path, null);
          }
        } else {
          _.set(copy, path, action.value);
        }
      }
      return copy;
    }
    case 'SEARCH_EDITOR_FILTER_REFRESH': {
      const copy = {...state};
      copy.filter.refresh = copy.filter.refresh + 1;
      return copy;
    }
    case 'SEARCH_EDITOR_FILTER_RESET': {
      return {
        ...state,
        filter: {
          ...initialState.filter
        }
      };
    }
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
