import { SearchProps } from 'antd/es/input';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_PRODUCT, URL_PRODUCT_ID } from '../../../shared/constants/urls';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequest';
import { IProductType } from '../../../shared/types/ProductType';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';
import { EProductRoutesEnum } from '../routes';

export const useProduct = () => {
  const { products, setProducts } = useProductReducer();
  const [productsFiltered, setProductsFiltered] = useState<IProductType[]>([]);
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    setProductsFiltered([...products]);
  }, [products]);

  useEffect(() => {
    request<IProductType[]>(URL_PRODUCT, EMethodsEnum.GET, setProducts);
  }, []);

  const handleOnClickInsert: React.MouseEventHandler<HTMLElement> = (): void => {
    navigate(EProductRoutesEnum.PRODUCT_INSERT);
  };

  const handleOnSearch: SearchProps['onSearch'] = (value: string) => {
    if (!value) {
      setProductsFiltered(products);
    } else {
      setProductsFiltered([
        ...products.filter((product) => new RegExp(value, 'i').test(product.name)),
      ]);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    await request(URL_PRODUCT_ID.replace('{productId}', `${productId}`), EMethodsEnum.DELETE);
    await request<IProductType[]>(URL_PRODUCT, EMethodsEnum.GET, setProducts);
  };

  const handleEditProduct = async (productId: number) => {
    navigate(EProductRoutesEnum.PRODUCT_EDIT.replace(':productId', `${productId}`));
  };

  return {
    products: productsFiltered,
    handleOnClickInsert,
    handleOnSearch,
    handleDeleteProduct,
    handleEditProduct,
  };
};
