import React, { useState, useEffect, useCallback } from 'react';
import * as Styled from './styles';
import { Input, Form } from 'semantic-ui-react';
import TranslationText from '../../../../../translationText';
import DomainDropdown from '../../../../../domain/dropdown/domainDropdown';
import DateField from '../../../../../dateField';
import { Checkbox, Popup, Button, Icon } from 'semantic-ui-react';
import {
  patchProfile,
  deleteStratigraphy,
  cloneStratigraphy,
  getProfile,
} from '@ist-supsi/bmsjs';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

const InfoList = props => {
  const { attribute, id, isEditable, onUpdated } = props.data;

  const { t } = useTranslation();

  const [state, setState] = useState({
    isFetching: false,
    isPatching: false,
    updateAttributeDelay: {},
    profileInfo: {
      id: null,
      kind: null,
      casng_kind: null,
      fill_kind: null,
      name: null,
      primary: false,
      date: null,
      elevation: null,
      elevation_ref: null,
      date_spud: null,
      date_fin: null,
      date_abd: null,
      notes: null,
    },
  });

  const getData = useCallback(id => {
    getProfile(id)
      .then(response => {
        if (response.data.success) {
          setState(prevState => ({
            ...prevState,
            isFetching: false,
            profileInfo: response.data.data,
          }));
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getData(id);
  }, [id, getData]);

  const updateChange = (attribute, value, to = true, isNumber = false) => {
    if (!isEditable) {
      alert(t('common:errorStartEditing'));
      return;
    }
    setState(prevState => ({ ...prevState, isPatching: true }));
    _.set(state.profileInfo, attribute, value);

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

    let setDelay = {
      [attribute]: setTimeout(() => {
        patchProfile(id, attribute, value)
          .then(response => {
            if (response.data.success) {
              setState(prevState => ({ ...prevState, isPatching: false }));
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
      }, 500),
    };

    Promise.resolve().then(() => {
      setState(prevState => ({
        ...prevState,
        updateAttributeDelay: setDelay,
      }));
    });
  };

  return (
    <>
      <Styled.FormContainer>
        {attribute.map((item, key) => (
          <Form autoComplete="false" error key={key} size="small">
            <Styled.AttributesContainer required={item.require}>
              <Styled.Label>
                <TranslationText id={item.label} />
              </Styled.Label>

              {item.type === 'Input' && (
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
                      _.isNil(state?.profileInfo?.[item.value])
                        ? ''
                        : state.profileInfo[item.value]
                    }
                  />
                </Styled.AttributesItem>
              )}
              {item.type === 'Dropdown' && (
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
                      _.isNil(state?.profileInfo?.[item.value])
                        ? null
                        : state.profileInfo[item.value]
                    }
                  />
                </Styled.AttributesItem>
              )}

              {item.type === 'Date' && (
                <Styled.AttributesItem>
                  <DateField
                    date={
                      state?.profileInfo?.[item.value]
                        ? state.profileInfo[item.value]
                        : null
                    }
                    onChange={selected => {
                      updateChange(item.value, selected, false);
                    }}
                  />
                </Styled.AttributesItem>
              )}
            </Styled.AttributesContainer>
          </Form>
        ))}
      </Styled.FormContainer>

      <Styled.CheckBoxContainer>
        <Form
          size="small"
          style={{
            display: 'flex',
            paddingLeft: '5px',
            zIndex: 0,
          }}>
          <Checkbox
            checked={state.profileInfo && state.profileInfo.primary}
            label=""
            onChange={(ev, data) => {
              if (data.checked === true) {
                updateChange('primary', data.checked, false);
              }
            }}
            toggle
          />
          <TranslationText id="mainStratigraphy" />
        </Form>
        {isEditable && (
          <div style={{ display: 'flex' }}>
            <Button
              // disabled={!_.isEmpty(state.consistency)}
              icon
              onClick={() => {
                cloneStratigraphy(state.profileInfo.id).then(response => {
                  onUpdated('cloneStratigraphy');
                });
              }}
              size="tiny">
              <Icon name="clone outline" />
            </Button>
            <Popup
              flowing
              hoverable
              on="click"
              position="right center"
              trigger={
                <Button icon size="tiny">
                  <Icon name="trash alternate" />
                </Button>
              }>
              <TranslationText id="deleteForever" />?
              <br />
              <Button
                icon
                secondary
                size="tiny"
                onClick={() => {
                  deleteStratigraphy(state.profileInfo.id).then(response => {
                    onUpdated('deleteStratigraphy');
                  });
                }}>
                <TranslationText id="yes" />
              </Button>
            </Popup>
          </div>
        )}
      </Styled.CheckBoxContainer>
    </>
  );
};

export default InfoList;
