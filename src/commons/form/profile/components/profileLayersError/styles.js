import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

export const ErrorCard = styled.div`
  display: flex;
  padding: 7px;
  flex-direction: column;
  background-color: #fff6f6;
  border: 1px solid lightgrey;
  border-bottom: ${props => props.isInside && '1px'};
  border-left: ${props => props.isInside && '0px'};
  border-right: ${props => props.isInside && '0px'};
  border-top: ${props => !props.isInside && '0px'};
  border-bottom: ${props => props.isFirstInList && '0px'};
  /* :hover {
    background-color: red;
  } */
`;
export const ErrorMessageContainer = styled.div`
  color: #9f3a38;
  font-weight: bold;
`;
export const HowToResolveContainer = styled.div`
  font-size: 0.8em;
  color: #9f3a38;
  margin-bottom: 3px;
`;
export const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const CardButtonContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const CardButton = styled(Button)`
  /* color: red; */
`;
