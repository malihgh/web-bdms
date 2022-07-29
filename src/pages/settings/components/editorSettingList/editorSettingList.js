import React from 'react';
import * as Styled from './styles';
import { Checkbox, Segment } from 'semantic-ui-react';
import TranslationText from '../../../../commons/form/translationText';

const EditorSettingList = props => {
  const { data, toggleFilter, attribute } = props;

  return (
    <Styled.Container>
      {attribute.map((item, index) => (
        <Segment key={index}>
          <Checkbox
            checked={
              item.value.split('.').length > 1
                ? data?.[item.value.split('.')[0]]?.[item.value.split('.')[1]]
                : data?.[item.value]
            }
            label=""
            onChange={(e, d) => {
              toggleFilter(item.value, d.checked);
            }}
          />
          {console.log('item.value', data)}
          <TranslationText id={item.label} />
        </Segment>
      ))}
    </Styled.Container>
  );
};

export default EditorSettingList;
