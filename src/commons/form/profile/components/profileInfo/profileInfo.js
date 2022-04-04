import React from 'react';
import * as Styled from './styles';
import InfoList from './components/infoList/InfoList';

const ProfileInfo = props => {
  const { item, isEditable, onUpdated, attribute } = props.data;

  return (
    <Styled.Container>
      {attribute && item?.id && (
        <InfoList data={{ attribute, id: item.id, isEditable, onUpdated }} />
      )}
    </Styled.Container>
  );
};

export default ProfileInfo;
