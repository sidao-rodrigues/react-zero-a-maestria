import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_PRODUCT, URL_PRODUCT_ID } from '../../../shared/constants/urls';
import { IInsertProduct } from '../../../shared/dtos/InsertProduct.dto';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequest';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';
import { EProductRoutesEnum } from '../routes';

const DEFAULT_PRODUCT: IInsertProduct = {
  name: '',
  price: 0,
  image: '',
  weight: 0,
  length: 0,
  height: 0,
  width: 0,
  diameter: 0,
};

export const useInsertProduct = (productId?: string) => {
  // const { setNotification } = useGlobalReducer();
  const navigate = useNavigate();
  const { request } = useRequests();
  const { product: productReducer, setProduct: setProductReducer } = useProductReducer();

  const [loadingProduct, setLoadingProduct] = useState<boolean>(false);
  const [loading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [product, setProduct] = useState<IInsertProduct>(DEFAULT_PRODUCT);

  useEffect(() => {
    if (product.name && product.categoryId && product.image && product?.price > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [product]);

  useEffect(() => {
    const findProduct = async () => {
      setLoadingProduct(true);
      await request(
        URL_PRODUCT_ID.replace('{productId}', `${productId}`),
        EMethodsEnum.GET,
        setProductReducer,
      );
      setLoadingProduct(false);
    };

    if (productId) {
      setIsEdit(true);
      findProduct();
    } else {
      setProductReducer(undefined);
      setProduct(DEFAULT_PRODUCT);
    }
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
        categoryId: productReducer.category?.id,
      });
    } else {
      setProduct(DEFAULT_PRODUCT);
    }
  }, [productReducer]);

  const handleOnClickCancel = (): void => {
    navigate(EProductRoutesEnum.PRODUCT);
  };

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
    // setLoading(true);
    if (productId) {
      await request<IInsertProduct>(
        URL_PRODUCT_ID.replace('{productId}', `${productId}`),
        EMethodsEnum.PUT,
        undefined,
        product,
        'Produto modificado com sucesso',
      );
    } else {
      await request<IInsertProduct>(
        URL_PRODUCT,
        EMethodsEnum.POST,
        undefined,
        product,
        'Produto inserido com sucesso',
      );
    }
    navigate(EProductRoutesEnum.PRODUCT);

    // await connectionAPIPost<IInsertProduct>(URL_PRODUCT, product)
    //   .then(() => {
    //     setNotification('Sucesso!', 'success', 'Produto Inserido com Sucesso!');
    //     navigate(EProductRoutesEnum.PRODUCT);
    //   })
    //   .catch((error: Error) => {
    //     setNotification(error.message, 'error');
    //   });
    // setLoading(false);
  };

  return {
    product,
    loading,
    isEdit,
    disabledButton,
    loadingProduct,
    handleOnChangeInput,
    handleOnChangeSelect,
    handleInsertProduct,
    handleOnClickCancel,
  };
};
