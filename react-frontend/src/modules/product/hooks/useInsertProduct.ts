import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_PRODUCT } from '../../../shared/constants/urls';
import { IInsertProduct } from '../../../shared/dtos/InsertProduct.dto';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { EProductRoutesEnum } from '../routes';

export const useInsertProduct = () => {
  const { setNotification } = useGlobalReducer();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [product, setProduct] = useState<IInsertProduct>({
    name: '',
    price: 0,
    image: '',
  });

  useEffect(() => {
    if (product.name && product.categoryId && product.image && product?.price > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [product]);

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
