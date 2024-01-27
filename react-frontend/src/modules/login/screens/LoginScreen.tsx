import { useState } from 'react';

import Button from '../../../shared/components/buttons/button/button';
import SVGLogo from '../../../shared/components/icons/SVGLogo';
import Input from '../../../shared/components/inputs/input/input';
import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';
import { useRequests } from '../../../shared/hooks/useRequest';
import {
  BackgroundImage,
  ContainerLogin,
  ContainerLoginScreen,
  LimitedContainer,
  TitleLogin,
} from '../styles/loginScreen.styles';
import { UserType } from '../types/UserType';

interface ILoginReq {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const { accessToken, setAccessToken } = useGlobalContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { postRequest, loading } = useRequests();

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    const user = await postRequest<UserType, ILoginReq>('http://localhost:3330/auth', {
      email,
      password,
    });

    setAccessToken(user?.accessToken || '');
  };

  return (
    <div>
      <ContainerLoginScreen>
        <ContainerLogin>
          <LimitedContainer>
            <SVGLogo />
            <TitleLogin level={2} type="secondary">
              LOGIN ({accessToken})
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
            <Button
              loading={loading}
              type="primary"
              margin="64px 0px 16px 0px"
              onClick={handleLogin}
            >
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
