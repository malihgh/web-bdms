import React, { useEffect, useState, useCallback } from 'react';
import * as Styled from './styles';
import { getProfileLayers, createLayer, deleteLayer } from '@ist-supsi/bmsjs';
import { Icon, Button } from 'semantic-ui-react';
import TranslationText from '../../../translationText';

const ProfileLayers = props => {
  const {
    isEditable,
    selectedStratigraphyID,
    selectedLayer,
    setSelectedLayer,
    reloadLayer,
    onUpdated,
  } = props.data;
  const [layers, setLayers] = useState(null);

  useEffect(() => {
    if (selectedStratigraphyID) {
      GetData();
    }
  }, [selectedStratigraphyID, reloadLayer]);

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
    <Styled.Container>
      {isEditable && (
        <Button
          fluid
          onClick={() => {
            createLayer(selectedStratigraphyID)
              .then(response => {
                if (response.data.success) {
                  onUpdated('newLayer');
                } else {
                  alert(response.data.message);
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
          secondary
          size="tiny"
          style={{ marginBottom: '10px' }}>
          <TranslationText id="add" />
        </Button>
      )}
      {layers?.data?.length === 0 && (
        <Styled.Empty>Nothing to show</Styled.Empty>
      )}
      {layers !== null && layers?.data?.length !== 0 && (
        <Styled.LayerContainer>
          {layers.data &&
            layers.data.map((item, index) => (
              <Styled.MyCard
                isFirst={index === 0 ? true : false}
                key={item.id}
                onClick={() => setSelectedLayer(item)}
                style={{
                  backgroundColor: selectedLayer?.id === item.id && 'lightgrey',
                }}>
                <Styled.CardPattern
                  b={item.rgb?.[2]}
                  g={item.rgb?.[1]}
                  r={item.rgb?.[0]}
                  style={{
                    backgroundImage: item.pattern
                      ? 'url("' +
                        process.env.PUBLIC_URL +
                        '/img/lit/' +
                        item.pattern +
                        '")'
                      : '',
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
                        schema={layers.config.description}
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
                      size="mini"
                      onClick={() => {
                        deleteLayer(item.id)
                          .then(response => {
                            if (response.data.success) {
                              onUpdated('deleteLayer');
                            } else {
                              alert(response.data.message);
                            }
                          })
                          .catch(function (error) {
                            console.log(error);
                          });
                      }}>
                      <Icon name="trash alternate outline" />
                    </Styled.CardDeleteButton>
                  </Styled.CardDeleteContainer>
                )}
              </Styled.MyCard>
            ))}
        </Styled.LayerContainer>
      )}
    </Styled.Container>
  );
};

export default ProfileLayers;
