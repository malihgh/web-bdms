import _ from 'lodash';

import {
  boreholeTmpl
} from '../../commons/form/borehole/boreholeForm';

const initialState = {
  isFetching: false,
  pathching: [],
  rtime: 0, // fetch time
  fcnt: 0, // fetch counter
  data: {
    boreholetable: {
      orderby: null,
      direction: null
    },
    filter: {
      mapfilter: true,
      zoom2selected: true,
      kind: true,
      restriction: true,
      restriction_until: true,
      location_x: true,
      location_y: true,
      srs: true,
      elevation_z: true,
      hrs: true,
      drilling_date: true,
      bore_inc: true,
      bore_inc_dir: true,
      length: true,
      extended: {
        original_name: true,
        method: true,
        purpose: true,
        status: true,
        top_bedrock: true,
        groundwater: true
      },
      custom: {
        public_name: true,
        project_name: true,
        canton: true,
        city: true,
        address: true,
        landuse: true,
        cuttings: true,
        drill_diameter: true,
        lit_pet_top_bedrock: true,
        lit_str_top_bedrock: true,
        chro_str_top_bedrock: true,
        remarks: true,
        mistakes: true,
        processing_status: true,
        national_relevance: true,
        attributes_to_edit: true
      }
    }
  }
};

const setting = (state = initialState, action) => {
  const {path} = action;
  if(path === '/setting'){
    switch (action.type) {
      case 'GET': {
        return {
          ...initialState,
          rtime: (
            new Date()
          ).getTime(),
          isFetching: true
        };
      }
      case 'GET_OK': {
        let copy = {
          ...state,
          fcnt: (state.fcnt + 1),
          isFetching: false,
          rtime: (
            new Date()
          ).getTime() - state.rtime,
          data: _.merge(state.data, action.json.data)
        }
        return copy
      }
      case 'PATCH': {
        const copy = {...state};
        _.set(
          copy, `data.${action.field}`, action.value
        );
        return copy;
      }
      default:
        return state;
    }
  }
  switch (action.type) {
    case 'SETTING_TOGGLE_FILTER': {
      const copy = {...state};
      _.set(
        copy, `data.filter.${action.filter}`, action.enabled
      );
      return copy;
    }
    default:
      return state;
  }
};

export default setting;
