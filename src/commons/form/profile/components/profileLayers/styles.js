import styled from 'styled-components';
import DomainText from '../../../domain/domainText';
import { Button } from 'semantic-ui-react';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  overflow: hidden;
  margin-top: 10px;
`;

export const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
  flex: 1 1 100%;
`;

export const LayerContainer = styled.div`
  flex: 1 1 100%;
  overflow-y: auto;
`;

export const Layer = styled.div`
  border: 1px solid lightgrey;
  border-top: ${props => !props.isFirst && '0px'};
`;

export const MyCard = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  cursor: pointer;
  :hover {
    background-color: lightgrey;
  }
`;

export const CardPattern = styled.div`
  background-color: ${props => `rgb(${props.r},${props.g},${props.b})`};
  background-size: cover;
  flex: 0.7;
  width: 40px;
`;

export const CardInfo = styled.div`
  padding: 5px 0px;
  padding-left: 12px;
  flex: 5;
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

export const Text = styled.div`
  display: flex;
  font-weight: ${props => (props.bold ? 'bold' : '100')};
  font-size: ${props => (props.bold ? '14px' : props.small ? '10px' : '13px')};
  color: ${props => (props.small ? 'grey' : props.warning ? 'red' : 'black')};
`;

export const DomainTxt = styled(DomainText)``;
