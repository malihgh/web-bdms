// @ts-nocheck
import React, { useState, useEffect } from 'react';
import * as Styled from './styles';
import { Checkbox, Input, TextArea, Form } from 'semantic-ui-react';
import TranslationText from '../../../translationText';
import DomainDropdown from '../../../domain/dropdown/domainDropdown';
import DomainTree from '../../../domain/tree/domainTree';
import { getLayer, patchLayer } from '@ist-supsi/bmsjs';
import _ from 'lodash';

const ProfileAttributes = props => {
  const { id, isEditable, onUpdated, attribute } = props.data;
  let updateAttributeDelay = {};
  const [showAll, setShowAll] = useState(false);
  const [state, setState] = useState({
    isFetching: false,
    isPatching: false,
    allfields: false,
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
      jointing: [], // hidden
      soil_state: null, // hidden
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
    },
  });

  useEffect(() => {
    load(id);
  }, [id]);

  const load = id => {
    if (id === null) setState({ state: null });
    if (_.isInteger(id)) {
      setState({ isFetching: true });
      getLayer(id)
        .then(function (response) {
          if (response.data.success) {
            setState({
              isFetching: false,
              layer: response.data.data,
            });

            // if (_.isNil(state.layer.depth_to)) {
            //  this.depthToRef.current.focus();
            // }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const updateChange = (attribute, value, to = true, isNumber = false) => {
    if (!isEditable) {
      alert('You should press start editing button! ');
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
    if (
      updateAttributeDelay.hasOwnProperty(attribute) &&
      updateAttributeDelay[attribute]
    ) {
      clearTimeout(updateAttributeDelay[attribute]);
      updateAttributeDelay[attribute] = false;
    }
    updateAttributeDelay[attribute] = setTimeout(function () {
      patchLayer(state?.layer?.id, attribute, value)
        .then(function (response) {
          if (response.data.success) {
            setState({ ...state, isPatching: false });
            if (_.isFunction(onUpdated)) {
              onUpdated(attribute);
            }
          } else {
            alert(response.data.message);
            window.location.reload();
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }, 500);
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

      {attribute.map((item, key) => (
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
