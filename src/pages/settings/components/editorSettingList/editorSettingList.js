import React from 'react';
import * as Styled from './styles';
import { Segment } from 'semantic-ui-react';
import TranslationText from '../../../../commons/form/translationText';

const EditorSettingList = props => {
  const { data, toggleFilter, attribute } = props;

  return (
    <Styled.Container>
      {attribute.map((item, index) => (
        <Segment key={index}>
          <Styled.CheckboxContainer
            checked={
              item.value.split('.').length > 1
                ? data?.[item.value.split('.')[0]]?.[item.value.split('.')[1]]
                : data?.[item.value]
            }
            onChange={(e, d) => {
              toggleFilter(item.value, d.checked);
            }}
          />
          <TranslationText id={item.label} />
        </Segment>
      ))}
    </Styled.Container>
  );
};

export default EditorSettingList;
