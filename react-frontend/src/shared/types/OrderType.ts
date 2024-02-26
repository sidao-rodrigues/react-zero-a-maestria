import { IUserType } from '../../modules/login/types/UserType';

export interface IOrderType {
  id: number;
  date: string;
  userId: number;
  user: IUserType;
  amountProducts: number;
}
