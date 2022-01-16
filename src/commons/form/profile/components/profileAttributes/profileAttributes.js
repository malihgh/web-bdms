// @ts-nocheck
import React, { useState } from 'react';
import * as Styled from './styles';
import { Checkbox, Input, TextArea, Form } from 'semantic-ui-react';
import TranslationText from '../../../translationText';
import DomainDropdown from '../../../domain/dropdown/domainDropdown';
import { attributes } from './attributesItem';

const ProfileAttributes = () => {
  const [showAll, setShowAll] = useState(false);
  return (
    <Styled.Container>
      <Styled.CheckboxContainer>
        <Checkbox
          checked={showAll}
          onChange={data => {
            console.log('profileAttributes', data);
            setShowAll(!showAll);
          }}
          toggle
        />
        <TranslationText id="showallfields" />
      </Styled.CheckboxContainer>

      {attributes.map((item, key) => (
        <Form key={key}>
          {item.type === 'Input' && (item.isVisible || showAll) && (
            <Styled.AttributesContainer required={item.require}>
              <Styled.Label>
                <TranslationText id={item.label} />
              </Styled.Label>
              <Styled.AttributesItem>
                <Input
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  onChange={() => item.onChange()}
                  spellCheck="false"
                  style={{ width: '100%' }}
                  // value={item.value}
                />
              </Styled.AttributesItem>
            </Styled.AttributesContainer>
          )}

          {item.type === 'TextArea' && (item.isVisible || showAll) && (
            <Styled.AttributesContainer>
              <Styled.Label>
                <TranslationText id={item.label} />
              </Styled.Label>
              <Styled.AttributesItem>
                <TextArea
                  style={{ width: '100%' }}
                  onChange={() => item.onChange()}
                  // value={item.value}
                />
              </Styled.AttributesItem>
            </Styled.AttributesContainer>
          )}

          {item.type === 'Radio' && (item.isVisible || showAll) && (
            <Styled.AttributesContainer>
              <Styled.Label>
                <TranslationText id={item.label} />
              </Styled.Label>
              <Form.Group style={{ display: 'flex', paddingTop: '5px' }}>
                <Form.Radio
                  checked={!item.value}
                  label={'Yes'}
                  onChange={() => item.onYesSelect()}
                  style={{ paddingRight: '20px' }}
                />
                <Form.Radio
                  checked={item.value}
                  label={'No'}
                  onChange={() => item.onNoSelect()}
                />
              </Form.Group>
            </Styled.AttributesContainer>
          )}

          {item.type === 'Dropdown' && (item.isVisible || showAll) && (
            <Styled.AttributesContainer>
              <Styled.Label>
                <TranslationText id={item.label} />
              </Styled.Label>
              <Styled.AttributesItem>
                <DomainDropdown
                  multiple={item.multiple}
                  onSelected={() => item.onChange()}
                  schema={item.schema}
                  selected={item.value}
                  search={item.search}
                />
              </Styled.AttributesItem>
            </Styled.AttributesContainer>
          )}
        </Form>
      ))}
    </Styled.Container>
  );
};

export default ProfileAttributes;
