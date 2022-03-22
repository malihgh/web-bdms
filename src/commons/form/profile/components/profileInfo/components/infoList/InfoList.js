import React, { useState, useEffect } from 'react';
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
  patchStratigraphy,
} from '@ist-supsi/bmsjs';
import _ from 'lodash';

const InfoList = props => {
  const { attribute, info, isEditable, onUpdated } = props.data;

  let updateAttributeDelay = {};
  const [state, setState] = useState({
    isFetching: false,
    isPatching: false,
    profileInfo: {
      id: null,
      kind: null,
      name: null,
      primary: false,
      date: null,
      elevationCasing: null,
      refElevationCasing: null,
      dateSpud: null,
      dateFinish: null,
      dateAbandonment: null,
      remarks: '',
      // depth_from: info.depth_from ? info.depth_from : null,
      // depth_to: info.depth_to ? info.depth_to : null,
      // notes: info.notes ? info.notes : '',
    },
  });
  useEffect(() => {
    setState({
      profileInfo: {
        id: info.id ? info.id : null,
        kind: info.kind ? info.kind : null,
        name: info.name ? info.name : null,
        primary: info.primary ? info.primary : false,
        date: info.date ? info.date : null,
        elevationCasing: info.elevationCasing ? info.elevationCasing : null,
        refElevationCasing: info.refElevationCasing
          ? info.refElevationCasing
          : null,
        dateSpud: info.dateSpud ? info.dateSpud : null,
        dateFinish: info.dateFinish ? info.dateFinish : null,
        dateAbandonment: info.dateAbandonment ? info.dateAbandonment : null,
        remarks: info.remarks ? info.remarks : null,
      },
    });
  }, [info]);

  const updateChange = (attribute, value, to = true, isNumber = false) => {
    if (!isEditable) {
      alert('You should press start editing button! ');
      return;
    }
    console.log('kkkkk', info?.id, attribute, value);
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
    if (
      updateAttributeDelay.hasOwnProperty(attribute) &&
      updateAttributeDelay[attribute]
    ) {
      clearTimeout(updateAttributeDelay[attribute]);
      updateAttributeDelay[attribute] = false;
    }
    updateAttributeDelay[attribute] = setTimeout(function () {
      patchStratigraphy(info?.id, attribute, value)
        .then(function (response) {
          console.log('lll', response);
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
                    // onSelected={e =>
                    //   updateChange(
                    //     item.value,
                    //     item.multiple ? e.map(mlpr => mlpr.id) : e.id,
                    //     false,
                    //   )
                    // }
                    schema={item.schema}
                    search={item.search}
                    // selected={
                    //   _.isNil(state?.layer?.[item.value])
                    //     ? null
                    //     : state.layer[item.value]
                    // }
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
              size="tiny"
              onClick={() => {
                cloneStratigraphy(state.profileInfo.id).then(response => {
                  onUpdated('cloneStratigraphy');
                });
              }}>
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
