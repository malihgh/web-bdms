import React, { useState } from 'react';
import * as Styled from './styles';
import { Form, Checkbox, Popup, Button, Icon } from 'semantic-ui-react';
import TranslationText from '../../../translationText';
import {
  patchStratigraphy,
  deleteStratigraphy,
  cloneStratigraphy,
} from '@ist-supsi/bmsjs';
import _ from 'lodash';
import InfoList from './components/infoList/InfoList';

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
      {attribute && <InfoList data={{ attribute, updateChange }} />}

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
