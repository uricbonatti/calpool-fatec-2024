import styled, { DefaultTheme } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 52px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.GRAY_800};
`;
//1 terço da tela posicionamento
export const Title = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GREEN_LIGHT};
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.FONT_SIZE.XXXL}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONT_FAMILY.BOLD};
  text-align: center;
`;

export const Slogan = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY_100};
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONT_FAMILY.REGULAR};
  text-align: center;
  margin-bottom: 32px;
`;

export const FillUp = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`;
