import { IUserType } from '../../modules/login/types/UserType';
import { IAddressType } from './AddressType';
import { IOrderProductType } from './OrderProductType';
import { IPaymentType } from './PaymentType';

export interface IOrderType {
  id: number;
  date: string;
  userId: number;
  user: IUserType;
  amountProducts?: number;
  payment?: IPaymentType;
  address?: IAddressType;
  ordersProduct?: IOrderProductType[];
}
