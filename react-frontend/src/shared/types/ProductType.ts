import { ICategoryType } from './CategoryType';

export interface IProductType {
  id: number;
  name: string;
  image: string;
  price: number;
  category?: ICategoryType;
}
