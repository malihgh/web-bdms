import React, { useState } from 'react';
import * as Styled from './styles';
import { Input, Form, Checkbox, Popup, Button, Icon } from 'semantic-ui-react';
import TranslationText from '../../../translationText';
import DateField from '../../../dateField';
import { patchStratigraphy, deleteStratigraphy } from '@ist-supsi/bmsjs';

import _ from 'lodash';

const ProfileInfo = props => {
  const { item, isEditable, onUpdated } = props.data;
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
        <Form size="small">
          <Form.Group widths="equal">
            <Form.Field
              required
              style={{
                width: '50%',
              }}>
              <label>
                <TranslationText id="stratigraphy_name" />
              </label>
              <Input
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                value={item?.name ?? ''}
                onChange={e => {
                  updateChange('name', e.target.value);
                }}
              />
            </Form.Field>

            <Form.Field
              required
              style={{
                width: '50%',
              }}>
              <label>
                <TranslationText id="date" />
              </label>
              <DateField
                date={item && item.date}
                onChange={selected => {
                  updateChange('date', selected, false);
                }}
              />
            </Form.Field>
          </Form.Group>
        </Form>
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
                  // deleteStratigraphy(item.id).then(response => {
                  //   onUpdated('deleteStratigraphy');
                  // if (_.isFunction(onDeleted)){
                  //   onDeleted(stratigraphy.id);
                  // }
                  // this.setState({
                  //   stratigraphy: null
                  // });
                  // });
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
