import React from 'react';
import * as Styled from './styles';
import InfoList from './components/infoList/InfoList';

const ProfileInfo = props => {
  const { selectedStratigraphyID, isEditable, onUpdated, attribute, kind } =
    props.data;

  return (
    <Styled.Container>
      {attribute && (
        <InfoList
          data={{
            attribute,
            id: selectedStratigraphyID,
            isEditable,
            onUpdated,
            kind,
          }}
        />
      )}
    </Styled.Container>
  );
};

export default ProfileInfo;
