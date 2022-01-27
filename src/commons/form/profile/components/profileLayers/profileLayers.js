import React from 'react';
import * as Styled from './styles';
import { Icon } from 'semantic-ui-react';

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
          <Styled.Text warning={0 === null}>
            {0 !== null ? (
              0
            ) : (
              <Icon name="warning sign" style={{ color: 'red' }} />
            )}{' '}
            m
          </Styled.Text>
          <Styled.Text bold>
            {15201080 !== null ? (
              <Styled.DomainTxt
                id={15201080}
                schema={'custom.lit_str_top_bedrock'}
              />
            ) : (
              '-'
            )}
          </Styled.Text>
          <Styled.Text>
            {15201080 !== null ? (
              <Styled.DomainTxt
                id={15001005}
                schema={'custom.chro_str_top_bedrock'}
              />
            ) : (
              '-'
            )}
          </Styled.Text>
          <Styled.Text small>
            {15201080 !== null ? (
              <Styled.DomainTxt
                id={15001005}
                schema={'custom.chro_str_top_bedrock'}
              />
            ) : (
              '-'
            )}
          </Styled.Text>
          <Styled.Text warning={0 === null}>
            {0 !== null ? (
              2
            ) : (
              <Icon name="warning sign" style={{ color: 'red' }} />
            )}{' '}
            m
          </Styled.Text>
        </Styled.CardInfo>
        <Styled.CardDeleteButton>trash</Styled.CardDeleteButton>
      </Styled.MyCard>
    </Styled.Container>
  );
};

export default ProfileLayers;
