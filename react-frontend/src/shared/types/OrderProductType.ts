import { IOrderType } from './OrderType';
import { IProductType } from './ProductType';

export interface IOrderProductType {
  id: number;
  orderId: number;
  productId: number;
  amount: number;
  price: number;
  order?: IOrderType;
  product?: IProductType;
}
