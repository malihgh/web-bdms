import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

export const ErrorCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #fff6f6;
  border: 1px solid lightgrey;
  border-bottom: 0px;
  /* :hover {
    background-color: red;
  } */
`;
export const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
export const CardButtonContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardButton = styled(Button)`
  color: red;
`;
