import { CategoryType } from './CategoryType';

export interface IProductType {
  id: number;
  name: string;
  image: string;
  price: number;
  category?: CategoryType;
}
