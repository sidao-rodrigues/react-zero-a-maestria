import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';

const ProductScreen = () => {
  const { user } = useGlobalContext();
  return <div>Produtos {user?.name}</div>;
};

export default ProductScreen;
