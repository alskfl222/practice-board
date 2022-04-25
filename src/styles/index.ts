import styled from 'styled-components';
import { theme } from './theme';

interface PageContainerProps {
  width?: string;
  margin?: string;
  padding?: string;
  flexDirection?: string;
  alignItems?: string;
  gap?: string;
}
interface HorizonDividerProps {
  width?: string;
  margin?: string;
}

export const PageContainer = styled.div<PageContainerProps>`
  width: ${({ width }) => width || '100%'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  align-items: ${({ alignItems }) => alignItems || 'normal'};
  gap: ${({ gap }) => gap || '0.5rem'};
`;

export const FormContainer = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
export const InputContainer = styled.label`
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;
export const MessageContainer = styled.div`
  font-size: 0.8rem;
`;

export const PostHeader = styled.header<{ padding?: string }>`
  padding: ${({ padding }) => padding || '2rem'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  select {
    width: 20%;
    padding: 0 0.2rem;
  }
`;

export const TitleInput = styled.input<{ fontSize?: string }>`
  flex-grow: 1;
  min-width: 0;
  padding: 0.2rem;
  padding-left: 1rem;
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
  font-size: ${({ fontSize }) => fontSize || '1.5rem'};
  &:focus {
    border-bottom: 1px solid ${theme.background.baseColor};
  }
`;

export const PostControllerContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

export const HorizonDivider = styled.div<HorizonDividerProps>`
  align-self: center;
  width: ${({ width }) => width || '70%'};
  margin: ${({ margin }) => margin || '2rem 0'};
  box-shadow: 0 0.5px 0 0.5px black;
`;

export const PostBody = styled.div<{ border?: string }>`
  width: calc(100% -4rem);
  min-height: calc(100vh - 25rem);
  margin: 0 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: ${({ border }) => border || 'none'};
  border-radius: 1rem;
`;

export const PostContentTextarea = styled.textarea`
  width: 100%;
  padding: 2rem;
  padding-bottom: 40%;
  border-radius: 1rem;
  overflow-y: hidden;
  resize: none;
`;
