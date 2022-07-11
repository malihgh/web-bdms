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
    borehole_identifier: null,
    identifier_value: '',
    identifier: '',
    alternate_name: '',
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
    lithology_top_bedrock: null,
    lithostratigraphy_top_bedrock: null,
    chronostratigraphy_top_bedrock: null,

    // Layers filter
    layer_depth_from: '',
    layer_depth_to: '',

    layer_depth_from_from: '',
    layer_depth_from_to: '',

    layer_depth_to_from: '',
    layer_depth_to_to: '',

    layer_description: '',
    layer_geology: '',

    layer_lithology: null,
    layer_lithostratigraphy: null,
    layer_chronostratigraphy: null,

    layer_color: null,
    layer_plasticity: null,
    layer_humidity: null,
    layer_consistance: null,
    layer_alteration: null,
    layer_compactness: null,
    layer_organic_component: null,
    layer_striae: null,
    layer_grain_size_1: null,
    layer_grain_size_2: null,
    layer_grain_shape: null,
    layer_grain_granularity: null,
    layer_cohesion: null,
    layer_further_properties: null,
    layer_uscs_1: null,
    layer_uscs_2: null,
    layer_uscs_3: null,
    layer_uscs_determination: null,
    layer_debris: null,
    layer_lit_pet_deb: null,
  },
};

const search = (
  state = {
    ...initialState,
    filter: {
      ...initialState.filter,
    },
    stratigraphyFilter: {
      ...initialState.stratigraphyFilter,
    },
  },
  action,
) => {
  switch (action.type) {
    case 'SEARCH_MAPFILTER_CHANGED': {
      if (action.active === true) {
        return {
          ...state,
          filter: {
            ...state.filter,
            extent: state.extent,
          },
          mapfilter: action.active,
        };
      }
      return {
        ...state,
        filter: {
          ...state.filter,
          extent: null,
        },
        mapfilter: action.active,
      };
    }
    case 'SEARCH_CENTER2_CHANGED': {
      if (action.active === true) {
        return {
          ...state,
          center2selected: action.active,
        };
      }
      return {
        ...state,
        center2selected: action.active,
      };
    }
    case 'SEARCH_ZOOM2_CHANGED': {
      if (action.active === true) {
        return {
          ...state,
          zoom2selected: action.active,
        };
      }
      return {
        ...state,
        zoom2selected: action.active,
      };
    }
    case 'SEARCH_FILTER_CHANGED': {
      const copy = { ...state };

      let keys = [];

      if (_.isArray(action.key)) {
        keys = action.key;
      } else {
        keys = [action.key];
      }

      for (let index = 0; index < keys.length; index++) {
        const path = `filter.${keys[index]}`;
        if (_.has(copy, path)) {
          if (_.isNil(action.value) || action.value === '') {
            if (_.isString(action.value)) {
              _.set(copy, path, '');
            } else {
              _.set(copy, path, null);
            }
          } else {
            _.set(copy, path, action.value);
          }
        }
      }

      return copy;
    }
    case 'SEARCH_FILTER_RESET_IDENTIFIER': {
      const copy = { ...state };
      copy.filter.borehole_identifier = null;
      copy.filter.identifier_value = '';
      return copy;
    }
    case 'SEARCH_FILTER_RESET_RESTRICTION': {
      const copy = { ...state };
      copy.filter.restriction_until_from = '';
      copy.filter.restriction_until_to = '';
      return copy;
    }
    case 'SEARCH_FILTER_RESET_DRILLING': {
      const copy = { ...state };
      copy.filter.drilling_date_from = '';
      copy.filter.drilling_date_to = '';
      return copy;
    }
    case 'SEARCH_FILTER_RESET_DRILL_DIAMETER': {
      const copy = { ...state };
      copy.filter.drill_diameter_from = '';
      copy.filter.drill_diameter_to = '';
      return copy;
    }
    case 'SEARCH_FILTER_RESET_BORE_INC': {
      const copy = { ...state };
      copy.filter.bore_inc_from = '';
      copy.filter.bore_inc_to = '';
      return copy;
    }
    case 'SEARCH_FILTER_RESET_BORE_INC_DIR': {
      const copy = { ...state };
      copy.filter.bore_inc_dir_from = '';
      copy.filter.bore_inc_dir_to = '';
      return copy;
    }
    case 'SEARCH_FILTER_RESET_ELEVATION': {
      const copy = { ...state };
      copy.filter.elevation_z_from = '';
      copy.filter.elevation_z_to = '';
      return copy;
    }
    case 'SEARCH_FILTER_RESET_DEPTH': {
      const copy = { ...state };
      copy.filter.length_from = '';
      copy.filter.length_to = '';
      return copy;
    }
    case 'SEARCH_FILTER_RESET_TOP_BEDROCK': {
      const copy = { ...state };
      copy.filter.top_bedrock_from = '';
      copy.filter.top_bedrock_to = '';
      return copy;
    }
    case 'SEARCH_FILTER_REFRESH': {
      const copy = { ...state };
      copy.filter.refresh = copy.filter.refresh + 1;
      return copy;
    }
    case 'SEARCH_FILTER_RESET': {
      return {
        ...state,
        filter: {
          ...initialState.filter,
        },
      };
    }
    case 'SEARCH_EXTENT_CHANGED': {
      if (state.mapfilter === true) {
        return {
          ...state,
          extent: action.extent,
          filter: {
            ...state.filter,
            extent: action.extent,
          },
        };
      }
      return {
        ...state,
        extent: action.extent,
      };
    }

    default:
      return state;
  }
};

export default search;
