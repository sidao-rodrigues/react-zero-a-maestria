import axios from 'axios';
import { useState } from 'react';

import Button from '../../../shared/buttons/button/button';
import Input from '../../../shared/inputs/input/input';
import {
  BackgroundImage,
  ContainerLogin,
  ContainerLoginScreen,
  LimitedContainer,
  LogoImage,
  TitleLogin,
} from '../styles/loginScreen.styles';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    await axios({
      method: 'post',
      url: 'http://localhost:3330/auth',
      data: { email, password },
    })
      .then((result) => {
        console.log('fez login:', result.data.accessToken);
        return result.data;
      })
      .catch(() => {
        alert('Usuário ou senha inválida');
      });
  };

  return (
    <div>
      <ContainerLoginScreen>
        <ContainerLogin>
          <LimitedContainer>
            <LogoImage src="./logo.png" />
            <TitleLogin level={2} type="secondary">
              LOGIN
            </TitleLogin>
            <Input
              title="USUÁRIO"
              placeholder="example@mail.com"
              margin="32px 0px 0px"
              onChange={handleEmail}
              value={email}
            />
            <Input
              type="password"
              placeholder="input password"
              title="SENHA"
              margin="32px 0px 0px"
              onChange={handlePassword}
              value={password}
            />
            <Button type="primary" margin="64px 0px 16px 0px" onClick={handleLogin}>
              ENTRAR
            </Button>
          </LimitedContainer>
        </ContainerLogin>
        <BackgroundImage src="./background.png" />
      </ContainerLoginScreen>
    </div>
  );
};

export default LoginScreen;
