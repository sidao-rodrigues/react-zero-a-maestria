import { IUserType } from './UserType';

export interface IAuthType {
  accessToken: string;
  user: IUserType;
}
