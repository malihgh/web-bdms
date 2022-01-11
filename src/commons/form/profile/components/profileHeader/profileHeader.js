import React, { useState } from 'react';
import * as Styled from './styles';
import { Button, Icon } from 'semantic-ui-react';
import TranslationText from './../../../translationText';

const ProfileHeader = () => {
  const [showStratigraphyButton, setShowStratigraphyButton] = useState(true);
  const [isPrimary, setIsPrimary] = useState(true);

  return (
    <Styled.Container>
      {showStratigraphyButton && (
        <Button
          content={<TranslationText id="stratigraphy" />}
          icon="add"
          secondary
          size="small"
        />
      )}

      <Styled.Item>
        <Styled.ItemName>
          {isPrimary && <Icon name="check" />}
          Mali
        </Styled.ItemName>
        <Styled.ItemDate>1/02</Styled.ItemDate>
      </Styled.Item>
    </Styled.Container>
  );
};
export default ProfileHeader;
