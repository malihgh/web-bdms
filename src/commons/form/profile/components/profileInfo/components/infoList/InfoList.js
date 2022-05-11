import React from 'react';
import * as Styled from './styles';
import { Input, Form } from 'semantic-ui-react';
import TranslationText from '../../../../../translationText';
import DomainDropdown from '../../../../../domain/dropdown/domainDropdown';
import DateField from '../../../../../dateField';
import { Checkbox, Popup, Button, Icon } from 'semantic-ui-react';
import { deleteStratigraphy, cloneStratigraphy } from '@ist-supsi/bmsjs';
import _ from 'lodash';

const InfoList = props => {
  const { attribute, isEditable, onUpdated, kind, profileInfo, updateChange } =
    props.data;

  return (
    <>
      <Styled.FormContainer>
        {attribute?.map((item, key) => (
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
                      _.isNil(profileInfo?.[item.value])
                        ? ''
                        : profileInfo[item.value]
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
                      _.isNil(profileInfo?.[item.value])
                        ? null
                        : profileInfo[item.value]
                    }
                  />
                </Styled.AttributesItem>
              )}

              {item.type === 'Date' && (
                <Styled.AttributesItem>
                  <DateField
                    date={
                      profileInfo?.[item.value] ? profileInfo[item.value] : null
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
    </>
  );
};

export default InfoList;
