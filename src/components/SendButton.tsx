import styled from 'styled-components';
import { theme } from '../styles/theme';

interface SendButtonProps {
  minWidth? : string;
}

export default styled.button<SendButtonProps>`
  min-width: ${({ minWidth }) => minWidth || '3rem'};
  padding: 0.5rem;
  border: 1px solid ${theme.border.gray707070};
  border-radius: 1rem;
  background-color: transparent;
  overflow: hidden;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    color: #777;
    cursor: default;
    &:hover {
      background-color: #ccc;
    }
  }
  &:hover {
    background-color: #0003;
  }
`;
