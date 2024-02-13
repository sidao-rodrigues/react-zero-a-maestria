import styled from 'styled-components';

interface IDisplayFlexProps {
  margin?: string;
}

export const DisplayFlex = styled.div`
  display: flex;
`;

export const DisplayFlexJustifyRight = styled(DisplayFlex)`
  justify-content: right;
`;

// eslint-disable-next-line prettier/prettier
export const DisplayFlexJustifyBetween = styled(DisplayFlex) <IDisplayFlexProps>`
  display: flex;
  justify-content: space-between;
  ${(props) => props.margin && `margin: ${props.margin}`}
`;
