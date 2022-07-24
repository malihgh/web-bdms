import React from 'react';
import * as Styled from './styles';
import { Checkbox, Segment } from 'semantic-ui-react';
import TranslationText from '../../../../commons/form/translationText';

const EditorSettingList = props => {
  const { setting, toggleFilter, attribute } = props;

  return (
    <>
      <Segment.Group>
        {attribute.map((item, index) => (
          <Segment key={index}>
            <Checkbox
              checked={
                item.value.split('.').length > 1
                  ? setting.data.efilter?.[item.value.split('.')[0]]?.[
                      item.value.split('.')[1]
                    ]
                  : setting.data.efilter?.[item.value]
              }
              label=""
              onChange={(e, d) => {
                toggleFilter(item.value, d.checked);
              }}
            />
            <TranslationText id={item.label} />
          </Segment>
        ))}
      </Segment.Group>
    </>
  );
};

export default EditorSettingList;
