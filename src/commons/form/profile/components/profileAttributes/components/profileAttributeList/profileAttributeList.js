import React from 'react';
import * as Styled from './styles';
import { Input, TextArea, Form } from 'semantic-ui-react';
import TranslationText from '../../../../../translationText';
import DomainDropdown from '../../../../../domain/dropdown/domainDropdown';
import DomainTree from '../../../../../domain/tree/domainTree';
import DateField from '../../../../../dateField';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

const ProfileAttributeList = props => {
  const { attribute, showAll, updateChange, layer, isVisibleFunction } =
    props.data;
  const { t } = useTranslation();

  return (
    <Styled.Container>
      {attribute.map((item, key) => (
        <Form autoComplete="false" error key={key}>
          <Styled.AttributesContainer required={item.require}>
            {(item.isVisible ||
              isVisibleFunction(item.isVisibleValue) ||
              showAll) && (
              <Styled.Label>
                <TranslationText id={item.label} />
              </Styled.Label>
            )}
            {item.type === 'Input' &&
              (item.isVisible ||
                isVisibleFunction(item.isVisibleValue) ||
                showAll) && (
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
                      _.isNil(layer?.[item.value]) ? '' : layer[item.value]
                    }
                  />
                </Styled.AttributesItem>
              )}

            {item.type === 'TextArea' &&
              (item.isVisible ||
                isVisibleFunction(item.isVisibleValue) ||
                showAll) && (
                <Styled.AttributesItem>
                  <TextArea
                    onChange={e => updateChange(item.value, e.target.value)}
                    style={{ width: '100%' }}
                    value={
                      _.isNil(layer?.[item.value]) ? '' : layer[item.value]
                    }
                  />
                </Styled.AttributesItem>
              )}

            {item.type === 'Radio' &&
              (item.isVisible ||
                isVisibleFunction(item.isVisibleValue) ||
                showAll) && (
                <Form.Group style={{ display: 'flex', paddingTop: '5px' }}>
                  <Form.Radio
                    checked={
                      _.isNil(layer?.[item.value]) ? true : layer[item.value]
                    }
                    label={t('yes')}
                    onChange={() => updateChange(item.value, true, item?.to)}
                    style={{ paddingRight: '20px' }}
                  />
                  <Form.Radio
                    checked={
                      _.isNil(layer?.[item.value]) ? false : !layer[item.value]
                    }
                    label={t('no')}
                    onChange={() => updateChange(item.value, false, item?.to)}
                  />
                </Form.Group>
              )}

            {item.type === 'Dropdown' &&
              (item.isVisible ||
                isVisibleFunction(item.isVisibleValue) ||
                showAll) && (
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
                      _.isNil(layer?.[item.value]) ? null : layer[item.value]
                    }
                  />
                </Styled.AttributesItem>
              )}

            {item.type === 'DomainTree' &&
              (item.isVisible ||
                isVisibleFunction(item.isVisibleValue) ||
                showAll) && (
                <Styled.AttributesItem>
                  <DomainTree
                    levels={item.levels}
                    onSelected={e => updateChange(item.value, e.id, false)}
                    schema={item.schema}
                    selected={
                      _.isNil(layer?.[item.value]) ? null : layer[item.value]
                    }
                    title={<TranslationText id={item.label} />}
                  />
                </Styled.AttributesItem>
              )}

            {item.type === 'Date' &&
              (item.isVisible ||
                isVisibleFunction(item.isVisibleValue) ||
                showAll) && (
                <Styled.AttributesItem>
                  <DateField
                    date={layer?.[item.value] ? layer[item.value] : null}
                    onChange={selected => {
                      updateChange(item.value, selected, false);
                    }}
                  />
                </Styled.AttributesItem>
              )}
          </Styled.AttributesContainer>
        </Form>
      ))}
    </Styled.Container>
  );
};

export default ProfileAttributeList;
