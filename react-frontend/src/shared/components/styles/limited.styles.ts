import styled from 'styled-components';

interface ILimitedConatinerProps {
  width: number;
  margin?: string;
}

export const LimitedContainer = styled.div<ILimitedConatinerProps>`
  width: ${(props) => props.width}px;
  ${(props) => props.margin && `margin: ${props.margin}`}
`;
