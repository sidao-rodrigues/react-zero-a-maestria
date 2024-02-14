import { useDispatch } from 'react-redux';

import { IProductType } from '../../../shared/types/ProductType';
import { useAppSelector } from '../../hooks';
import { setProductsAction } from '.';

export const useProductReducer = () => {
  const dispatch = useDispatch();
  const { products } = useAppSelector((state) => state.productReducer);

  const setProducts = (products: IProductType[]) => {
    dispatch(setProductsAction(products));
  };

  return {
    products,
    setProducts,
  };
};
