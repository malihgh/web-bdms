// @ts-nocheck
import React, { useState } from 'react';
import * as Styled from './styles';
import { Checkbox, Input, TextArea, Form } from 'semantic-ui-react';
import TranslationText from '../../../translationText';
import DomainDropdown from '../../../domain/dropdown/domainDropdown';
import DomainTree from '../../../domain/tree/domainTree';
import { attributes } from './attributesItem';

const ProfileAttributes = () => {
  const [showAll, setShowAll] = useState(false);
  return (
    <Styled.Container>
      <Styled.CheckboxContainer>
        <Checkbox
          checked={showAll}
          onChange={() => setShowAll(!showAll)}
          toggle
        />
        <TranslationText id="showallfields" />
      </Styled.CheckboxContainer>

      {attributes.map((item, key) => (
        <Form autoComplete="false" error key={key}>
          <Styled.AttributesContainer required={item.require}>
            {(item.isVisible || showAll) && (
              <Styled.Label>
                <TranslationText id={item.label} />
              </Styled.Label>
            )}
            {item.type === 'Input' && (item.isVisible || showAll) && (
              <Styled.AttributesItem>
                <Input
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  // onChange={(e) => setState((prevState)=>({ ...prevState,[item.value]:e.target.value}))}
                  spellCheck="false"
                  style={{ width: '100%' }}
                  // value={state[item.value]}
                />
              </Styled.AttributesItem>
            )}

            {item.type === 'TextArea' && (item.isVisible || showAll) && (
              <Styled.AttributesItem>
                <TextArea
                  // onChange={() => item.onChange()}
                  style={{ width: '100%' }}
                  // value={item.value}
                />
              </Styled.AttributesItem>
            )}

            {item.type === 'Radio' && (item.isVisible || showAll) && (
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
            )}

            {item.type === 'Dropdown' && (item.isVisible || showAll) && (
              <Styled.AttributesItem>
                <DomainDropdown
                  multiple={item.multiple}
                  // onSelected={() => item.onChange()}
                  schema={item.schema}
                  search={item.search}
                  selected={item.value}
                />
              </Styled.AttributesItem>
            )}

            {item.type === 'DomainTree' && (item.isVisible || showAll) && (
              <Styled.AttributesItem>
                <DomainTree
                  levels={item.levels}
                  // onSelected={() => item.onChange()}
                  schema={item.schema}
                  selected={item.value}
                  title={<TranslationText id={item.label} />}
                />
              </Styled.AttributesItem>
            )}
          </Styled.AttributesContainer>
        </Form>
      ))}
    </Styled.Container>
  );
};

export default ProfileAttributes;
