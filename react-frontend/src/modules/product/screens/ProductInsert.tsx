import { useNavigate } from 'react-router-dom';

import { IListBreadcrumb } from '../../../shared/components/breadcrumb/Breadcrumb';
import Button from '../../../shared/components/buttons/button/button';
import Input from '../../../shared/components/inputs/input/input';
import InputMoney from '../../../shared/components/inputs/inputMoney/InputMoney';
import Select from '../../../shared/components/inputs/select/Select';
import Screen from '../../../shared/components/screen/Screen';
import {
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/components/styles/display.styles';
import { LimitedContainer } from '../../../shared/components/styles/limited.styles';
import { useCategory } from '../../category/hooks/useCategory';
import { ProductInsertTestIdEnum } from '../enum/ProductInsertTestIdEnum';
import { useInsertProduct } from '../hooks/useInsertProduct';
import { EProductRoutesEnum } from '../routes';

const ProductInsert: React.FC = () => {
  const { categories } = useCategory();
  const {
    loading,
    disabledButton,
    product,
    handleOnChangeInput,
    handleOnChangeSelect,
    handleInsertProduct,
  } = useInsertProduct();

  const navigate = useNavigate();

  const handleOnClickCancel = (): void => {
    navigate(EProductRoutesEnum.PRODUCT);
  };

  const listBreadcrumb: IListBreadcrumb[] = [
    {
      name: 'HOME',
    },
    {
      name: 'PRODUTOS',
      navigateTo: EProductRoutesEnum.PRODUCT,
    },
    {
      name: 'INSERIR PRODUTO',
    },
  ];

  return (
    <Screen listBrandcrumb={listBreadcrumb}>
      <DisplayFlexJustifyCenter data-testid={ProductInsertTestIdEnum.PRODUCT_INSERT_CONTAINER}>
        <LimitedContainer width={400}>
          <Input
            data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_NAME}
            onChange={(event) => handleOnChangeInput(event, 'name')}
            value={product.name}
            title="Nome"
            placeholder="Nome"
            margin="0px 0px 16px 0px"
          />
          <Input
            data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_IMAGE}
            onChange={(event) => handleOnChangeInput(event, 'image')}
            value={product.image}
            title="Url Imagem"
            placeholder="Url Imagem"
            margin="0px 0px 16px 0px"
          />
          <InputMoney
            data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_PRICE}
            onChange={(event) => handleOnChangeInput(event, 'price', true)}
            value={product.price}
            title="Preço"
            placeholder="Preço"
            margin="0px 0px 16px 0px"
          />
          <Select
            data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_SELECT}
            title="Categoria"
            margin="0px 0px 32px 0px"
            onChange={handleOnChangeSelect}
            placeholder="Selectione uma categoria"
            options={categories.map((category) => ({
              value: `${category.id}`,
              label: category.name,
            }))}
          ></Select>
          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 8px" width={120}>
              <Button
                data-testid={ProductInsertTestIdEnum.PRODUCT_BUTTON_CANCEL}
                danger
                onClick={handleOnClickCancel}
              >
                Cancelar
              </Button>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button
                data-testid={ProductInsertTestIdEnum.PRODUCT_BUTTON_INSERT}
                loading={loading}
                disabled={disabledButton}
                onClick={handleInsertProduct}
                type="primary"
              >
                Inserir Produto
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </DisplayFlexJustifyCenter>
    </Screen>
  );
};

export default ProductInsert;
