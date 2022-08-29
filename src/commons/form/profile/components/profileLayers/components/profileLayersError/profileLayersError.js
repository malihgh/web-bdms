import React, { useState, useEffect } from 'react';
import * as Styled from './styles';
import { Icon, Radio, Form, Input } from 'semantic-ui-react';
import TranslationText from '../../../../../translationText';
import { gapLayer, addBedrock, deleteLayer } from '@ist-supsi/bmsjs';
import ErrorTypes from './errorTypes';
const ProfileLayersError = props => {
  const {
    title,
    isEditable,
    id,
    isInside,
    onUpdated,
    layerIndex,
    layerLength,
    closeDelete,
  } = props.data;
  const [showSolution, setShowSolution] = useState();
  const [error, setError] = useState();
  const [resolvingAction, setResolvingAction] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [value, setValue] = useState(null);

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
    if (e === ErrorTypes[6]) {
      setIsDelete(true);
      setShowSolution(id);
    } else setIsDelete(false);
  }, [title, id]);

  const resolving = title => {
    if (title === 'errorGapSolution1' || title === 'deletelayer') return 0;
    if (title === 'errorGapSolution2' || title === 'extendupper') return 1;
    if (
      title === 'errorGapSolution3' ||
      title === 'errorGapSolution4' ||
      title === 'extendlower'
    )
      return 2;
    if (title === 'setmanually') return 3;
  };
  const handleResolvingAction = (e, { value }) => {
    e.stopPropagation();
    setResolvingAction(value);
  };
  const handleValue = (e, { value }) => {
    e.stopPropagation();
    setValue(value);
  };
  const onCancelClicked = () => {
    setShowSolution();
    setResolvingAction(null);
    if (isDelete) closeDelete();
  };
  const sendDataToServer = () => {
    onCancelClicked();

    if ((isInside && !isDelete) || title === 'missingLayers') {
      gapLayer(id, resolvingAction)
        .then(response => {
          if (response.data.success) {
            onUpdated('fixErrors');
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => {
          console.error(error);
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
          console.error(error);
        });
    } else if (isDelete) {
      deleteLayer(id, resolvingAction, +value)
        .then(response => {
          if (response.data.success) {
            onUpdated('deleteLayer');
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };
  return (
    <Styled.ErrorCard
      isDelete={isDelete}
      isFirstInList={error?.messageId === 'errorStartWrong'}
      isInside={isInside}>
      {!isDelete && (
        <Styled.Row
          onClick={() => {
            setShowSolution(id);
          }}>
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

      {showSolution === id && !isDelete && (
        <Styled.SolutionContainer>
          {error.id !== 5 && (
            <Styled.HowToResolveContainer>
              <TranslationText id="errorHowToResolve" />
            </Styled.HowToResolveContainer>
          )}
          {error?.solutions?.map((e, index) => (
            <div key={index} style={{ marginTop: 2 }}>
              {error.solutions.length > 1 && (
                <Radio
                  checked={resolvingAction === resolving(e)}
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
              icon
              size="mini"
              onClick={() => {
                onCancelClicked();
              }}>
              <Icon name="cancel" />
              <TranslationText id="cancel" />
            </Styled.CardButton>
            {error?.id !== 5 && (
              <Styled.CardButton
                disabled={resolvingAction === null && error?.id !== 0}
                icon
                onClick={sendDataToServer}
                secondary
                size="mini">
                {error?.id !== 0 && (
                  <>
                    <Icon name="check" />
                    <TranslationText id="confirm" />
                  </>
                )}
                {error?.id === 0 && (
                  <>
                    <Icon name="add" />
                    <TranslationText id="add" />
                  </>
                )}
              </Styled.CardButton>
            )}
          </Styled.CardButtonContainer>
        </Styled.SolutionContainer>
      )}

      {showSolution === id && isDelete && (
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
                    checked={resolvingAction === resolving(e)}
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
          {resolvingAction === 3 && (
            <Form.Field>
              <Input onChange={handleValue} type="number" />
            </Form.Field>
          )}
          <Styled.CardButtonContainer>
            <Styled.CardButton
              basic
              icon
              onClick={e => {
                e.stopPropagation();
                onCancelClicked();
              }}
              size="mini">
              <Icon name="cancel" />
              <TranslationText id="cancel" />
            </Styled.CardButton>
            <Styled.CardButton
              disabled={resolvingAction === null}
              icon
              negative
              onClick={sendDataToServer}
              size="mini">
              <Icon name="trash" />
              <TranslationText id="confirm" />
            </Styled.CardButton>
          </Styled.CardButtonContainer>
        </Styled.SolutionContainer>
      )}
    </Styled.ErrorCard>
  );
};

export default ProfileLayersError;
