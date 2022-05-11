import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import TranslationText from '../../../../../translationText';
import ProfileLayersError from '../profileLayersError';
import * as Styled from './styles';

const ProfileLayersList = props => {
  const {
    layers,
    isEditable,
    onUpdated,
    selectedLayer,
    showDelete,
    setShowDelete,
    selectedStratigraphyID,
    setSelectedLayer,
  } = props.data;
  return (
    <Styled.LayerContainer>
      {layers.validation && layers?.validation?.missingLayers && (
        <div
          style={{
            borderTop: '1px solid lightgrey',
          }}>
          <ProfileLayersError
            data={{
              title: 'missingLayers',
              isEditable,
              id: layers?.data?.[0].id,
              isInside: false,
              onUpdated: onUpdated,
            }}
          />
        </div>
      )}
      {layers.data &&
        layers.data.map((item, index) => (
          <Styled.Layer isFirst={index === 0 ? true : false} key={item.id}>
            {item.validation &&
              Object.keys(item.validation)
                .filter(
                  key =>
                    key !== 'missingTo' &&
                    key !== 'missingFrom' &&
                    key !== 'invertedDepth' &&
                    key !== 'bottomOverlap' &&
                    key !== 'bottomDisjoint',
                )
                .map((key, index) => (
                  <ProfileLayersError
                    key={index}
                    data={{
                      title: key,
                      isEditable,
                      id: item.id,
                      isInside: true,
                      onUpdated: onUpdated,
                    }}
                  />
                ))}
            <Styled.MyCard
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
              {showDelete !== item.id && (
                <>
                  <Styled.CardInfo>
                    <Styled.Text
                      warning={
                        item.depth_from === null ||
                        item?.validation?.topOverlap ||
                        item?.validation?.topDisjoint ||
                        item?.validation?.invertedDepth
                      }>
                      {(item?.validation?.topOverlap ||
                        item?.validation?.topDisjoint) &&
                        !item?.validation?.invertedDepth && (
                          <Icon name="warning sign" style={{ color: 'red' }} />
                        )}
                      {item.depth_from === null ||
                      item?.validation?.missingFrom ||
                      item?.validation?.invertedDepth ? (
                        <Popup
                          basic
                          content={
                            item?.validation?.invertedDepth ? (
                              <TranslationText id="invertedDepth" />
                            ) : (
                              <TranslationText id="errrorStartPoint" />
                            )
                          }
                          position="bottom left"
                          trigger={
                            <div>
                              <Icon
                                name="warning sign"
                                style={{ color: 'red' }}
                              />
                              {item?.validation?.invertedDepth &&
                                item.depth_from}
                              m
                            </div>
                          }
                        />
                      ) : (
                        item.depth_from + ' m'
                      )}
                    </Styled.Text>
                    <Styled.Text bold>
                      {item.title ? (
                        <Styled.DomainTxt
                          id={item.title}
                          schema={layers.config.title}
                        />
                      ) : (
                        '-'
                      )}
                    </Styled.Text>
                    <Styled.Text>
                      {item.subtitle ? (
                        <Styled.DomainTxt
                          id={item.subtitle}
                          schema={layers.config.subtitle}
                        />
                      ) : (
                        '-'
                      )}
                    </Styled.Text>
                    <Styled.Text small>
                      {item.description ? (
                        <Styled.DomainTxt
                          id={item.description}
                          schema={layers.config.description}
                        />
                      ) : (
                        '-'
                      )}
                    </Styled.Text>
                    <Styled.Text
                      warning={
                        item.depth_to === null ||
                        item?.validation?.bottomOverlap ||
                        item?.validation?.bottomDisjoint ||
                        item?.validation?.invertedDepth
                      }>
                      {(item?.validation?.bottomOverlap ||
                        item?.validation?.bottomDisjoint) &&
                        !item?.validation?.invertedDepth && (
                          <Icon name="warning sign" style={{ color: 'red' }} />
                        )}
                      {item.depth_to === null ||
                      item?.validation?.missingTo ||
                      item?.validation?.invertedDepth ? (
                        <Popup
                          basic
                          content={
                            item?.validation?.invertedDepth ? (
                              <TranslationText id="invertedDepth" />
                            ) : (
                              <TranslationText id="errorEndPoint" />
                            )
                          }
                          hoverable
                          position="bottom left"
                          trigger={
                            <div>
                              <Icon
                                name="warning sign"
                                style={{ color: 'red' }}
                              />
                              {item?.validation?.invertedDepth && item.depth_to}
                              m
                            </div>
                          }
                        />
                      ) : (
                        item.depth_to + ' m'
                      )}
                    </Styled.Text>
                  </Styled.CardInfo>
                  {isEditable && (
                    <Styled.CardButtonContainer>
                      <Styled.CardButton
                        basic
                        color="red"
                        icon
                        onClick={e => {
                          e.stopPropagation();
                          setShowDelete(item.id);
                        }}
                        size="mini">
                        <Icon name="trash alternate outline" />
                      </Styled.CardButton>
                    </Styled.CardButtonContainer>
                  )}
                </>
              )}
              {showDelete === item.id && (
                <ProfileLayersError
                  data={{
                    title: 'delete',
                    isEditable,
                    id: item.id,
                    isInside: true,
                    onUpdated: onUpdated,
                    layerIndex: index,
                    layerLength: layers.data.length,
                    closeDelete: () => setShowDelete(),
                  }}
                />
              )}
            </Styled.MyCard>
          </Styled.Layer>
        ))}
      {layers.validation &&
        Object.keys(layers?.validation)
          .filter(key => key !== 'missingLayers')
          .map((key, index) => (
            <div key={index}>
              <ProfileLayersError
                key={index}
                data={{
                  title: key,
                  isEditable,
                  id: selectedStratigraphyID,
                  isInside: false,
                  onUpdated: onUpdated,
                }}
              />
            </div>
          ))}
    </Styled.LayerContainer>
  );
};

export default ProfileLayersList;
