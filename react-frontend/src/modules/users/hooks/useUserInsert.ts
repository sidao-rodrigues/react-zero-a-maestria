import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_USER } from '../../../shared/constants/urls';
import { IInsertUser } from '../../../shared/dtos/insertUser.dto';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequest';
import { IUserType } from '../../login/types/UserType';
import { EUserRoutesEnum } from '../routes';

export const userUserInsert = () => {
  const navigate = useNavigate();
  const { request } = useRequests();
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [user, setUser] = useState<IInsertUser>({
    name: '',
    phone: '',
    email: '',
    cpf: '',
    password: '',
  });

  useEffect(() => {
    if (user.cpf && user.email && user.name && user.password && user.phone) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  });

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setUser((currentUser) => ({
      ...currentUser,
      [name]: event.target.value,
    }));
  };

  const handleCancelInsert = async () => {
    navigate(EUserRoutesEnum.USER);
  };

  const handleInsertAdmin = async () => {
    const result = await request<IUserType, IInsertUser>(
      URL_USER,
      EMethodsEnum.POST,
      undefined,
      user,
    );
    if (result) {
      navigate(EUserRoutesEnum.USER);
    }
  };

  return {
    user,
    disabledButton,
    setDisabledButton,
    handleCancelInsert,
    handleInsertAdmin,
    handleOnChangeInput,
  };
};
