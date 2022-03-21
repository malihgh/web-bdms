import React from 'react';
import * as Styled from './styles';
import { Input, Form, Button } from 'semantic-ui-react';
import TranslationText from '../../../../../translationText';
import DomainDropdown from '../../../../../domain/dropdown/domainDropdown';
import _ from 'lodash';

const InstrumentList = props => {
  const { attributes, index, info, deleting } = props.data;
  console.log('jjj', info);
  return (
    <Styled.FormContainer>
      {attributes.map((item, key) => (
        <Form autoComplete="false" error key={key} size="small">
          <Styled.AttributesContainer required={item.require}>
            {index === 0 && (
              <Styled.Label>
                <TranslationText id={item.label} />
              </Styled.Label>
            )}

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
                  // value={info?[item.value] ?? 'm'}
                  // onChange={e => {
                  //   updateChange('name', e.target.value);
                  // }}
                  // value={
                  //   _.isNil(state?.layer?.[item.value])
                  //     ? ''
                  //     : state.layer[item.value]
                  // }
                  value={_.isNil(info?.[item.value]) ? '' : info[item.value]}
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
                  selected={
                    _.isNil(info?.[item.value]) ? null : info?.[item.value]
                  }
                />
              </Styled.AttributesItem>
            )}

            {item.type === 'Button' && (
              <Button
                icon="close"
                onClick={() => {
                  deleting(info?.id);
                }}
                size="small"
                style={{ marginTop: 5 }}
              />
            )}
          </Styled.AttributesContainer>
        </Form>
      ))}
    </Styled.FormContainer>
  );
};

export default InstrumentList;
