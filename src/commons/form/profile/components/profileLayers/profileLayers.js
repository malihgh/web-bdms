import React, { useEffect, useState } from 'react';
import * as Styled from './styles';
import { getProfileLayers } from '@ist-supsi/bmsjs';
import { Icon } from 'semantic-ui-react';

const ProfileLayers = props => {
  const { isEditable, selectedStratigraphyID } = props.data;
  const [layers, setLayers] = useState(null);

  useEffect(() => {
    if (selectedStratigraphyID) {
      GetData();
    }
  }, [selectedStratigraphyID]);

  const GetData = () => {
    getProfileLayers(selectedStratigraphyID)
      .then(response => {
        if (response.data.success) {
          setLayers(response.data);
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      {layers === null && <Styled.Empty>select an stratigraphy</Styled.Empty>}
      {layers !== null && (
        <Styled.Container>
          {layers.data.map((item, index) => (
            <Styled.MyCard
              key={item.id}
              isFirst={index === 0 ? true : false}
              onClick={() => console.log('profileLayers')}>
              {console.log('hey', item.pattern)}
              <Styled.CardPattern
                r={item.rgb?.[0]}
                g={item.rgb?.[1]}
                b={item.rgb?.[2]}
                style={{
                  backgroundImage:
                    'url("' +
                    process.env.PUBLIC_URL +
                    '/img/lit/' +
                    item.pattern +
                    '")',
                }}
              />

              <Styled.CardInfo>
                <Styled.Text warning={item.depth_from === null}>
                  {item.depth_from !== null ? (
                    item.depth_from
                  ) : (
                    <Icon name="warning sign" style={{ color: 'red' }} />
                  )}{' '}
                  m
                </Styled.Text>
                <Styled.Text bold>
                  {item.title !== null ? (
                    <Styled.DomainTxt
                      id={item.title}
                      schema={layers.config.title}
                    />
                  ) : (
                    '-'
                  )}
                </Styled.Text>
                <Styled.Text>
                  {item.subtitle !== null ? (
                    <Styled.DomainTxt
                      id={item.subtitle}
                      schema={layers.config.subtitle}
                    />
                  ) : (
                    '-'
                  )}
                </Styled.Text>
                <Styled.Text small>
                  {item.description !== null ? (
                    <Styled.DomainTxt
                      id={item.description}
                      schema={layers.config.title}
                    />
                  ) : (
                    '-'
                  )}
                </Styled.Text>
                <Styled.Text warning={item.depth_to === null}>
                  {item.depth_to !== null ? (
                    item.depth_to
                  ) : (
                    <Icon name="warning sign" style={{ color: 'red' }} />
                  )}{' '}
                  m
                </Styled.Text>
              </Styled.CardInfo>
              {isEditable && (
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
          ))}
        </Styled.Container>
      )}
    </div>
  );
};

export default ProfileLayers;
