import React from 'react';
import * as Styled from './styles';

const ProfileLayers = () => {
  return (
    <Styled.Container>
      <Styled.MyCard>
        <Styled.CardPattern
          bg={'#ff77ff'}
          style={{ backgroundImage: `url('../../../../favicon-16x16.png')` }}>
          pattern
        </Styled.CardPattern>
        <Styled.CardInfo>
          <Styled.Text>0 m</Styled.Text>
          <Styled.Text bold>
            <Styled.DomainTxt
              id={15201080}
              schema={'custom.lit_str_top_bedrock'}
            />
          </Styled.Text>
          <Styled.Text>
            <Styled.DomainTxt
              id={15001005}
              schema={'custom.chro_str_top_bedrock'}
            />
          </Styled.Text>
          <Styled.Text small>
            <Styled.DomainTxt
              id={15001005}
              schema={'custom.chro_str_top_bedrock'}
            />
          </Styled.Text>

          <Styled.Text>2 m</Styled.Text>
        </Styled.CardInfo>
        <Styled.CardDeleteButton>trash</Styled.CardDeleteButton>
      </Styled.MyCard>
    </Styled.Container>
  );
};

export default ProfileLayers;
