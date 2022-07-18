import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as Styled from './completionFilterStyles';
import { Checkbox, Input, TextArea, Form } from 'semantic-ui-react';
import TranslationText from '../../form/translationText';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import DomainDropdown from '../../form/domain/dropdown/domainDropdown';
import DomainTree from '../../form/domain/tree/domainTree';
import DateField from '../../form/dateField';
import LabelReset from '../../form/labelReset';

// import { getData, sendAttribute } from './api';

// import DomainDropdown from '../../domain/dropdown/domainDropdown';
// import DomainTree from '../../domain/tree/domainTree';
// import DateField from '../../form/dateField';

const CompletionFilter = props => {
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
      consistance: null,
      gradation: null,
      lithok: null,
      kirost: null,
      notes: '',
      fill_material: null,
      casing_kind: null,
      casing_material: null,
      casing_date_spud: null,
      casing_date_finish: null,
      casing_innder_diameter: null,
      casing_outer_diameter: null,
    },
  });

  // const mounted = useRef(false);

  // const load = useCallback(id => {
  //   getData(id).then(data => {
  //     if (mounted.current) {
  //       setState({
  //         isFetching: false,
  //         layer: data,
  //       });
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   mounted.current = true;

  //   if (id && mounted.current) {
  //     load(id);
  //     setShowAll(false);
  //   } else if (id === null) {
  //     setState({ state: null });
  //   }
  //   return () => {
  //     mounted.current = false;
  //   };
  // }, [id, reloadAttribute, load]);

  const updateChange = (attribute, value, to = true, isNumber = false) => {
    //   if (!isEditable) {
    //     alert(t('common:errorStartEditing'));
    //     return;
    //   }
    //   setState(prevState => ({ ...prevState, isPatching: true }));
    //   _.set(state.layer, attribute, value);
    //   if (isNumber) {
    //     if (value === null) {
    //       patch(attribute, value);
    //     } else if (/^-?\d*[.,]?\d*$/.test(value)) {
    //       patch(attribute, _.toNumber(value));
    //     }
    //   } else {
    //     patch(attribute, value);
    //   }
  };

  // const patch = (attribute, value) => {
  //   clearTimeout(state.updateAttributeDelay?.[attribute]);

  //   let setDelay = setTimeout(() => {
  //     sendAttribute(state?.layer?.id, attribute, value).then(response => {
  //       if (response) {
  //         onUpdated(attribute);
  //       }
  //     });
  //   }, 500);

  //   Promise.resolve().then(() => {
  //     setState(prevState => ({
  //       ...prevState,
  //       isPatching: false,
  //       updateAttributeDelay: { [attribute]: setDelay },
  //     }));
  //   });
  // };
  const { layer } = state;
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

      {attribute && (
        <>
          {/* <ProfileAttributeList
          data={{ attribute, showAll, updateChange, layer: state.layer }}
          /> */}
          <Styled.ContainerList>
            {attribute.map((item, key) => (
              <Form autoComplete="false" error key={key}>
                <Styled.AttributesContainer
                // required={item.require}
                >
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
                        // placeholder={
                        //   item?.inputType
                        //     ? item?.hasTwoFields && item?.label === ''
                        //       ? 'to'
                        //       : 'from'
                        //     : ''
                        // }
                        spellCheck="false"
                        style={{ width: '100%' }}
                        type={item?.inputType}
                        value={
                          _.isNil(layer?.[item.value]) ? '' : layer[item.value]
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
                          _.isNil(layer?.[item.value]) ? '' : layer[item.value]
                        }
                      />
                    </Styled.AttributesItem>
                  )}

                  {item.type === 'Radio' && (item.isVisible || showAll) && (
                    <Form.Group style={{ display: 'flex', paddingTop: '5px' }}>
                      <Form.Radio
                        checked={
                          _.isNil(layer?.[item.value])
                            ? false
                            : layer[item.value]
                        }
                        label={'Yes'}
                        onChange={() =>
                          updateChange(item.value, true, item?.to)
                        }
                        style={{ paddingRight: '20px' }}
                      />
                      <Form.Radio
                        checked={
                          _.isNil(layer?.[item.value])
                            ? false
                            : !layer[item.value]
                        }
                        label={'No'}
                        onChange={() =>
                          updateChange(item.value, false, item?.to)
                        }
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
                          _.isNil(layer?.[item.value])
                            ? null
                            : layer[item.value]
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
                          _.isNil(layer?.[item.value])
                            ? null
                            : layer[item.value]
                        }
                        title={<TranslationText id={item.label} />}
                      />
                    </Styled.AttributesItem>
                  )}

                  {item.type === 'Date' && (item.isVisible || showAll) && (
                    <Styled.AttributesItem>
                      <DateField
                        date={layer?.[item.value] ? layer[item.value] : null}
                        onChange={selected => {
                          updateChange(item.value, selected, false);
                        }}
                      />
                    </Styled.AttributesItem>
                  )}
                  {(item.isVisible || showAll) && !item.hasTwoFields && (
                    <Styled.Reset>
                      <LabelReset
                        onClick={() => {
                          // this.props.setFilter('canton', null);
                        }}
                      />
                    </Styled.Reset>
                  )}
                  {(item.isVisible || showAll) &&
                    item.hasTwoFields &&
                    item.label === '' && (
                      <Styled.Reset>
                        <LabelReset
                          onClick={() => {
                            // this.props.setFilter('canton', null);
                          }}
                        />
                      </Styled.Reset>
                    )}
                </Styled.AttributesContainer>
              </Form>
            ))}
          </Styled.ContainerList>
        </>
      )}
    </Styled.Container>
  );
};

export default CompletionFilter;
