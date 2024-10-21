import { Button } from '@/app/components/Button';
import { Container, Content, FillUp, Slogan, Title } from './styles';

export function SignIn() {
  return (
    <Container>
      <FillUp />
      <Content>
        <Title>Caronas Fatec</Title>
        <Slogan>Dinamizando suas caronas</Slogan>
        <Button title="Entrar com o Email Institucional" />
      </Content>
    </Container>
  );
}
