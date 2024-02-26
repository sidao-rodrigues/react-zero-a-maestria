import { IUserType } from '../../modules/login/types/UserType';
import { IAddressType } from './AddressType';
import { IPaymentType } from './PaymentType';
import { IProductType } from './ProductType';

export interface IOrderType {
  id: number;
  date: string;
  userId: number;
  user: IUserType;
  amountProducts?: number;
  payment?: IPaymentType;
  address?: IAddressType;
  orderProduct?: IProductType[];
}
