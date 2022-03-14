import React from 'react';
import * as Styled from './styles';
import { Input, Form } from 'semantic-ui-react';
import TranslationText from '../../../../../translationText';
import DomainDropdown from '../../../../../domain/dropdown/domainDropdown';
import DateField from '../../../../../dateField';

const InfoList = props => {
  const { attribute } = props.data;
  return (
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
  );
};

export default InfoList;
