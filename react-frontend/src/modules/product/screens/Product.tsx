import Search, { SearchProps } from 'antd/es/input/Search';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IListBreadcrumb } from '../../../shared/components/breadcrumb/Breadcrumb';
import Button from '../../../shared/components/buttons/button/button';
import Screen from '../../../shared/components/screen/Screen';
import { DisplayFlexJustifyBetween } from '../../../shared/components/styles/display.styles';
import { LimitedContainer } from '../../../shared/components/styles/limited.styles';
import Table from '../../../shared/components/table/Table';
import { URL_PRODUCT } from '../../../shared/constants/urls';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
import { convertNumberToMoney } from '../../../shared/functions/money';
// import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequest';
import { IProductType } from '../../../shared/types/ProductType';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';
import CategoryColumn from '../components/CategoryColumn';
import TooltipImage from '../components/TooltipImage';
import { EProductRoutesEnum } from '../routes';

const columns: ColumnsType<IProductType> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (_, product: IProductType) => <TooltipImage product={product} />,
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: IProductType, b: IProductType) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0), //a.name.localeCompare(b.name),
    sortDirections: ['descend'],
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Categoria',
    dataIndex: 'category',
    key: 'category',
    render: (_, product: IProductType) => <CategoryColumn category={product.category} />,
  },
  {
    title: 'Preço',
    dataIndex: 'price',
    key: 'price',
    render: (_, product: IProductType) => <a>{convertNumberToMoney(product.price)}</a>,
  },
];

const Product = () => {
  // const { products, setProducts } = useDataContext();
  const { products, setProducts } = useProductReducer();

  const [productsFiltered, setProductsFiltered] = useState<IProductType[]>([]);
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    setProductsFiltered([...products]);
  }, [products]);

  useEffect(() => {
    request<IProductType[]>(URL_PRODUCT, EMethodsEnum.GET, setProducts);
  }, []);

  const handleOnClickInsert: React.MouseEventHandler<HTMLElement> = (): void => {
    navigate(EProductRoutesEnum.PRODUCT_INSERT);
  };

  const onSearch: SearchProps['onSearch'] = (value: string) => {
    if (!value) {
      setProductsFiltered(products);
    } else {
      setProductsFiltered([
        ...products.filter((product) => new RegExp(value, 'i').test(product.name)),
      ]);
    }
  };

  const listBreadcrumb: IListBreadcrumb[] = [
    {
      name: 'HOME',
    },
    {
      name: 'PRODUTOS',
    },
  ];

  return (
    <Screen listBrandcrumb={listBreadcrumb}>
      <DisplayFlexJustifyBetween margin="0px 0px 16px 0px">
        <LimitedContainer width={240}>
          <Search placeholder="Buscar Produto" onSearch={onSearch} enterButton />
        </LimitedContainer>

        <LimitedContainer width={120}>
          <Button type="primary" onClick={handleOnClickInsert}>
            Inserir
          </Button>
        </LimitedContainer>
      </DisplayFlexJustifyBetween>
      <Table columns={columns} dataSource={productsFiltered} rowKey="id" />
    </Screen>
  );
};

export default Product;
