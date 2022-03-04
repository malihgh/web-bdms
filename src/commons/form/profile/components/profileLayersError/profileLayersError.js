import React, { useState, useEffect } from 'react';
import * as Styled from './styles';
import { Icon, Radio } from 'semantic-ui-react';
import TranslationText from '../../../translationText';

const ProfileLayersError = props => {
  const { title, isEditable, id, isInside } = props.data;
  const [showSolution, setShowSolution] = useState();
  const [error, setError] = useState();

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
      case 'bottomOverlap':
        e = ErrorTypes[2];
        break;
      case 'topDisjoint':
        e = ErrorTypes[3];
        break;
      case 'bottomDisjoint':
        e = ErrorTypes[3];
        break;
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
        )}
      </Styled.Row>

      {showSolution === id && (
        <div>
          <Styled.HowToResolveContainer>
            <TranslationText id="errorHowToResolve" />
          </Styled.HowToResolveContainer>
          {error?.solutions?.map((e, index) => (
            <div key={index} style={{ marginTop: 2 }}>
              {error.solutions.length > 1 && (
                <Radio
                  // checked={this.state.resolvingAction === 0}
                  // label={e}
                  name="radioGroup"
                  // onChange={this.handleResolvingAction}
                  value={0}
                  style={{ marginRight: 4 }}
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
              }}>
              <Icon name="cancel" /> Cancel
            </Styled.CardButton>
            <Styled.CardButton
              // disable=
              icon
              onClick={() => {
                // setShowSolution();
              }}
              secondary
              size="mini">
              <Icon name="check" /> Confirm
            </Styled.CardButton>
          </Styled.CardButtonContainer>
        </div>
      )}
    </Styled.ErrorCard>
  );
};

export default ProfileLayersError;
