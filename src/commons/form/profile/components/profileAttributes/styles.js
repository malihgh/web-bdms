import styled from 'styled-components';
import { Form } from 'semantic-ui-react';

export const Container = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 10px;
  padding-top: 0px;
  padding-bottom: 40px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
`;

export const AttributesContainer = styled(Form.Field)`
  padding-bottom: 10px;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const AttributesItem = styled.div`
  width: 100%;
  margin-top: 5px;
`;