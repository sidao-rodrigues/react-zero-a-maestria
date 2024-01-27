import { Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';
import { EProductRoutesEnum } from '../../product/routes';

const FirstScreen = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(EProductRoutesEnum.PRODUCT);
    }
  }, []);

  return <Spin />;
};

export default FirstScreen;
