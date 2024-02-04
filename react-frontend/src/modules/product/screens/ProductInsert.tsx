import { useEffect, useState } from 'react';

import { IListBreadcrumb } from '../../../shared/components/breadcrumb/Breadcrumb';
import Button from '../../../shared/components/buttons/button/button';
import Input from '../../../shared/components/inputs/input/input';
import Select from '../../../shared/components/inputs/select/Select';
import Screen from '../../../shared/components/screen/Screen';
import { URL_CATEGORY, URL_PRODUCT } from '../../../shared/constants/urls';
import { IInsertProduct } from '../../../shared/dtos/InsertProduct.dto';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequest';
import { EProductRoutesEnum } from '../routes';
import { LimitedContainer } from '../styles/productInsert.styles';

const ProductInsert: React.FC = () => {
  const [product, setProduct] = useState<IInsertProduct>({
    name: '',
    price: 0,
    image: '',
  });
  const { categories, setCategories } = useDataContext();
  const { request } = useRequests();

  useEffect(() => {
    if (categories.length === 0) {
      request(URL_CATEGORY, EMethodsEnum.GET, setCategories);
    }
  }, []);

  const handleInsertProduct = () => {
    connectionAPIPost<IInsertProduct>(URL_PRODUCT, product);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    console.log(nameObject);
    setProduct({
      ...product,
      [nameObject]: nameObject === 'price' ? Number(event.target.value) : event.target.value,
    });
  };

  const handleOnChange = (value: string): void => {
    setProduct({
      ...product,
      categoryId: Number(value),
    });
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
      <LimitedContainer>
        <Input
          onChange={(event) => onChange(event, 'name')}
          value={product.name}
          title="Nome"
          placeholder="Nome"
          margin="0px 0px 16px 0px"
        />
        <Input
          onChange={(event) => onChange(event, 'image')}
          value={product.image}
          title="Url Imagem"
          placeholder="Url Imagem"
          margin="0px 0px 16px 0px"
        />
        <Input
          onChange={(event) => onChange(event, 'price')}
          value={product.price}
          title="Preço"
          placeholder="Preço"
          margin="0px 0px 16px 0px"
        />
        <Select
          title="Categoria"
          margin="0px 0px 32px 0px"
          onChange={handleOnChange}
          placeholder="Selectione uma categoria"
          options={categories.map((category) => ({
            value: `${category.id}`,
            label: category.name,
          }))}
        ></Select>
        <Button onClick={handleInsertProduct} type="primary">
          Inserir Produto
        </Button>
      </LimitedContainer>
    </Screen>
  );
};

export default ProductInsert;
