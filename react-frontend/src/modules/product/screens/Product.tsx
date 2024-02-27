import { CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';

import { IListBreadcrumb } from '../../../shared/components/breadcrumb/Breadcrumb';
import Button from '../../../shared/components/buttons/button/button';
import Screen from '../../../shared/components/screen/Screen';
import {
  DisplayFlex,
  DisplayFlexJustifyBetween,
} from '../../../shared/components/styles/display.styles';
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
  const {
    products,
    openModalDelete,
    handleOnClickInsert,
    handleOnSearch,
    handleDeleteProduct,
    handleEditProduct,
    handleCloseModalDelete,
    handleOpenModalDelete,
  } = useProduct();

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
        width: 240,
        key: 'x',
        render: (_, product) => (
          <>
            <LimitedContainer width={180}>
              <DisplayFlex>
                <Button
                  margin="0px 16px 0px 0px"
                  onClick={() => handleEditProduct(product.id)}
                  icon={<EditOutlined />}
                >
                  Editar
                </Button>
                <Button
                  onClick={() => handleOpenModalDelete(product.id)}
                  icon={<DeleteOutlined />}
                  danger
                >
                  Deletar
                </Button>
              </DisplayFlex>
            </LimitedContainer>
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
      <Modal
        closeIcon={<CloseOutlined />}
        title="Atenção"
        open={openModalDelete}
        onOk={handleDeleteProduct}
        onCancel={handleCloseModalDelete}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir esse produto?</p>
      </Modal>
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
