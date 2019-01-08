import _ from 'lodash';

const initialState = {
  isFetching: false,
  advanced: false,
  mapfilter: false,
  zoom2selected: false,
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
        };
      }
      return {
        ...state,
        filter: {
          ...state.filter,
          extent: null
        },
        mapfilter: action.active
      };
    }
    case 'SEARCH_ZOOM2_CHANGED': {
      if(action.active === true){
        return {
          ...state,
          zoom2selected: action.active
        };
      }
      return {
        ...state,
        zoom2selected: action.active
      };
    }
    case 'SEARCH_FILTER_CHANGED': {
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
    case 'SEARCH_EXTENT_CHANGED': {
      if(state.mapfilter === true){
        return {
          ...state,
          extent: action.extent,
          filter: {
            ...state.filter,
            extent: action.extent
          }
        };
      }
      return {
        ...state,
        extent: action.extent
      };
    }
    default:
      return state;
  }
}

export default search
