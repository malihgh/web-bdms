import styled from 'styled-components';
import DomainText from '../../../domain/domainText';
import { Button } from 'semantic-ui-react';

export const Container = styled.div`
  overflow-y: scroll;
  height: 80%;
`;
export const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
  height: 100%;
`;

export const LayerContainer = styled.div``;

export const MyCard = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid lightgrey;
  border-top: ${props => !props.isFirst && '0px'};
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

export const CardDeleteContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardDeleteButton = styled(Button)`
  color: red;
`;

export const Text = styled.div`
  font-weight: ${props => (props.bold ? 'bold' : '100')};
  font-size: ${props => (props.bold ? '16px' : props.small ? '11px' : '14px')};
  color: ${props => (props.small ? 'grey' : props.warning ? 'red' : 'black')};
  padding-top: 3px;
`;

export const DomainTxt = styled(DomainText)``;
