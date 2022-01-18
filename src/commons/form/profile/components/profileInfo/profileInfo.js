import React from 'react';
import * as Styled from './styles';
import { Input, Form, Checkbox, Popup, Button, Icon } from 'semantic-ui-react';
import TranslationText from '../../../translationText';
import DateField from '../../../dateField';

const ProfileInfo = props => {
  const { selectedStratigraphy } = props.data;

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
                value={
                  (selectedStratigraphy && selectedStratigraphy.name) || ''
                }
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
                date={selectedStratigraphy && selectedStratigraphy.date}
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
          }}>
          <Checkbox
            checked={selectedStratigraphy && selectedStratigraphy.primary}
            label=""
            toggle
          />
          <TranslationText id="mainStratigraphy" />
        </Form>

        <div style={{ display: 'flex' }}>
          <Button
            // disabled={!_.isEmpty(this.state.consistency)}
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
            <Button icon secondary size="tiny">
              <TranslationText id="yes" />
            </Button>
          </Popup>
        </div>
      </Styled.CheckBoxContainer>

      <Button fluid secondary size="tiny">
        <TranslationText id="add" />
      </Button>
    </Styled.Container>
  );
};

export default ProfileInfo;
