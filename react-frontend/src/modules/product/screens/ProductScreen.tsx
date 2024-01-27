import { useEffect } from 'react';

import { URL_PRODUCT } from '../../../shared/constants/urls';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequest';
import { IProductType } from '../types/ProductType';

const ProductScreen = () => {
  const { products, setProducts } = useDataContext();
  const { request } = useRequests();

  useEffect(() => {
    request<IProductType[]>(URL_PRODUCT, EMethodsEnum.GET, setProducts);
  }, []);

  return products.map((product, idx) => <div key={idx}>{product.name}</div>);
};

export default ProductScreen;
