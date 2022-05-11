import React from 'react';
import * as Styled from './styles';
import { Checkbox, Popup, Button, Icon } from 'semantic-ui-react';
import { deleteStratigraphy, cloneStratigraphy } from '@ist-supsi/bmsjs';
import TranslationText from '../../../../../translationText';
import { profileKind } from '../../../../constance';

const InfoCheckBox = props => {
  const { kind, profileInfo, updateChange, isEditable, onUpdated } = props.data;

  return (
    <Styled.CheckBoxContainer>
      <Styled.FormContainer size="small">
        {kind !== profileKind.CASING && (
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
      </Styled.FormContainer>
      {isEditable && (
        <div style={{ display: 'flex' }}>
          {kind !== profileKind.FILLING && (
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

export default InfoCheckBox;
