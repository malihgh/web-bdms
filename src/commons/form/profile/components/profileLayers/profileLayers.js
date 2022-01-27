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
        setLayers({
          config: {
            title: 'custom.lit_str_top_bedrock',
            subtitle: 'custom.chro_str_top_bedrock',
            description: 'custom.lit_pet_top_bedrock',
          },
          data: [
            {
              id: 7666,
              depth_from: 0,
              depth_to: 2,
              title: 15201080,
              subtitle: 15001005,
              description: 15201080,
              rgb: [195, 220, 185],
              pattern: '15101001.svg',
            },
            {
              id: 7662,
              depth_from: 2,
              depth_to: null,
              title: null,
              subtitle: null,
              description: null,
              rgb: null,
              pattern: null,
            },
          ],
        });
        // if (response.data.success) {
        //   // setLayers(response.data.data);
        // } else {
        //   alert(response.data.message);
        // }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Styled.Container>
      {layers?.data?.map((item, index) => (
        <Styled.MyCard
          key={item.id}
          isFirst={index === 0 ? true : false}
          onClick={() => console.log('profileLayers')}>
          {item.rgb !== null ? (
            <Styled.CardPattern
              r={item.rgb[0]}
              g={item.rgb[1]}
              b={item.rgb[2]}
            />
          ) : (
            <Styled.CardPattern transparent />
          )}
          {console.log('hey', index)}
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
  );
};

export default ProfileLayers;
