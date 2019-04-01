import _ from 'lodash';

const initialState = {
  isFetching: false,
  advanced: false,
  mapfilter: false,
  center2selected: false,
  zoom2selected: false,
  extent: null,
  filter: {
    refresh: 0,
    identifier: '',
    public_name: '',
    project_name: '',
    kind: null,
    method: null,
    purpose: null,
    landuse: null,
    restriction: null,
    restriction_until_from: '',
    restriction_until_to: '',
    drilling_date_from: '',
    drilling_date_to: '',
    elevation_z_from: '',
    elevation_z_to: '',
    length_from: '',
    length_to: '',
    top_bedrock_from: '',
    top_bedrock_to: '',
    groundwater: -1,
    status: null,
    extent: null,
    canton: null,
    municipality: null,
    address: '',
    cuttings: null,
    drill_diameter_from: '',
    drill_diameter_to: '',
    bore_inc_from: '',
    bore_inc_to: '',
    bore_inc_dir_from: '',
    bore_inc_dir_to: '',
    lit_pet_top_bedrock: null,
    lit_str_top_bedrock: null,
    chro_str_top_bedrock: null
  }
};

const search = (
    state = {
      ...initialState,
      filter: {
        ...initialState.filter
      }
    }, action) => {
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
    case 'SEARCH_CENTER2_CHANGED': {
      if(action.active === true){
        return {
          ...state,
          center2selected: action.active
        };
      }
      return {
        ...state,
        center2selected: action.active
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
    case 'SEARCH_FILTER_RESET_RESTRICTION': {
      const copy = {...state};
      copy.filter.restriction_until_from = '';
      copy.filter.restriction_until_to = '';
      return copy;
    }
    case 'SEARCH_FILTER_RESET_DRILLING': {
      const copy = {...state};
      copy.filter.drilling_date_from = '';
      copy.filter.drilling_date_to = '';
      return copy;
    }
    case 'SEARCH_FILTER_RESET_DRILL_DIAMETER': {
      const copy = {...state};
      copy.filter.drill_diameter_from= '';
      copy.filter.drill_diameter_to= '';
      return copy;
    }
    case 'SEARCH_FILTER_RESET_BORE_INC': {
      const copy = {...state};
      copy.filter.bore_inc_from = '';
      copy.filter.bore_inc_to = '';
      return copy;
    }
    case 'SEARCH_FILTER_RESET_BORE_INC_DIR': {
      const copy = {...state};
      copy.filter.bore_inc_dir_from = '';
      copy.filter.bore_inc_dir_to = '';
      return copy;
    }
    case 'SEARCH_FILTER_RESET_ELEVATION': {
      const copy = {...state};
      copy.filter.elevation_z_from = '';
      copy.filter.elevation_z_to = '';
      return copy;
    }
    case 'SEARCH_FILTER_RESET_DEPTH': {
      const copy = {...state};
      copy.filter.length_from = '';
      copy.filter.length_to = '';
      return copy;
    }
    case 'SEARCH_FILTER_RESET_TOP_BEDROCK': {
      const copy = {...state};
      copy.filter.top_bedrock_from = '';
      copy.filter.top_bedrock_to = '';
      return copy;
    }
    case 'SEARCH_FILTER_REFRESH': {
      const copy = {...state};
      copy.filter.refresh = copy.filter.refresh + 1;
      return copy;
    }
    case 'SEARCH_FILTER_RESET': {
      return {
        ...state,
        filter: {
          ...initialState.filter
        }
      };
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
