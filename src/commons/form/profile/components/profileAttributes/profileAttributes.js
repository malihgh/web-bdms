import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as Styled from './styles';
import { Checkbox, Input, TextArea, Form } from 'semantic-ui-react';
import TranslationText from '../../../translationText';
import DomainDropdown from '../../../domain/dropdown/domainDropdown';
import DomainTree from '../../../domain/tree/domainTree';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { getData, sendAttribute } from './api';

const ProfileAttributes = props => {
  const { id, isEditable, onUpdated, attribute, reloadAttribute } = props.data;

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
      description: '',
      geology: '',
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
      further_properties: [],
      uscs_1: null,
      uscs_2: null,
      uscs_3: [],
      uscs_original: '',
      uscs_determination: [],
      unconrocks: null,
      debris: [],
      lit_pet_deb: [],
      lithok: null,
      kirost: null,
      notes: '',
      fill_material: null,
      casing_kind: null,
      casing_material: null,
      casing_drilling: null,
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

  return (
    <Styled.Container disable={!id}>
      <Styled.CheckboxContainer>
        <Checkbox
          checked={showAll}
          onChange={() => setShowAll(!showAll)}
          toggle
        />
        <TranslationText id="showallfields" />
      </Styled.CheckboxContainer>

      {attribute &&
        attribute.map((item, key) => (
          <Form autoComplete="false" error key={key}>
            <Styled.AttributesContainer required={item.require}>
              {(item.isVisible || showAll) && (
                <Styled.Label>
                  <TranslationText id={item.label} />
                </Styled.Label>
              )}
              {item.type === 'Input' && (item.isVisible || showAll) && (
                <Styled.AttributesItem>
                  <Input
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={e =>
                      updateChange(
                        item.value,
                        e.target.value === '' ? null : e.target.value,
                        item?.to,
                        item?.isNumber,
                      )
                    }
                    spellCheck="false"
                    style={{ width: '100%' }}
                    value={
                      _.isNil(state?.layer?.[item.value])
                        ? ''
                        : state.layer[item.value]
                    }
                  />
                </Styled.AttributesItem>
              )}

              {item.type === 'TextArea' && (item.isVisible || showAll) && (
                <Styled.AttributesItem>
                  <TextArea
                    onChange={e => updateChange(item.value, e.target.value)}
                    style={{ width: '100%' }}
                    value={
                      _.isNil(state?.layer?.[item.value])
                        ? ''
                        : state.layer[item.value]
                    }
                  />
                </Styled.AttributesItem>
              )}

              {item.type === 'Radio' && (item.isVisible || showAll) && (
                <Form.Group style={{ display: 'flex', paddingTop: '5px' }}>
                  <Form.Radio
                    checked={
                      _.isNil(state?.layer?.[item.value])
                        ? false
                        : state.layer[item.value]
                    }
                    label={'Yes'}
                    onChange={() => updateChange(item.value, true, item?.to)}
                    style={{ paddingRight: '20px' }}
                  />
                  <Form.Radio
                    checked={
                      _.isNil(state?.layer?.[item.value])
                        ? false
                        : !state.layer[item.value]
                    }
                    label={'No'}
                    onChange={() => updateChange(item.value, false, item?.to)}
                  />
                </Form.Group>
              )}

              {item.type === 'Dropdown' && (item.isVisible || showAll) && (
                <Styled.AttributesItem>
                  <DomainDropdown
                    multiple={item.multiple}
                    onSelected={e =>
                      updateChange(
                        item.value,
                        item.multiple ? e.map(mlpr => mlpr.id) : e.id,
                        false,
                      )
                    }
                    schema={item.schema}
                    search={item.search}
                    selected={
                      _.isNil(state?.layer?.[item.value])
                        ? null
                        : state.layer[item.value]
                    }
                  />
                </Styled.AttributesItem>
              )}

              {item.type === 'DomainTree' && (item.isVisible || showAll) && (
                <Styled.AttributesItem>
                  <DomainTree
                    levels={item.levels}
                    onSelected={e => updateChange(item.value, e.id, false)}
                    schema={item.schema}
                    selected={
                      _.isNil(state?.layer?.[item.value])
                        ? null
                        : state.layer[item.value]
                    }
                    title={<TranslationText id={item.label} />}
                  />
                </Styled.AttributesItem>
              )}
            </Styled.AttributesContainer>
          </Form>
        ))}
    </Styled.Container>
  );
};

export default ProfileAttributes;
