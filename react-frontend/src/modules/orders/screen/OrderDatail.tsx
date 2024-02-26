import { Descriptions, DescriptionsProps, Divider, Spin } from 'antd';
import { useParams } from 'react-router-dom';

import { IListBreadcrumb } from '../../../shared/components/breadcrumb/Breadcrumb';
import Screen from '../../../shared/components/screen/Screen';
import { DisplayFlexJustifyCenter } from '../../../shared/components/styles/display.styles';
import { useOrderDetail } from '../hooks/useOrderDetail';
import { EOrderRoutesEnum } from '../routes';

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { order, loading } = useOrderDetail(orderId);

  const userItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Nome',
      children: order?.user?.name,
    },
    {
      key: '2',
      label: 'Email',
      children: order?.user?.email,
      span: { xs: 2 },
    },
    {
      key: '3',
      label: 'Telefone',
      children: order?.user?.phone,
    },
    {
      key: '4',
      label: 'CPF',
      children: order?.user.cpf,
      span: { xs: 2 },
    },
  ];

  const paymentItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Preço',
      children: order?.payment?.price,
      span: { xs: 2 },
    },
    {
      key: '2',
      label: 'Desconto',
      children: order?.payment?.discount,
      span: { xs: 3 },
    },
    {
      key: '3',
      label: 'Preço Final',
      children: order?.payment?.finalPrice,
    },
    {
      key: '4',
      label: 'Tipo de Pagamento',
      children: order?.payment?.type,
    },
    {
      key: '5',
      label: 'Status',
      children: order?.payment?.paymentStatus?.name,
    },
  ];

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
      {!order || loading ? (
        <DisplayFlexJustifyCenter>
          <Spin size="large" />
        </DisplayFlexJustifyCenter>
      ) : (
        <>
          <Descriptions title="Dados do Usuário" bordered items={userItems} />
          <Divider />
          <Descriptions title="Dados do Pagamento" bordered items={paymentItems} />
          <Divider />
          <Descriptions title="Dados do Endereço" bordered items={paymentItems} />
          <Divider />
          <Descriptions title="Produtos" bordered items={paymentItems} />
        </>
      )}
    </Screen>
  );
};

export default OrderDetail;
