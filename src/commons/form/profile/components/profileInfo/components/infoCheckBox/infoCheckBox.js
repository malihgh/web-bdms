import React from 'react';
import * as Styled from './styles';
import { Checkbox, Popup, Button, Icon } from 'semantic-ui-react';
import { deleteStratigraphy, cloneStratigraphy } from '@ist-supsi/bmsjs';
import { Form } from 'semantic-ui-react';
import TranslationText from '../../../../../translationText';

const infoCheckBox = props => {
  const { kind, profileInfo, updateChange, isEditable, onUpdated } = props.data;

  return (
    <Styled.CheckBoxContainer>
      <Form
        size="small"
        style={{
          display: 'flex',
          paddingLeft: '5px',
          zIndex: 0,
        }}>
        {kind !== 'casing' && (
          <>
            <Checkbox
              checked={profileInfo && profileInfo?.primary}
              label=""
              onChange={(ev, data) => {
                if (data.checked === true) {
                  updateChange('primary', data.checked, false);
                }
              }}
              toggle
            />
            <TranslationText id="mainStratigraphy" />
          </>
        )}
      </Form>
      {isEditable && (
        <div style={{ display: 'flex' }}>
          {kind !== 'filling' && (
            <Button
              // disabled={!_.isEmpty(consistency)}
              icon
              onClick={() => {
                cloneStratigraphy(profileInfo?.id).then(response => {
                  onUpdated('cloneStratigraphy');
                });
              }}
              size="tiny">
              <Icon name="clone outline" />
            </Button>
          )}
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
              onClick={() => {
                deleteStratigraphy(profileInfo?.id).then(response => {
                  onUpdated('deleteStratigraphy');
                });
              }}
              secondary
              size="tiny">
              <TranslationText id="yes" />
            </Button>
          </Popup>
        </div>
      )}
    </Styled.CheckBoxContainer>
  );
};

export default infoCheckBox;
