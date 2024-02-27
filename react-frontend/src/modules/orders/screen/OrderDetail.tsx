import { Descriptions, DescriptionsProps, Divider } from 'antd';
import { useParams } from 'react-router-dom';

import { IListBreadcrumb } from '../../../shared/components/breadcrumb/Breadcrumb';
import Loading from '../../../shared/components/loading/Loading';
import Screen from '../../../shared/components/screen/Screen';
import { DisplayFlexJustifyCenter } from '../../../shared/components/styles/display.styles';
import { insertMaskInCEP } from '../../../shared/functions/address';
import { insertMaskInCpf } from '../../../shared/functions/cpf';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { insertMaskInPhone } from '../../../shared/functions/phone';
import ListOrderProduct from '../components/ListOrderProduct';
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
      children: insertMaskInPhone(order?.user?.phone || ''),
    },
    {
      key: '4',
      label: 'CPF',
      children: insertMaskInCpf(order?.user.cpf || ''),
      span: { xs: 2 },
    },
  ];

  const paymentItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Preço',
      children: convertNumberToMoney(order?.payment?.price || 0),
      span: { xs: 2 },
    },
    {
      key: '2',
      label: 'Desconto',
      children: convertNumberToMoney(order?.payment?.discount || 0),
      span: { xs: 3 },
    },
    {
      key: '3',
      label: 'Preço Final',
      children: convertNumberToMoney(order?.payment?.finalPrice || 0),
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

  const addressItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Cidade',
      children: order?.address?.city?.name,
    },
    {
      key: '2',
      label: 'Estado',
      children: order?.address?.city?.state?.name,
    },
    {
      key: '3',
      label: 'Complemento',
      children: order?.address?.complement,
    },
    {
      key: '4',
      label: 'Número',
      children: order?.address?.numberAddress,
    },
    {
      key: '5',
      label: 'CEP',
      children: insertMaskInCEP(order?.address?.cep || ''),
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
          <Loading size="large" />
        </DisplayFlexJustifyCenter>
      ) : (
        <>
          <Descriptions title="Dados do Usuário" bordered items={userItems} />
          <Divider />
          <Descriptions title="Dados do Pagamento" bordered items={paymentItems} />
          <Divider />
          <Descriptions title="Dados do Endereço" bordered items={addressItems} />
          {order.ordersProduct && order.ordersProduct?.length > 0 && <Divider />}
          <ListOrderProduct ordersProduct={order.ordersProduct} />
        </>
      )}
    </Screen>
  );
};

export default OrderDetail;
