import { IListBreadcrumb } from '../../../shared/components/breadcrumb/Breadcrumb';
import Button from '../../../shared/components/buttons/button/button';
import Input from '../../../shared/components/inputs/input/input';
import Screen from '../../../shared/components/screen/Screen';
import {
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/components/styles/display.styles';
import { LimitedContainer } from '../../../shared/components/styles/limited.styles';
import { userUserInsert } from '../hooks/useUserInsert';
import { EUserRoutesEnum } from '../routes';

const UserInsert: React.FC = () => {
  const { user, disabledButton, handleCancelInsert, handleInsertAdmin, handleOnChangeInput } =
    userUserInsert();

  const listBreadcrumb: IListBreadcrumb[] = [
    {
      name: 'HOME',
    },
    {
      name: 'USUÁRIOS',
      navigateTo: EUserRoutesEnum.USER,
    },
    {
      name: 'INSERIR',
    },
  ];

  return (
    <Screen listBrandcrumb={listBreadcrumb}>
      <DisplayFlexJustifyCenter>
        <LimitedContainer width={400}>
          <Input
            onChange={(event) => handleOnChangeInput(event, 'name')}
            value={user.name}
            title="Nome"
            placeholder="Nome"
            margin="0px 0px 16px 0px"
          />
          <Input
            onChange={(event) => handleOnChangeInput(event, 'phone')}
            value={user.phone}
            title="Telefone"
            placeholder="Telefone"
            margin="0px 0px 16px 0px"
          />
          <Input
            onChange={(event) => handleOnChangeInput(event, 'email')}
            value={user.email}
            title="Email"
            placeholder="Email"
            margin="0px 0px 16px 0px"
          />
          <Input
            onChange={(event) => handleOnChangeInput(event, 'cpf')}
            value={user.cpf}
            title="CPF"
            placeholder="CPF"
            margin="0px 0px 16px 0px"
          />
          <Input
            onChange={(event) => handleOnChangeInput(event, 'password')}
            value={user.password}
            title="Senha"
            placeholder="Senha"
            margin="0px 0px 16px 0px"
          />

          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 8px" width={120}>
              <Button onClick={handleCancelInsert} danger>
                Cancelar
              </Button>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button disabled={disabledButton} onClick={handleInsertAdmin} type="primary">
                Inserir Admin
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </DisplayFlexJustifyCenter>
    </Screen>
  );
};

export default UserInsert;
