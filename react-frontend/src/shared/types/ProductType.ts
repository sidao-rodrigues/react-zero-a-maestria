import { ICategoryType } from './CategoryType';

export interface IProductType {
  id: number;
  name: string;
  image: string;
  price: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  diameter: number;
  category?: ICategoryType;
}
