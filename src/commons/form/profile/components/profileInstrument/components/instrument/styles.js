import styled from 'styled-components';
import { Form } from 'semantic-ui-react';

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 9% 9% 9% 14% 14% 14% 16% 7%;
  column-gap: 1.5%;
  min-width: 500px;
`;

export const AttributesContainer = styled(Form.Field)``;

export const AttributesItem = styled.div`
  margin-top: 5px;
  padding-bottom: 10px;
`;

export const Label = styled.label`
  font-weight: bold;
  white-space: nowrap;
`;
