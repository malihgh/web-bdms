import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import TranslationText from '../../../../../translationText';
import * as Styled from './styles';

const ProfileLayersList = props => {
  const {
    layers,
    isEditable,
    selectedLayer,
    showDelete,
    setShowDelete,
    setSelectedLayer,
    item,
  } = props.data;
  return (
    <>
      <Styled.MyCard
        onClick={() => setSelectedLayer(item)}
        style={{
          backgroundColor: selectedLayer?.id === item?.id && 'lightgrey',
        }}>
        <Styled.CardPattern
          b={item?.rgb?.[2]}
          g={item?.rgb?.[1]}
          r={item?.rgb?.[0]}
          style={{
            backgroundImage: item?.pattern
              ? 'url("' +
                process.env.PUBLIC_URL +
                '/img/lit/' +
                item?.pattern +
                '")'
              : '',
          }}
        />
        {showDelete !== item?.id && (
          <>
            <Styled.CardInfo>
              <Styled.Text
                warning={
                  item?.depth_from === null ||
                  item?.validation?.topOverlap ||
                  item?.validation?.topDisjoint ||
                  item?.validation?.invertedDepth
                }>
                {(item?.validation?.topOverlap ||
                  item?.validation?.topDisjoint) &&
                  !item?.validation?.invertedDepth && (
                    <Icon name="warning sign" style={{ color: 'red' }} />
                  )}
                {item?.depth_from === null ||
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
                        <Icon name="warning sign" style={{ color: 'red' }} />
                        {item?.validation?.invertedDepth && item?.depth_from}m
                      </div>
                    }
                  />
                ) : (
                  item?.depth_from + ' m'
                )}
              </Styled.Text>
              <Styled.Text bold>
                {item?.title ? (
                  <Styled.DomainTxt
                    id={item?.title}
                    schema={layers?.config.title}
                  />
                ) : (
                  '-'
                )}
              </Styled.Text>
              <Styled.Text>
                {item?.subtitle ? (
                  <Styled.DomainTxt
                    id={item?.subtitle}
                    schema={layers?.config.subtitle}
                  />
                ) : (
                  '-'
                )}
              </Styled.Text>
              <Styled.Text small>
                {item?.description ? (
                  <Styled.DomainTxt
                    id={item?.description}
                    schema={layers?.config.description}
                  />
                ) : (
                  '-'
                )}
              </Styled.Text>
              <Styled.Text
                warning={
                  item?.depth_to === null ||
                  item?.validation?.bottomOverlap ||
                  item?.validation?.bottomDisjoint ||
                  item?.validation?.invertedDepth
                }>
                {(item?.validation?.bottomOverlap ||
                  item?.validation?.bottomDisjoint) &&
                  !item?.validation?.invertedDepth && (
                    <Icon name="warning sign" style={{ color: 'red' }} />
                  )}
                {item?.depth_to === null ||
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
                        <Icon name="warning sign" style={{ color: 'red' }} />
                        {item?.validation?.invertedDepth && item?.depth_to}m
                      </div>
                    }
                  />
                ) : (
                  item?.depth_to + ' m'
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
                    setShowDelete(item?.id);
                  }}
                  size="mini">
                  <Icon name="trash alternate outline" />
                </Styled.CardButton>
              </Styled.CardButtonContainer>
            )}
          </>
        )}
      </Styled.MyCard>
    </>
  );
};

export default ProfileLayersList;
