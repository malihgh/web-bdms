import React from 'react';
import * as Styled from './styles';
import InfoList from './components/infoList/InfoList';

const ProfileInfo = props => {
  const { item, isEditable, onUpdated, attribute } = props.data;

  return (
    <Styled.Container>
      {attribute && (
        <InfoList data={{ attribute, info: item, isEditable, onUpdated }} />
      )}
    </Styled.Container>
  );
};

export default ProfileInfo;
