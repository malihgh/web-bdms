import styled from 'styled-components';
import { Form } from 'semantic-ui-react';

export const Container = styled.div`
  /* display: flex; */
  border: 1px solid lightgray;
  padding: 3px;
`;
export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 48% 48%;
  column-gap: 2%;
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  align-items: center;
`;

export const AttributesContainer = styled(Form.Field)`
  /* grid-column: 1/2; */
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const AttributesItem = styled.div`
  /* width: 50%; */
  margin-top: 5px;
  padding-bottom: 10px;
`;
