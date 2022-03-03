import React, { useState } from 'react';
import * as Styled from './styles';
import { Icon } from 'semantic-ui-react';
import TranslationText from '../../../translationText';

const ProfileLayersError = props => {
  const { title, isEditable, id } = props.data;
  const [showSolution, setShowSolution] = useState();

  return (
    <Styled.ErrorCard>
      <Styled.Row>
        <div style={{ color: '#9f3a38' }}>
          <Icon name="warning sign" />

          {(title === 'topOverlap' || title === 'bottomOverlap') && (
            <TranslationText id="errorOverlap" />
          )}
          {(title === 'topDisjoint' || title === 'bottomDisjoint') && (
            <TranslationText id="errorGap" />
          )}
          {title === 'missingTo' && <>Add end of the layer</>}
          {title === 'missingLayers' && (
            <TranslationText id="errorStartWrong" />
          )}
          {title === 'missingBedrock' && (
            <TranslationText id="errorMissingBedrock" />
          )}
          {title === 'invertedDepth' && <TranslationText id="invertedDepth" />}
        </div>

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
          <div
            style={{
              fontSize: '0.8em',
              color: '#9f3a38',
            }}>
            <TranslationText id="errorHowToResolve" />
          </div>
          <div>sulutions</div>
          <Styled.CardButtonContainer
            style={{
              justifyContent: 'flex-end',
            }}>
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
