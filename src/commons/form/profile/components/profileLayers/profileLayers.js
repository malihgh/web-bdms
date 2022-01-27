import React from 'react';
import * as Styled from './styles';
import { Icon } from 'semantic-ui-react';

const ProfileLayers = () => {
  return (
    <Styled.Container>
      <Styled.MyCard onClick={() => console.log('profileLayers')}>
        <Styled.CardPattern r={123} g={123} b={123}></Styled.CardPattern>
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
        {true && (
          <Styled.CardDeleteContainer>
            <Styled.CardDeleteButton
              basic
              color="red"
              icon
              onClick={() => console.log('profileLayers')}>
              <Icon name="trash alternate outline" />
            </Styled.CardDeleteButton>
          </Styled.CardDeleteContainer>
        )}
      </Styled.MyCard>
    </Styled.Container>
  );
};

export default ProfileLayers;
