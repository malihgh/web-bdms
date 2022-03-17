import React from 'react';
import * as Styled from './styles';
import InstrumentList from './components/infoList/InstrumentList';
import { attributes } from './data/attributes';
import { Button } from 'semantic-ui-react';
import TranslationText from '../../../translationText';

const ProfileInstrument = () => {
  return (
    <Styled.Container>
      <Styled.ButtonContainer>
        {/* {isEditable && ( */}
        <Button
          content={<TranslationText id="addInstrument" />}
          icon="add"
          //   onClick={CreateLayer}
          secondary
          size="tiny"
          style={{ margin: 10 }}
        />
        {/* )} */}
      </Styled.ButtonContainer>
      <Styled.ListContainer>
        <InstrumentList data={{ attributes, id: 0 }} />
        <InstrumentList data={{ attributes, id: 1 }} />
        <InstrumentList data={{ attributes, id: 1 }} />
        <InstrumentList data={{ attributes, id: 1 }} />
      </Styled.ListContainer>
    </Styled.Container>
  );
};

export default ProfileInstrument;
