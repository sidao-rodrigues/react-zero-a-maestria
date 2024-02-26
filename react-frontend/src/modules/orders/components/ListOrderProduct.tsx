import { ColumnsType } from 'antd/es/table';

import Table from '../../../shared/components/table/Table';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { IOrderProductType } from '../../../shared/types/OrderProductType';

interface IListOrderProductProps {
  ordersProduct?: IOrderProductType[];
}

const columns: ColumnsType<IOrderProductType> = [
  {
    title: 'Nome Produto',
    dataIndex: 'name',
    key: 'name',
    render: (_, target) => <a>{target.product?.name}</a>,
  },
  {
    title: 'Quantidade',
    dataIndex: 'amount',
    key: 'amount',
    render: (text: number) => <a>{text}</a>,
  },
  {
    title: 'Preço',
    dataIndex: 'price',
    key: 'price',
    render: (price: number) => <a>{convertNumberToMoney(price)}</a>,
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    render: (_, target) => <a>{convertNumberToMoney(target.price * target.amount)}</a>,
  },
];

const ListOrderProduct: React.FC<IListOrderProductProps> = ({
  ordersProduct,
}: IListOrderProductProps) => {
  if (!ordersProduct || ordersProduct.length <= 0) {
    return null;
  }
  return <Table columns={columns} dataSource={ordersProduct} rowKey="id" />;
};

export default ListOrderProduct;
