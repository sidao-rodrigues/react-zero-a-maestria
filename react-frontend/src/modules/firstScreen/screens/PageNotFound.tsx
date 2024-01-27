import { Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/button';
import { ELoginRoutesEnum } from '../../login/routes';
import { ContainerPageNotFound } from '../styles/pageNotFound.styles';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleOnClickButton = () => {
    navigate(ELoginRoutesEnum.LOGIN);
  };

  return (
    <ContainerPageNotFound>
      <Result
        status="404"
        title="404"
        subTitle="Desculpe, a página que você está visitando não existe."
        extra={
          <Button type="primary" onClick={handleOnClickButton}>
            Página de Login
          </Button>
        }
      ></Result>
    </ContainerPageNotFound>
  );
};

export default PageNotFound;
