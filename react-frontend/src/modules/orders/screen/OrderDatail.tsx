import { Badge, Descriptions, DescriptionsProps, Divider } from 'antd';

import { IListBreadcrumb } from '../../../shared/components/breadcrumb/Breadcrumb';
import Screen from '../../../shared/components/screen/Screen';
import { EOrderRoutesEnum } from '../routes';

const userItems: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Nome',
    children: 'Sidão',
  },
  {
    key: '2',
    label: 'Email',
    children: 'Email',
    span: 2,
  },
  {
    key: '3',
    label: 'Telefone',
    children: '88 9.9988-9999',
  },
  {
    key: '4',
    label: 'CPF',
    children: '123.123.123-00',
    span: 2,
  },
];
const paymentItems: DescriptionsProps['items'] = [
  {
    key: '5',
    label: 'Usage Time',
    children: '2019-04-24 18:00:00',
    span: 2,
  },
  {
    key: '6',
    label: 'Status',
    children: <Badge status="processing" text="Running" />,
    span: 3,
  },
  {
    key: '7',
    label: 'Negotiated Amount',
    children: '$80.00',
  },
  {
    key: '8',
    label: 'Discount',
    children: '$20.00',
  },
  {
    key: '9',
    label: 'Official Receipts',
    children: '$60.00',
  },
  {
    key: '10',
    label: 'Config Info',
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </>
    ),
  },
];

const OrderDetail: React.FC = () => {
  const listBreadcrumb: IListBreadcrumb[] = [
    {
      name: 'HOME',
    },
    {
      name: 'PEDIDOS',
      navigateTo: EOrderRoutesEnum.ORDER,
    },
    {
      name: 'DETALHES',
    },
  ];

  return (
    <Screen listBrandcrumb={listBreadcrumb}>
      <Descriptions title="Dados do Usuário" bordered items={userItems} />
      <Divider />
      <Descriptions title="Dados do Pagamento" bordered items={paymentItems} />
      <Divider />
      <Descriptions title="Dados do Endereço" bordered items={paymentItems} />
      <Divider />
      <Descriptions title="Produtos" bordered items={paymentItems} />
    </Screen>
  );
};

export default OrderDetail;
