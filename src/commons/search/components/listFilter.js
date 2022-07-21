/* eslint-disable indent */
import React, { useState } from 'react';
import * as Styled from './listFilterStyles';
import { Checkbox, Input, TextArea, Form } from 'semantic-ui-react';
import TranslationText from '../../form/translationText';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import DomainDropdown from '../../form/domain/dropdown/domainDropdown';
import DomainTree from '../../form/domain/tree/domainTree';
import DateField from '../../form/dateField';
import LabelReset from '../../form/labelReset';
import MunicipalityDropdown from '../../form/municipality/dropdown/municipalityDropdown';
import CantonDropdown from '../../form/cantons/dropdown/cantonDropdown';

const ListFilter = props => {
  const {
    attribute,
    resetBoreInc,
    resetBoreIncDir,
    resetDrillDiameter,
    resetDrilling,
    resetElevation,
    resetRestriction,
    resetTotBedrock,
    search,
    setFilter,
    settings,
    resetIdentifier,
  } = props;
  const { t } = useTranslation();

  const [showAll, setShowAll] = useState(false);

  const isVisibleFunction = filter => {
    if (_.get(settings, filter) === true) {
      return true;
    }
    return false;
  };

  const updateChange = (attribute, value, to = true, isNumber = false) => {
    console.log('attribute', attribute, value);
    // setFilter('layer_depth_from_from', value);
    setFilter(attribute, value);
  };

  const resetChange = item => {
    if (
      item.type === 'DomainTree' ||
      item.type === 'Dropdown' ||
      item.type === 'Canton' ||
      item.type === 'City'
    ) {
      updateChange(item.value, null, false);
    } else if (item.type === 'Radio') {
      updateChange(item.value, -1, false);
    } else if (
      item.type === 'Date' ||
      item.type === 'Input' ||
      item.type === 'TextArea'
    ) {
      updateChange(item.value, '', false);
    }
  };

  const resetTwoFieldsChange = item => {
    // this is only available for second item of hasTwoFields
    if (item.value === 'identifier_value') {
      resetIdentifier();
    } else if (item.value === 'restriction_until_to') {
      resetRestriction();
    } else if (item.value === 'elevation_z_to') {
      resetElevation();
    } else if (item.value === 'length_to') {
      // resetDepth();??????????
    } else if (item.value === 'top_bedrock_to') {
      resetTotBedrock();
    } else if (item.value === 'drilling_date_to') {
      resetDrilling();
    } else if (item.value === 'drill_diameter_to') {
      resetDrillDiameter();
    } else if (item.value === 'bore_inc_to') {
      resetBoreInc();
    } else if (item.value === 'bore_inc_dir_to') {
      resetBoreIncDir();
    } else if (item.value === 'layer_depth_from_to') {
      updateChange('layer_depth_from_from', '', false);
      updateChange('layer_depth_from_to', '', false);
    } else if (item.value === 'layer_depth_to_to') {
      updateChange('layer_depth_to_from', '', false);
      updateChange('layer_depth_to_to', '', false);
    }
  };

  return (
    <Styled.Container>
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
          <Styled.ContainerList>
            {attribute.map((item, key) => (
              <Form autoComplete="false" error key={key}>
                <Styled.AttributesContainer>
                  {(item.isVisible ||
                    isVisibleFunction(item.isVisibleValue) ||
                    showAll) && (
                    <Styled.Label>
                      <TranslationText id={item.label} />
                    </Styled.Label>
                  )}
                  {item.type === 'Input' &&
                    (item.isVisible ||
                      isVisibleFunction(item.isVisibleValue) ||
                      showAll) && (
                      <Styled.AttributesItem>
                        <Input
                          autoCapitalize="off"
                          autoComplete="off"
                          autoCorrect="off"
                          onChange={e =>
                            updateChange(
                              item.value,
                              // e.target.value === '' ? null : e.target.value,
                              e.target.value === '' ? '' : e.target.value,
                              item?.to,
                              item?.isNumber,
                            )
                          }
                          placeholder={t(item?.placeholder)}
                          spellCheck="false"
                          style={{ width: '100%' }}
                          type={item?.inputType}
                          value={
                            _.isNil(search.filter?.[item.value])
                              ? ''
                              : search.filter[item.value]
                          }
                        />
                      </Styled.AttributesItem>
                    )}

                  {item.type === 'TextArea' &&
                    (item.isVisible ||
                      isVisibleFunction(item.isVisibleValue) ||
                      showAll) && (
                      <Styled.AttributesItem>
                        <TextArea
                          onChange={e =>
                            updateChange(item.value, e.target.value)
                          }
                          style={{ width: '100%' }}
                          value={
                            _.isNil(search.filter?.[item.value])
                              ? ''
                              : search.filter[item.value]
                          }
                        />
                      </Styled.AttributesItem>
                    )}

                  {item.type === 'Radio' &&
                    (item.isVisible ||
                      isVisibleFunction(item.isVisibleValue) ||
                      showAll) && (
                      <Form.Group>
                        <div style={{ display: 'flex', paddingTop: '5px' }}>
                          {item.hasUnknown && (
                            <>
                              <Form.Radio
                                checked={search.filter?.[item.value] === true}
                                label={t('yes')}
                                onChange={() =>
                                  updateChange(item.value, true, item?.to)
                                }
                                style={{
                                  paddingRight: '10px',
                                  paddingLeft: '10px',
                                }}
                              />
                              <Form.Radio
                                checked={search.filter?.[item.value] === false}
                                label={t('no')}
                                onChange={() =>
                                  updateChange(item.value, false, item?.to)
                                }
                                style={{ paddingRight: '10px' }}
                              />
                              <Form.Radio
                                checked={search.filter?.[item.value] === null}
                                label={t('np')}
                                onChange={() =>
                                  updateChange(item.value, null, item?.to)
                                }
                              />
                            </>
                          )}
                        </div>
                      </Form.Group>
                    )}

                  {item.type === 'Dropdown' &&
                    (item.isVisible ||
                      isVisibleFunction(item.isVisibleValue) ||
                      showAll) && (
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
                            _.isNil(search.filter?.[item.value])
                              ? null
                              : search.filter[item.value]
                          }
                        />
                      </Styled.AttributesItem>
                    )}

                  {item.type === 'DomainTree' &&
                    (item.isVisible ||
                      isVisibleFunction(item.isVisibleValue) ||
                      showAll) && (
                      <Styled.AttributesItem>
                        <DomainTree
                          levels={item.levels}
                          onSelected={e =>
                            updateChange(item.value, e.id, false)
                          }
                          schema={item.schema}
                          selected={
                            _.isNil(search.filter?.[item.value])
                              ? null
                              : search.filter[item.value]
                          }
                          title={<TranslationText id={item.label} />}
                        />
                      </Styled.AttributesItem>
                    )}

                  {item.type === 'Date' &&
                    (item.isVisible ||
                      isVisibleFunction(item.isVisibleValue) ||
                      showAll) && (
                      <Styled.AttributesItem>
                        <DateField
                          date={
                            search.filter?.[item.value]
                              ? search.filter[item.value]
                              : null
                          }
                          onChange={selected => {
                            updateChange(item.value, selected, false);
                          }}
                          placeholder={t(item?.placeholder)}
                        />
                      </Styled.AttributesItem>
                    )}

                  {item.type === 'Canton' &&
                    (item.isVisible ||
                      isVisibleFunction(item.isVisibleValue) ||
                      showAll) && (
                      <Styled.AttributesItem>
                        <CantonDropdown
                          onSelected={selected => {
                            if (search.filter.municipality !== null) {
                              updateChange('municipality', null, false);
                            }

                            updateChange(item.value, selected.id, false);
                          }}
                          selected={search.filter?.[item.value]}
                        />
                      </Styled.AttributesItem>
                    )}

                  {item.type === 'City' &&
                    (item.isVisible ||
                      isVisibleFunction(item.isVisibleValue) ||
                      showAll) && (
                      <Styled.AttributesItem>
                        <MunicipalityDropdown
                          canton={search.filter.canton}
                          disabled={search.filter.canton === null}
                          onSelected={selected => {
                            updateChange(item.value, selected.id, false);
                          }}
                          selected={search.filter?.[item.value]}
                        />
                      </Styled.AttributesItem>
                    )}

                  {(item.isVisible ||
                    isVisibleFunction(item.isVisibleValue) ||
                    showAll) &&
                    !item.hasTwoFields && (
                      <Styled.Reset>
                        <LabelReset
                          onClick={() => {
                            resetChange(item);
                          }}
                        />
                      </Styled.Reset>
                    )}

                  {(item.isVisible ||
                    isVisibleFunction(item.isVisibleValue) ||
                    showAll) &&
                    item.hasTwoFields &&
                    item.label === '' && (
                      <Styled.Reset>
                        <LabelReset
                          onClick={() => {
                            resetTwoFieldsChange(item);
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

export default ListFilter;
