import { useDispatch } from 'react-redux';

import { IProductType } from '../../../shared/types/ProductType';
import { useAppSelector } from '../../hooks';
import { setProductAction, setProductsAction } from '.';

export const useProductReducer = () => {
  const dispatch = useDispatch();
  const { products, product } = useAppSelector((state) => state.productReducer);

  const setProducts = (products: IProductType[]) => {
    dispatch(setProductsAction(products));
  };

  const setProduct = (product?: IProductType) => {
    dispatch(setProductAction(product));
  };

  return {
    product,
    products,
    setProduct,
    setProducts,
  };
};
