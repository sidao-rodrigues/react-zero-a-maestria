import { IListBreadcrumb } from '../../../shared/components/breadcrumb/Breadcrumb';
import Screen from '../../../shared/components/screen/Screen';
import { EProductRoutesEnum } from '../routes';

const ProductInsert: React.FC = () => {
  const listBreadcrumb: IListBreadcrumb[] = [
    {
      name: 'HOME',
    },
    {
      name: 'PRODUTOS',
      navigateTo: EProductRoutesEnum.PRODUCT,
    },
    {
      name: 'INSERIR PRODUTO',
    },
  ];

  return <Screen listBrandcrumb={listBreadcrumb}>Inserir Produto</Screen>;
};

export default ProductInsert;
