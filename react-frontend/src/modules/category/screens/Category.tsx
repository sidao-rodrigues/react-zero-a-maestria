import Search from 'antd/es/input/Search';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

import { IListBreadcrumb } from '../../../shared/components/breadcrumb/Breadcrumb';
import Button from '../../../shared/components/buttons/button/button';
import Screen from '../../../shared/components/screen/Screen';
import { DisplayFlexJustifyBetween } from '../../../shared/components/styles/display.styles';
import { LimitedContainer } from '../../../shared/components/styles/limited.styles';
import Table from '../../../shared/components/table/Table';
import { ICategoryType } from '../../../shared/types/CategoryType';
import { useCategory } from '../hooks/useCategory';
import { ECategoryRoutesEnum } from '../routes';

const columns: ColumnsType<ICategoryType> = [
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
];

const Category: React.FC = () => {
  const { categories, handleOnChangeSearch } = useCategory();
  const navigate = useNavigate();

  const handleOnClickCategory: React.MouseEventHandler<HTMLElement> = (): void => {
    navigate(ECategoryRoutesEnum.CATEGORY_INSERT);
  };

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
