import React, { useState, useCallback, useEffect } from 'react';
import * as Styled from './styles';
import { Input, Form, Button } from 'semantic-ui-react';
import TranslationText from '../../../../../translationText';
import DomainDropdown from '../../../../../domain/dropdown/domainDropdown';
import { patchLayer, getProfiles } from '@ist-supsi/bmsjs';
import { attributes } from '../../data/attributes';

import _ from 'lodash';

const Instrument = props => {
  const { index, info, deleting, isEditable, boreholeID } = props.data;

  const [state, setState] = useState({
    isFetching: false,
    isPatching: false,
    updateAttributeDelay: {},
    casing: [],
    instrument: {
      id: info.id,
      instrument_kind: info.instrument_kind,
      depth_from: info.depth_from,
      depth_to: info.depth_to,
      notes: info.notes,
      instrument_status: info.instrument_status ? info.instrument_status : null,
      casing_id: info.casing_id ? info.casing_id : null,
    },
  });

  const getData = useCallback((id, kind) => {
    getProfiles(id, kind)
      .then(response => {
        if (response.data.success) {
          console.log('response', response.data.data, state.casing);
          setState(prevState => ({ ...prevState, casing: response.data.data }));
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (boreholeID) getData(boreholeID, 3002);
  }, [boreholeID, getData]);

  const updateChange = (attribute, value, to = true, isNumber = false) => {
    if (!isEditable) {
      alert('You should press start editing button! ');
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
