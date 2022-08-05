import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as Styled from './styles';
import { Checkbox } from 'semantic-ui-react';
import TranslationText from '../../../translationText';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { getData, sendAttribute } from './api';
import ProfileAttributeList from './components/profileAttributeList/profileAttributeList';
import { useSelector } from 'react-redux';

const ProfileAttributes = props => {
  const { id, isEditable, onUpdated, attribute, reloadAttribute } = props.data;
  const { codes, geocode } = useSelector(state => ({
    codes: state.core_domain_list,
    geocode: 'Geol',
  }));

  const { t } = useTranslation();

  const [showAll, setShowAll] = useState(false);
  const [state, setState] = useState({
    isFetching: false,
    isPatching: false,
    allfields: false,
    updateAttributeDelay: {},
    layer: {
      id: id?.hasOwnProperty('id') ? id : null,
      kind: null,
      depth_from: null,
      depth_to: null,
      lithological_description: '',
      facies_description: '',
      last: null,
      qt_description: null,
      lithology: null,
      lithostratigraphy: null,
      chronostratigraphy: null,
      tectonic_unit: null,
      // symbol: null,
      color: [],
      plasticity: null,
      humidity: null,
      consistance: null,
      alteration: null,
      compactness: null,
      jointing: [],
      soil_state: null,
      organic_component: [],
      striae: null,
      grain_size_1: null,
      grain_size_2: null,
      grain_shape: [],
      grain_granularity: [],
      cohesion: null,
      uscs_1: null,
      uscs_2: null,
      uscs_3: [],
      uscs_original: '',
      uscs_determination: [],
      unconrocks: null,
      debris: [],
      lithology_top_bedrock: [],
      gradation: null,
      lithok: null,
      kirost: null,
      notes: '',
      fill_material: null,
      casing_id: null,
      casing_kind: null,
      casing_material: null,
      casing_date_spud: null,
      casing_date_finish: null,
      casing_innder_diameter: null,
      casing_outer_diameter: null,
      fill_kind: null,
    },
  });

  const mounted = useRef(false);

  const load = useCallback(id => {
    getData(id).then(data => {
      if (mounted.current) {
        setState({
          isFetching: false,
          layer: data,
        });
      }
    });
  }, []);

  useEffect(() => {
    mounted.current = true;

    if (id && mounted.current) {
      load(id);
      setShowAll(false);
    } else if (id === null) {
      setState({ state: null });
    }
    return () => {
      mounted.current = false;
    };
  }, [id, reloadAttribute, load]);

  const updateChange = (attribute, value, to = true, isNumber = false) => {
    if (!isEditable) {
      alert(t('common:errorStartEditing'));
      return;
    }

    setState(prevState => ({ ...prevState, isPatching: true }));
    _.set(state.layer, attribute, value);

    if (isNumber) {
      if (value === null) {
        patch(attribute, value);
      } else if (/^-?\d*[.,]?\d*$/.test(value)) {
        patch(attribute, _.toNumber(value));
      }
    } else {
      patch(attribute, value);
    }
  };

  const patch = (attribute, value) => {
    clearTimeout(state.updateAttributeDelay?.[attribute]);

    let setDelay = setTimeout(() => {
      sendAttribute(state?.layer?.id, attribute, value).then(response => {
        if (response) {
          onUpdated(attribute);
        }
      });
    }, 500);

    Promise.resolve().then(() => {
      setState(prevState => ({
        ...prevState,
        isPatching: false,
        updateAttributeDelay: { [attribute]: setDelay },
      }));
    });
  };

  const isVisibleFunction = field => {
    if (_.has(codes, 'data.layer_kind') && _.isArray(codes.data.layer_kind)) {
      for (let idx = 0; idx < codes.data.layer_kind.length; idx++) {
        const element = codes.data.layer_kind[idx];
        if (element.code === geocode) {
          if (
            _.isObject(element.conf) &&
            _.has(element.conf, `fields.${field}`)
          ) {
            return element.conf.fields[field];
          } else {
            return false;
          }
        }
      }
    }
    return false;
  };

  const showCheckbox = () => {
    let isVisibleCounter = 0;

    for (let i = 0; i < attribute?.length; i++) {
      if (isVisibleFunction(attribute[i]?.isVisibleValue)) {
        isVisibleCounter++;
      } else if (attribute[i]?.isVisible) {
        isVisibleCounter++;
      }
    }

    if (isVisibleCounter === attribute?.length) {
      return false;
    } else return true;
  };
  return (
    <Styled.Container disable={!id}>
      {showCheckbox() && (
        <Styled.CheckboxContainer>
          <TranslationText id="showallfields" />
          <Checkbox
            checked={showAll}
            onChange={() => setShowAll(!showAll)}
            toggle
          />
        </Styled.CheckboxContainer>
      )}

      {attribute && (
        <ProfileAttributeList
          data={{
            attribute,
            showAll,
            updateChange,
            layer: state.layer,
            isVisibleFunction,
          }}
        />
      )}
    </Styled.Container>
  );
};

export default ProfileAttributes;
