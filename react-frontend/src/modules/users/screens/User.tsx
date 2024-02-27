import { Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';

import { IListBreadcrumb } from '../../../shared/components/breadcrumb/Breadcrumb';
import Button from '../../../shared/components/buttons/button/button';
import Loading from '../../../shared/components/loading/Loading';
import Screen from '../../../shared/components/screen/Screen';
import {
  DisplayFlexJustifyBetween,
  DisplayFlexJustifyCenter,
} from '../../../shared/components/styles/display.styles';
import { LimitedContainer } from '../../../shared/components/styles/limited.styles';
import Table from '../../../shared/components/table/Table';
import { EUserTypeEnum } from '../../../shared/enums/userType.enum';
import { getUserInfoByToken } from '../../../shared/functions/connection/auth';
import { insertMaskInCpf } from '../../../shared/functions/cpf';
import { insertMaskInPhone } from '../../../shared/functions/phone';
import { IUserType } from '../../login/types/UserType';
import { useUser } from '../hooks/useUser';

const { Search } = Input;

const columns: ColumnsType<IUserType> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Telefone',
    dataIndex: 'phone',
    key: 'phone',
    render: (text: string) => <a>{insertMaskInPhone(text)}</a>,
  },
  {
    title: 'CPF',
    dataIndex: 'cpf',
    key: 'cpf',
    render: (text: string) => <a>{insertMaskInCpf(text)}</a>,
  },
];

const User: React.FC = () => {
  const { users, loading, handleOnChangeSearch, handleGoToInsertAdmin } = useUser();

  const userToken = useMemo(() => getUserInfoByToken(), []);

  const listBreadcrumb: IListBreadcrumb[] = [
    {
      name: 'HOME',
    },
    {
      name: 'USUÁRIOS',
    },
  ];

  return (
    <Screen listBrandcrumb={listBreadcrumb}>
      {loading ? (
        <DisplayFlexJustifyCenter>
          <Loading size="large" />
        </DisplayFlexJustifyCenter>
      ) : (
        <>
          <DisplayFlexJustifyBetween margin="0px 0px 16px 0px">
            <LimitedContainer width={240}>
              <Search placeholder="Buscar Usuário" onSearch={handleOnChangeSearch} enterButton />
            </LimitedContainer>

            <LimitedContainer width={180}>
              {userToken?.typeUser === EUserTypeEnum.ROOT && (
                <Button type="primary" onClick={handleGoToInsertAdmin}>
                  Inserir Admin
                </Button>
              )}
            </LimitedContainer>
          </DisplayFlexJustifyBetween>
          <Table columns={columns} dataSource={users} rowKey="id" />
        </>
      )}
    </Screen>
  );
};

export default User;
