import { IPaymentStatusType } from './PaymentStatusType';

export interface IPaymentType {
  id: number;
  statusId: number;
  price: number;
  discount: number;
  finalPrice: number;
  type: string;
  paymentStatus?: IPaymentStatusType;
}
