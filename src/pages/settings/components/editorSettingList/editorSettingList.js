import React from 'react';
import * as Styled from './styles';
import { Segment } from 'semantic-ui-react';
import TranslationText from '../../../../commons/form/translationText';
import _ from 'lodash';

const EditorSettingList = props => {
  const {
    data,
    toggleFilter,
    attribute,
    toggleField,
    listName,
    geocode,
    codes,
  } = props;

  const isVisible = field => {
    if (_.has(codes, 'data.layer_kind') && _.isArray(codes.data.layer_kind)) {
      for (let idx = 0; idx < codes.data.layer_kind.length; idx++) {
        const element = codes.data.layer_kind[idx];
        if (element.code === geocode) {
          if (
            _.isObject(element.conf) &&
            _.has(element.conf, `fields.${field}`)
          ) {
            return element.conf.fields[field];
          } else {
            return false;
          }
        }
      }
    }
    return false;
  };
  return (
    <Styled.Container>
      {attribute.map((item, index) => (
        <Segment key={index}>
          <Styled.CheckboxContainer
            checked={
              listName === 'stratigraphyfields'
                ? isVisible(item.value)
                : item.value.split('.').length > 1
                ? data?.[item.value.split('.')[0]]?.[item.value.split('.')[1]]
                : data?.[item.value]
            }
            onChange={(e, d) => {
              if (listName === 'stratigraphyfields') {
                toggleField(item.value, d.checked);
              } else {
                toggleFilter(item.value, d.checked);
              }
            }}
          />
          <TranslationText id={item.label} />
        </Segment>
      ))}
    </Styled.Container>
  );
};

export default EditorSettingList;
