import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_PRODUCT, URL_PRODUCT_ID } from '../../../shared/constants/urls';
import { IInsertProduct } from '../../../shared/dtos/InsertProduct.dto';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI';
import { useRequests } from '../../../shared/hooks/useRequest';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';
import { EProductRoutesEnum } from '../routes';

export const useInsertProduct = (productId?: string) => {
  const { setNotification } = useGlobalReducer();
  const { request } = useRequests();
  const { product: productReducer, setProduct: setProductReducer } = useProductReducer();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [product, setProduct] = useState<IInsertProduct>({
    name: '',
    price: 0,
    image: '',
    weight: 0,
    length: 0,
    height: 0,
    width: 0,
    diameter: 0,
  });

  useEffect(() => {
    if (product.name && product.categoryId && product.image && product?.price > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [product]);

  useEffect(() => {
    setProductReducer(undefined);
    request(
      URL_PRODUCT_ID.replace('{productId}', `${productId}`),
      EMethodsEnum.GET,
      setProductReducer,
    );
  }, [productId]);

  useEffect(() => {
    if (productReducer) {
      setProduct({
        name: productReducer.name,
        price: productReducer.price,
        image: productReducer.image,
        weight: productReducer.weight,
        length: productReducer.length,
        width: productReducer.width,
        height: productReducer.height,
        diameter: productReducer.diameter,
      });
    }
  }, [productReducer]);

  const handleOnChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    nameObject: string,
    isNumber?: boolean,
  ) => {
    setProduct({
      ...product,
      [nameObject]: isNumber ? Number(event.target.value) : event.target.value,
    });
  };

  const handleOnChangeSelect = (value: string): void => {
    setProduct({
      ...product,
      categoryId: Number(value),
    });
  };

  const handleInsertProduct = async () => {
    setLoading(true);
    await connectionAPIPost<IInsertProduct>(URL_PRODUCT, product)
      .then(() => {
        setNotification('Sucesso!', 'success', 'Produto Inserido com Sucesso!');
        navigate(EProductRoutesEnum.PRODUCT);
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
      });
    setLoading(false);
  };

  return {
    product,
    loading,
    disabledButton,
    handleOnChangeInput,
    handleOnChangeSelect,
    handleInsertProduct,
  };
};
