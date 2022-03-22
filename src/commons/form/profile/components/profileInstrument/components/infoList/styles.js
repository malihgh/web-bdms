import styled from 'styled-components';
import { Form } from 'semantic-ui-react';

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 14% 14% 14% 14% 14% 14% 6%;
  column-gap: 2%;
`;

export const AttributesContainer = styled(Form.Field)``;

export const AttributesItem = styled.div`
  margin-top: 5px;
  padding-bottom: 10px;
`;

export const Label = styled.label`
  font-weight: bold;
`;