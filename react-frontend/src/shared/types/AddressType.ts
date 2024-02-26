import { ICityType } from './CityType';

export interface IAddressType {
  id: number;
  complement: string;
  numberAddress: number;
  cep: string;
  city?: ICityType;
}
