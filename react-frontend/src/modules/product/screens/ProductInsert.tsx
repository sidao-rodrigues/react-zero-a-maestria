import { Select } from 'antd';
import { useEffect } from 'react';

import { IListBreadcrumb } from '../../../shared/components/breadcrumb/Breadcrumb';
import Button from '../../../shared/components/buttons/button/button';
import Input from '../../../shared/components/inputs/input/input';
import Screen from '../../../shared/components/screen/Screen';
import { URL_CATEGORY } from '../../../shared/constants/urls';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequest';
import { EProductRoutesEnum } from '../routes';
import { LimitedContainer } from '../styles/productInsert.styles';

const ProductInsert: React.FC = () => {
  const { categories, setCategories } = useDataContext();
  const { request } = useRequests();

  useEffect(() => {
    if (categories.length === 0) {
      request(URL_CATEGORY, EMethodsEnum.GET, setCategories);
    }
  }, []);

  const handleOnChange = (value: string): void => {
    console.log(value);
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
        <Input title="Nome" placeholder="Nome" margin="0px 0px 16px 0px" />
        <Input title="Url Imagem" placeholder="Url Imagem" margin="0px 0px 16px 0px" />
        <Input title="Preço" placeholder="Preço" margin="0px 0px 16px 0px" />
        <Select
          defaultValue="lucy"
          onChange={handleOnChange}
          style={{ width: '100%' }}
          options={categories.map((category) => ({
            value: `${category.id}`,
            label: category.name,
          }))}
        ></Select>
        <Button type="primary">Inserir Produto</Button>
      </LimitedContainer>
    </Screen>
  );
};

export default ProductInsert;
