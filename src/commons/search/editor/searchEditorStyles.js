import styled from 'styled-components';

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* flex: ${props => (props.isVisible ? '1 1 100%' : null)}; */
  cursor: pointer;
`;

export const FilterButton = styled.div`
  padding: 0.5em 0px;
  border: 1px solid #e0e0e0;
  border-bottom-width: 0px;
  background-color: ${props => props.isSelected && '#e0e0e0'};
`;

export const FormFilterContainer = styled.div`
  flex: 1 1 100%;
  /* overflow: auto; */
  padding: 7px;
  padding-right: 15px;
  /* display: ${props => (props.isSelected ? 'null' : 'none')}; */
  border: 1px solid #e0e0e0;
`;
