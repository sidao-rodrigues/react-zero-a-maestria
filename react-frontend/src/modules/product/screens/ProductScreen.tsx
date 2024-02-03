import { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/button';
import Screen from '../../../shared/components/screen/Screen';
import Table from '../../../shared/components/table/Table';
import { URL_PRODUCT } from '../../../shared/constants/urls';
import { EMethodsEnum } from '../../../shared/enums/methods.enum';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequest';
import { IProductType } from '../../../shared/types/ProductType';
import CategoryColumn from '../components/CategoryColumn';
import TooltipImage from '../components/TooltipImage';
import { EProductRoutesEnum } from '../routes';

const columns: ColumnsType<IProductType> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (_, product: IProductType) => <TooltipImage product={product} />,
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Categoria',
    dataIndex: 'category',
    key: 'category',
    render: (_, product: IProductType) => <CategoryColumn category={product.category} />,
  },
  {
    title: 'Preço',
    dataIndex: 'price',
    key: 'price',
    render: (_, product: IProductType) => <a>{convertNumberToMoney(product.price)}</a>,
  },
];

const ProductScreen = () => {
  const { products, setProducts } = useDataContext();
  const { request } = useRequests();
  const navigate = useNavigate();

  useEffect(() => {
    request<IProductType[]>(URL_PRODUCT, EMethodsEnum.GET, setProducts);
  }, []);

  const handleOnClickInsert: React.MouseEventHandler<HTMLElement> = (): void => {
    navigate(EProductRoutesEnum.PRODUCT_INSERT);
  };

  return (
    <Screen
      listBrandcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'PRODUTOS',
        },
      ]}
    >
      <Button onClick={handleOnClickInsert}>Inserir</Button>
      <Table columns={columns} dataSource={products} rowKey="id" />
    </Screen>
  );
};

export default ProductScreen;
