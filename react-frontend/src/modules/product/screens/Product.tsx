import { Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';

import { IListBreadcrumb } from '../../../shared/components/breadcrumb/Breadcrumb';
import Button from '../../../shared/components/buttons/button/button';
import Screen from '../../../shared/components/screen/Screen';
import { DisplayFlexJustifyBetween } from '../../../shared/components/styles/display.styles';
import { LimitedContainer } from '../../../shared/components/styles/limited.styles';
import Table from '../../../shared/components/table/Table';
import { convertNumberToMoney } from '../../../shared/functions/money';
// import { useDataContext } from '../../../shared/hooks/useDataContext';
import { IProductType } from '../../../shared/types/ProductType';
import CategoryColumn from '../components/CategoryColumn';
import TooltipImage from '../components/TooltipImage';
import { useProduct } from '../hooks/useProduct';

const { Search } = Input;

const Product = () => {
  // const { products, setProducts } = useDataContext();
  const { products, handleOnClickInsert, handleOnSearch, handleDeleteProduct, handleEditProduct } =
    useProduct();

  const columns: ColumnsType<IProductType> = useMemo(
    () => [
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
        sorter: (a: IProductType, b: IProductType) =>
          a.name > b.name ? -1 : a.name < b.name ? 1 : 0, //a.name.localeCompare(b.name),
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
      {
        title: 'Action',
        key: '',
        render: (_, product) => (
          <>
            <a onClick={() => handleEditProduct(product.id)}>Editar</a>
            <a onClick={() => handleDeleteProduct(product.id)}>Deletar</a>
          </>
        ),
      },
    ],
    [],
  );

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
          <Search placeholder="Buscar Produto" onSearch={handleOnSearch} enterButton />
        </LimitedContainer>

        <LimitedContainer width={120}>
          <Button type="primary" onClick={handleOnClickInsert}>
            Inserir
          </Button>
        </LimitedContainer>
      </DisplayFlexJustifyBetween>
      <Table columns={columns} dataSource={products} rowKey="id" />
    </Screen>
  );
};

export default Product;
