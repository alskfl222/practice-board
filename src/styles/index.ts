import styled from 'styled-components';

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
}

export const PageContainer = styled.div<PageContainerProps>`
  width: ${({ width }) => width || '100%'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  align-items: ${({ alignItems }) => alignItems || 'normal'};
  gap: ${({ gap }) => gap || '1rem'};
`;

export const PostHeader = styled.header`
  padding: 2rem;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`

export const HorizonDivider = styled.div<HorizonDividerProps>`
  align-self: center;
  width: ${({ width }) => width || '70%'};
  margin: 2rem 0;
  box-shadow: 0 0.5px 0 0.5px black;
`;
