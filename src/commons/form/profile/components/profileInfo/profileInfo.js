import React, { useState } from 'react';
import * as Styled from './styles';
import { Input, Form, Checkbox, Popup, Button, Icon } from 'semantic-ui-react';
import TranslationText from '../../../translationText';
import DomainDropdown from '../../../domain/dropdown/domainDropdown';
import DateField from '../../../dateField';
import {
  patchStratigraphy,
  deleteStratigraphy,
  cloneStratigraphy,
} from '@ist-supsi/bmsjs';
import _ from 'lodash';

const ProfileInfo = props => {
  const { item, isEditable, onUpdated, attribute } = props.data;
  let updateAttributeDelay = {};
  const [state, setState] = useState({
    isFetching: false,
    isPatching: false,
  });
  const updateChange = (attribute, value, to = true) => {
    if (!isEditable) {
      alert('You should press start editing button! ');
      return;
    }

    setState(prevState => ({ ...prevState, isPatching: true }));
    _.set(item, attribute, value);

    patch(attribute, value, to);
  };

  const patch = (attribute, value, to = true) => {
    if (
      updateAttributeDelay.hasOwnProperty(attribute) &&
      updateAttributeDelay[attribute]
    ) {
      clearTimeout(updateAttributeDelay[attribute]);
      updateAttributeDelay[attribute] = false;
    }
    updateAttributeDelay[attribute] = setTimeout(
      function () {
        patchStratigraphy(item?.id, attribute, value)
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
      },
      to ? 500 : 0,
    );
  };
  return (
    <Styled.Container>
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
                    // onChange={e =>
                    //   updateChange(
                    //     item.value,
                    //     e.target.value === '' ? null : e.target.value,
                    //     item?.to,
                    //     item?.isNumber,
                    //   )
                    // }
                    spellCheck="false"
                    style={{ width: '100%' }}
                    //     value={item?.name ?? ''}
                    // onChange={e => {
                    //   updateChange('name', e.target.value);
                    // }}
                    // value={
                    //   _.isNil(state?.layer?.[item.value])
                    //     ? ''
                    //     : state.layer[item.value]
                    // }
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
                  // date={item?.date}
                  // onChange={selected => {
                  //   updateChange('date', selected, false);
                  // }}
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
            checked={item && item.primary}
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
                cloneStratigraphy(item.id).then(response => {
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
                  deleteStratigraphy(item.id).then(response => {
                    onUpdated('deleteStratigraphy');
                  });
                }}>
                <TranslationText id="yes" />
              </Button>
            </Popup>
          </div>
        )}
      </Styled.CheckBoxContainer>
    </Styled.Container>
  );
};

export default ProfileInfo;
