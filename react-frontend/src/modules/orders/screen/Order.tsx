import Screen from '../../../shared/components/screen/Screen';
import { useOrder } from '../hooks/useOrder';

const Order: React.FC = () => {
  const { orders } = useOrder();
  return (
    <Screen>
      {/* {orders.map((order) => (
        <div key={order.id}>{order.userId}</div>
      ))} */}
      <div>Order</div>
    </Screen>
  );
};

export default Order;
