import React, { useState, useEffect } from 'react';
import * as Styled from './styles';
import { Icon, Radio } from 'semantic-ui-react';
import TranslationText from '../../../translationText';
import { gapLayer } from '@ist-supsi/bmsjs';

const ProfileLayersError = props => {
  const { title, isEditable, id, isInside, onUpdated } = props.data;
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
      default:
        e = null;
    }
    setError(e);
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
  ];

  const resolving = title => {
    if (title === 'errorGapSolution1') return 0;
    if (title === 'errorGapSolution2') return 1;
    if (title === 'errorGapSolution3' || 'errorGapSolution3') return 2;
  };
  const handleResolvingAction = (e, { value }) => {
    setResolvingAction(value);
  };
  const sendDataToServer = () => {
    // console.log('ffffff', id, resolvingAction);
    setShowSolution();
    setResolvingAction();

    if (isInside) {
      gapLayer(id, resolvingAction)
        .then(response => {
          if (response.data.success) {
            onUpdated('fixErrors');

            console.log('dataaaaaa', response.data, id, resolvingAction);
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
      isFirstInList={error?.messageId === 'errorStartWrong'}
      isInside={isInside}>
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

      {showSolution === id && (
        <Styled.SolutionContainer>
          <Styled.HowToResolveContainer>
            <TranslationText id="errorHowToResolve" />
          </Styled.HowToResolveContainer>
          {error?.solutions?.map((e, index) => (
            <div key={index} style={{ marginTop: 2 }}>
              {console.log('ddddd', resolving(e))}
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
            <Styled.CardButton
              disable={resolvingAction === null}
              icon
              onClick={sendDataToServer}
              secondary
              size="mini">
              <Icon name="check" /> Confirm
            </Styled.CardButton>
          </Styled.CardButtonContainer>
        </Styled.SolutionContainer>
      )}
    </Styled.ErrorCard>
  );
};

export default ProfileLayersError;
