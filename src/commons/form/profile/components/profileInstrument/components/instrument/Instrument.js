import React, { useState, useEffect } from 'react';
import * as Styled from './styles';
import { Input, Form, Button } from 'semantic-ui-react';
import TranslationText from '../../../../../translationText';
import DomainDropdown from '../../../../../domain/dropdown/domainDropdown';
import { patchLayer } from '@ist-supsi/bmsjs';
import { InstrumentAttributes } from '../../data/InstrumentAttributes';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import CasingList from '../../../casingList';

const Instrument = props => {
  const { index, info, deleting, isEditable, update, casing } = props.data;

  const { t } = useTranslation();

  const [state, setState] = useState({
    isFetching: false,
    isPatching: false,
    updateAttributeDelay: {},
    instrument: {
      id: null,
      instrument_kind: null,
      depth_from: null,
      depth_to: null,
      notes: null,
      instrument_status: null,
      instrument_casing_id: null,
      instrument_id: null,
    },
  });

  useEffect(() => {
    setState(prevState => ({ ...prevState, instrument: info }));
  }, [info]);

  const updateChange = (attribute, value, to = true, isNumber = false) => {
    if (!isEditable) {
      alert(t('common:errorStartEditing'));
      return;
    }

    setState(prevState => ({ ...prevState, isPatching: true }));
    _.set(state.instrument, attribute, value);

    if (isNumber) {
      if (value === null) {
        patch(attribute, value);
      } else if (/^-?\d*[.,]?\d*$/.test(value)) {
        patch(attribute, _.toNumber(value));
      }
    } else {
      patch(attribute, value);
    }
  };

  const patch = (attribute, value) => {
    clearTimeout(state.updateAttributeDelay?.[attribute]);

    let setDelay = {
      [attribute]: setTimeout(() => {
        patchLayer(info?.id, attribute, value)
          .then(response => {
            if (response.data.success) {
              setState(prevState => ({ ...prevState, isPatching: false }));
              if (attribute === 'instrument_casing_id') {
                update();
              }
            } else {
              alert(response.data.message);
              window.location.reload();
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      }, 500),
    };

    Promise.resolve().then(() => {
      setState(prevState => ({
        ...prevState,
        updateAttributeDelay: setDelay,
      }));
    });
  };

  return (
    <Styled.FormContainer>
      {InstrumentAttributes.map((item, key) => (
        <Form autoComplete="false" error key={key} size="small">
          <Styled.AttributesContainer required={item.require}>
            {index === 0 && (
              <Styled.Label>
                <TranslationText id={item.label} firstUpperCase />
              </Styled.Label>
            )}

            {item.type === 'Input' && (
              <Styled.AttributesItem>
                <Input
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  onChange={e => {
                    updateChange(
                      item.value,
                      e.target.value === '' ? null : e.target.value,
                      item?.to,
                      item?.isNumber,
                    );
                  }}
                  spellCheck="false"
                  style={{ width: '100%' }}
                  value={
                    _.isNil(state?.instrument?.[item.value])
                      ? ''
                      : state.instrument[item.value]
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
                      e.id,
                      // item.multiple ? e.map(mlpr => mlpr.id) : e.id,
                      false,
                    )
                  }
                  schema={item.schema}
                  search={item.search}
                  selected={
                    _.isNil(state?.instrument?.[item.value])
                      ? null
                      : state.instrument[item.value]
                  }
                />
              </Styled.AttributesItem>
            )}

            {item.type === 'CasingDropdown' && (
              <Styled.AttributesItem>
                <CasingList
                  data={casing}
                  dropDownValue={
                    _.isNil(state?.instrument?.[item.value])
                      ? null
                      : state.instrument[item.value]
                  }
                  handleCasing={updateChange}
                  ItemValue={item.value}
                />
              </Styled.AttributesItem>
            )}

            {item.type === 'Button' && (
              <Button
                disabled={!isEditable}
                icon="close"
                onClick={() => {
                  deleting(info?.id);
                }}
                size="small"
              />
            )}
          </Styled.AttributesContainer>
        </Form>
      ))}
    </Styled.FormContainer>
  );
};

export default Instrument;
