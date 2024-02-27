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
import { ICategoryType } from '../../../shared/types/CategoryType';
import { useCategory } from '../hooks/useCategory';

const { Search } = Input;

const Category: React.FC = () => {
  const {
    categories,
    openModalDelete,
    handleOnChangeSearch,
    handleOnClickCategory,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleConfirmDeleteCategory,
    handleGoToEditCategory,
  } = useCategory();

  const columns: ColumnsType<ICategoryType> = useMemo(
    () => [
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
        sorter: (a: ICategoryType, b: ICategoryType) =>
          a.name > b.name ? -1 : a.name < b.name ? 1 : 0, //a.name.localeCompare(b.name),
        sortDirections: ['descend'],
        render: (text: string) => <a>{text}</a>,
      },
      {
        title: 'Qtd. Produtos',
        dataIndex: 'amountProducts',
        key: 'amountProducts',
        render: (text: number) => <a>{text}</a>,
      },
      {
        title: 'Ações',
        width: 240,
        key: 'x',
        render: (_, category) => (
          <LimitedContainer width={180}>
            <DisplayFlex>
              <LimitedContainer width={90} margin="0px 16px 0px 0px">
                <Button onClick={() => handleGoToEditCategory(category.id)} icon={<EditOutlined />}>
                  Editar
                </Button>
              </LimitedContainer>
              {category.amountProducts <= 0 && (
                <Button
                  onClick={() => handleOpenModalDelete(category.id)}
                  icon={<DeleteOutlined />}
                  danger
                >
                  Deletar
                </Button>
              )}
            </DisplayFlex>
          </LimitedContainer>
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
      name: 'CATEGORIAS',
    },
  ];

  return (
    <Screen listBrandcrumb={listBreadcrumb}>
      <Modal
        closeIcon={<CloseOutlined />}
        title="Atenção"
        open={openModalDelete}
        onOk={handleConfirmDeleteCategory}
        onCancel={handleCloseModalDelete}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir essa categoria?</p>
      </Modal>
      <DisplayFlexJustifyBetween margin="0px 0px 16px 0px">
        <LimitedContainer width={240}>
          <Search placeholder="Buscar Categoria" onSearch={handleOnChangeSearch} enterButton />
        </LimitedContainer>
        <LimitedContainer width={120}>
          <Button type="primary" onClick={handleOnClickCategory}>
            Inserir
          </Button>
        </LimitedContainer>
      </DisplayFlexJustifyBetween>
      <Table columns={columns} dataSource={categories} rowKey="id" />
    </Screen>
  );
};

export default Category;
