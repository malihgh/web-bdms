import styled from 'styled-components';
import DomainText from '../../../domain/domainText';
export const Container = styled.div``;

export const MyCard = styled.div`
  display: flex;
  flex-direction: row;

  border: 1px solid lightgrey;
  border-radius: 4px;
  flex: 1;
`;

export const CardPattern = styled.div`
  background-color: ${props => props.bg};
  background-image: url('../../../../15102007.svg');
  background-size: cover;

  flex: 1;
  width: 40px;
`;

export const CardInfo = styled.div`
  padding: 5px 0px;
  padding-left: 10px;
  flex: 5;
`;

export const CardDeleteButton = styled.div`
  flex: 1;
`;

export const Text = styled.div`
  font-weight: ${props => (props.bold ? 'bold' : '100')};
  font-size: ${props => (props.bold ? '16px' : props.small ? '11px' : '14px')};
  color: ${props => (props.small ? 'grey' : props.warning ? 'red' : 'black')};
  padding-top: 3px;
`;

export const DomainTxt = styled(DomainText)``;
