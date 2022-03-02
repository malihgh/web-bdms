import React, { useEffect, useState } from 'react';
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
  const [showSolutionItem, setShowSolutionItem] = useState();

  useEffect(() => {
    if (selectedStratigraphyID) {
      GetData();
    }
  }, [selectedStratigraphyID, reloadLayer]);

  const GetData = () => {
    getProfileLayers(selectedStratigraphyID, true)
      .then(response => {
        if (response.data.success) {
          setLayers(response.data);
          console.log('djfii', response.data);
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
              <Styled.Layer key={item.id} isFirst={index === 0 ? true : false}>
                <Styled.MyCard
                  onClick={() => setSelectedLayer(item)}
                  style={{
                    backgroundColor:
                      selectedLayer?.id === item.id && 'lightgrey',
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
                {item.validation && (
                  <Styled.ErrorCard>
                    {showSolutionItem?.id !== item.id && (
                      <Styled.Row>
                        <div>
                          {item.validation.errorGap === true ? (
                            <TranslationText id="errorGap" />
                          ) : item.validation.errorStartWrong === true ? (
                            <TranslationText id="errorStartWrong" />
                          ) : (
                            <TranslationText id="errorOverlap" />
                          )}
                        </div>
                        <Styled.CardDeleteButton
                          basic
                          color="red"
                          icon
                          size="mini"
                          onClick={() => {
                            setShowSolutionItem(item);
                          }}>
                          <Icon name="wrench" />
                        </Styled.CardDeleteButton>
                      </Styled.Row>
                    )}
                    {showSolutionItem?.id === item.id && (
                      <div>
                        <div>Soulutions</div>
                        <Styled.CardDeleteButton
                          basic
                          color="red"
                          icon
                          size="mini"
                          onClick={() => {
                            setShowSolutionItem();
                          }}>
                          <Icon name="cancel" />
                        </Styled.CardDeleteButton>
                      </div>
                    )}
                  </Styled.ErrorCard>
                )}
              </Styled.Layer>
            ))}
        </Styled.LayerContainer>
      )}
    </Styled.Container>
  );
};

export default ProfileLayers;
