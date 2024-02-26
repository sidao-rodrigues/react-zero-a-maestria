import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

import { IListBreadcrumb } from '../../../shared/components/breadcrumb/Breadcrumb';
import Screen from '../../../shared/components/screen/Screen';
import Table from '../../../shared/components/table/Table';
import { IOrderType } from '../../../shared/types/OrderType';
import { useOrder } from '../hooks/useOrder';
import { EOrderRoutesEnum } from '../routes';

const columns: ColumnsType<IOrderType> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Data',
    dataIndex: 'date',
    key: 'date',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Usuário',
    dataIndex: 'user',
    key: 'user',
    render: (_, target) => <a>{target.user?.name}</a>,
  },
  {
    title: 'Qtd. Produtos',
    dataIndex: 'amountProducts',
    key: 'amountProducts',
    render: (text: number) => <a>{text}</a>,
  },
];

const Order: React.FC = () => {
  const { orders } = useOrder();
  const navigate = useNavigate();

  const listBreadcrumb: IListBreadcrumb[] = [
    {
      name: 'HOME',
    },
    {
      name: 'PEDIDOS',
    },
  ];

  return (
    <Screen listBrandcrumb={listBreadcrumb}>
      <Table
        onRow={(record) => ({
          onClick: () => navigate(`${EOrderRoutesEnum.ORDER}/${record.id}`),
        })}
        columns={columns}
        dataSource={orders}
        rowKey="id"
      />
    </Screen>
  );
};

export default Order;
