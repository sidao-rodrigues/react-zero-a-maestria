import { IListBreadcrumb } from '../../../shared/components/breadcrumb/Breadcrumb';
import Button from '../../../shared/components/buttons/button/button';
import Input from '../../../shared/components/inputs/input/input';
import Screen from '../../../shared/components/screen/Screen';
import {
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/components/styles/display.styles';
import { LimitedContainer } from '../../../shared/components/styles/limited.styles';
import { useInsertCategory } from '../hooks/useInsertCategory';
import { ECategoryRoutesEnum } from '../routes';

const CategoryInsert: React.FC = () => {
  const { name, loading, disabledButton, handleOnChangeName, insertCategory, handleOnClickCancel } =
    useInsertCategory();

  const listBreadcrumb: IListBreadcrumb[] = [
    {
      name: 'HOME',
    },
    {
      name: 'CATEGORIAS',
      navigateTo: ECategoryRoutesEnum.CATEGORY,
    },
    {
      name: 'INSERIR CATEGORIA',
    },
  ];

  return (
    <Screen listBrandcrumb={listBreadcrumb}>
      <DisplayFlexJustifyCenter>
        <LimitedContainer width={400}>
          <Input
            onChange={handleOnChangeName}
            value={name}
            title="Nome"
            placeholder="Nome"
            margin="0px 0px 16px 0px"
          />
          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 8px" width={120}>
              <Button onClick={handleOnClickCancel} danger>
                Cancelar
              </Button>
            </LimitedContainer>
            <LimitedContainer width={160}>
              <Button
                disabled={disabledButton}
                loading={loading}
                onClick={insertCategory}
                type="primary"
              >
                Inserir Categoria
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </DisplayFlexJustifyCenter>
    </Screen>
  );
};

export default CategoryInsert;
