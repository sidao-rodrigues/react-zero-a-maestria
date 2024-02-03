import Screen from '../../../shared/components/screen/Screen';
import { EProductRoutesEnum } from '../routes';

const ProductInsert: React.FC = () => {
  return (
    <Screen
      listBrandcrumb={[
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
      ]}
    >
      Inserir Produto
    </Screen>
  );
};

export default ProductInsert;
