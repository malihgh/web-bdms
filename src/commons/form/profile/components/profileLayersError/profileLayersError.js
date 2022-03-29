import React, { useState, useEffect } from 'react';
import * as Styled from './styles';
import { Icon, Radio } from 'semantic-ui-react';
import TranslationText from '../../../translationText';
import { gapLayer, addBedrock } from '@ist-supsi/bmsjs';
import _ from 'lodash';

const ProfileLayersError = props => {
  const {
    title,
    isEditable,
    id,
    isInside,
    onUpdated,
    layerIndex,
    layerLength,
  } = props.data;
  const [showSolution, setShowSolution] = useState();
  const [error, setError] = useState();
  const [resolvingAction, setResolvingAction] = useState();

  useEffect(() => {
    let e;

    switch (title) {
      case 'missingBedrock':
        e = ErrorTypes[0];
        break;
      case 'wrongDepth':
        e = ErrorTypes[5];
        break;
      case 'invertedDepth':
        e = ErrorTypes[1];
        break;
      case 'topOverlap':
        e = ErrorTypes[2];
        break;
      // case 'bottomOverlap':
      //   e = ErrorTypes[2];
      //   break;
      case 'topDisjoint':
        e = ErrorTypes[3];
        break;
      // case 'bottomDisjoint':
      //   e = ErrorTypes[3];
      //   break;
      case 'missingLayers':
        e = ErrorTypes[4];
        break;
      case 'delete':
        e = ErrorTypes[6];
        break;
      default:
        e = null;
    }
    setError(e);
    if (e === ErrorTypes[6]) setShowSolution(id);
  }, [title]);
  const ErrorTypes = [
    {
      id: 0,
      messageId: 'errorMissingBedrock',
      solutions: ['errorMissingBedrockSolution'],
    },
    {
      id: 1,
      messageId: 'invertedDepth',
      solutions: [],
    },
    {
      id: 2,
      messageId: 'errorOverlap',
      solutions: ['errorGapSolution2', 'errorGapSolution4'],
    },
    {
      id: 3,
      messageId: 'errorGap',
      solutions: [
        'errorGapSolution1',
        'errorGapSolution2',
        'errorGapSolution4',
      ],
    },
    {
      id: 4,
      messageId: 'errorStartWrong',
      solutions: ['errorGapSolution1', 'errorGapSolution3'],
    },
    { id: 5, messageId: 'errorWrongDepth', solutions: ['errorWrongDepth'] },
    {
      id: 6,
      messageId: 'errorAttention',
      solutions: ['deletelayer', 'extendupper', 'extendlower', 'setmanually'],
    },
  ];

  const resolving = title => {
    if (title === 'errorGapSolution1' || title === 'deletelayer') return 0;
    if (title === 'errorGapSolution2' || title === 'extendupper') return 1;
    if (
      title === 'errorGapSolution3' ||
      title === 'errorGapSolution3' ||
      title === 'extendlower'
    )
      return 2;
    if (title === 'setmanually') return 3;
  };
  const handleResolvingAction = (e, { value }) => {
    setResolvingAction(value);
  };
  const sendDataToServer = () => {
    setShowSolution();
    setResolvingAction();

    if (isInside || title === 'missingLayers') {
      gapLayer(id, resolvingAction)
        .then(response => {
          if (response.data.success) {
            onUpdated('fixErrors');
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else if (title === 'missingBedrock') {
      addBedrock(id)
        .then(response => {
          if (response.data.success) {
            onUpdated('fixErrors');
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  return (
    <Styled.ErrorCard
      isDelete={error?.id === 6}
      isFirstInList={error?.messageId === 'errorStartWrong'}
      isInside={isInside}>
      {error?.id !== 6 && (
        <Styled.Row>
          <Styled.ErrorMessageContainer>
            <Icon name="warning sign" />
            {/* {title === 'missingTo' && <>Add end of the layer</>} */}
            <TranslationText id={error?.messageId} />
          </Styled.ErrorMessageContainer>

          {isEditable && showSolution !== id && (
            <Styled.WrenchButtonContainer>
              <Styled.CardButton
                basic
                color="red"
                icon
                onClick={() => {
                  setShowSolution(id);
                }}
                size="mini">
                <Icon name="wrench" />
              </Styled.CardButton>
            </Styled.WrenchButtonContainer>
          )}
        </Styled.Row>
      )}

      {showSolution === id && error?.id !== 6 && (
        <Styled.SolutionContainer>
          <Styled.HowToResolveContainer>
            <TranslationText id="errorHowToResolve" />
          </Styled.HowToResolveContainer>
          {error?.solutions?.map((e, index) => (
            <div key={index} style={{ marginTop: 2 }}>
              {error.solutions.length > 1 && (
                <Radio
                  //   checked={resolving(e)}
                  // label={e}
                  name="radioGroup"
                  onChange={handleResolvingAction}
                  style={{ marginRight: 4 }}
                  value={resolving(e)}
                />
              )}
              <TranslationText id={e} />
            </div>
          ))}
          <Styled.CardButtonContainer>
            <Styled.CardButton
              basic
              // color="red"
              icon
              size="mini"
              onClick={() => {
                setShowSolution();
                setResolvingAction();
              }}>
              <Icon name="cancel" /> Cancel
            </Styled.CardButton>
            {error?.id !== 5 && (
              <Styled.CardButton
                // disable={error?.id !== 0 && resolvingAction === null}
                icon
                onClick={sendDataToServer}
                secondary
                size="mini">
                {error?.id !== 0 && (
                  <>
                    <Icon name="check" /> Confirm
                  </>
                )}
                {error?.id === 0 && (
                  <>
                    <Icon name="add" /> Add
                  </>
                )}
              </Styled.CardButton>
            )}
          </Styled.CardButtonContainer>
        </Styled.SolutionContainer>
      )}

      {showSolution === id && error?.id === 6 && (
        <Styled.SolutionContainer>
          <Styled.ErrorMessageContainer>
            <Icon name="warning sign" />
            {/* {title === 'missingTo' && <>Add end of the layer</>} */}
            <TranslationText id={error?.messageId} />
          </Styled.ErrorMessageContainer>

          <Styled.HowToResolveContainer>
            <TranslationText id="deletelayerconfirmation" />
          </Styled.HowToResolveContainer>
          {error?.solutions?.map((e, index) => (
            <div key={index} style={{ marginTop: 2 }}>
              {(index === 0 ||
                (layerIndex > 0 && (index === 1 || index === 3)) ||
                (layerIndex + 1 < layerLength && index === 2)) && (
                <>
                  <Radio
                    //   checked={resolving(e)}
                    // label={e}
                    name="radioGroup"
                    onChange={handleResolvingAction}
                    style={{ marginRight: 4 }}
                    value={resolving(e)}
                  />
                  <TranslationText id={e} />
                </>
              )}
            </div>
          ))}
          <Styled.CardButtonContainer>
            <Styled.CardButton
              basic
              // color="red"
              icon
              onClick={() => {
                setShowSolution();
                setResolvingAction();
              }}
              size="mini">
              <Icon name="cancel" /> Cancel
            </Styled.CardButton>
            <Styled.CardButton
              // disable={error?.id !== 0 && resolvingAction === null}
              icon
              negative
              onClick={sendDataToServer}
              size="mini">
              <Icon name="trash" /> Confirm
            </Styled.CardButton>
          </Styled.CardButtonContainer>
        </Styled.SolutionContainer>
      )}
    </Styled.ErrorCard>
  );
};

export default ProfileLayersError;
