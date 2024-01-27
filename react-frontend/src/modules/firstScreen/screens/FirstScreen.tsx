import { Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_USER } from '../../../shared/constants/urls';
import {
  getAuthorizationToken,
  unsetAuthorizationToken,
} from '../../../shared/functions/connection/auth';
import { connectionAPIGet } from '../../../shared/functions/connection/connectionAPI';
import { ELoginRoutesEnum } from '../../login/routes';
import { EProductRoutesEnum } from '../../product/routes';

const FirstScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = getAuthorizationToken();

      if (token) {
        await connectionAPIGet(URL_USER)
          .then(() => {
            navigate(EProductRoutesEnum.PRODUCT);
          })
          .catch(() => {
            unsetAuthorizationToken();
            navigate(ELoginRoutesEnum.LOGIN);
          });
      } else {
        navigate(ELoginRoutesEnum.LOGIN);
      }
    };
    verifyToken();
  }, []);

  return <Spin />;
};

export default FirstScreen;
