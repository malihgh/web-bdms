const initialState = {
  isFetching: false,
  isReady: false,
  coreCantonList: false,
  coreDomainList: false,
  coreUser: false
};

const dataLoaderState = (state = initialState, action) => {
  const { path } = action;
  if (
    path !== '/geoapi/canton'
    && path !== '/borehole/codes'
    && path !== '/user'
  ) {
    return state;
  }
  let copy = {
    ...state
  };
  if (path === '/geoapi/canton'){
    switch (action.type) {
      case 'LIST_OK':
        copy.coreCantonList = true;
        break;

      default:
        return state;
    }
  } else if (path === '/borehole/codes'){
    switch (action.type) {
      case 'LIST_OK':
        copy.coreDomainList = true;
        break;

      default:
        return state;
    }
  } else if (path === '/user'){
    switch (action.type) {
      case 'GET_OK':
        copy.coreUser = true;
        break;

      case 'UNSET_AUTHENTICATION':
        copy.coreUser = false;
        copy.isReady = false;
        break;

      default:
        return state;
    }
  }
  if (copy.coreUser && copy.coreUser && copy.coreCantonList){
    copy.isReady = true;
  }

  return copy;
};

export default dataLoaderState;
