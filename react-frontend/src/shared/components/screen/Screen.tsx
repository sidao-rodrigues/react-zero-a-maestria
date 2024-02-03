import Breadcrumb, { IListBreadcrumb } from '../breadcrumb/Breadcrumb';
import { ScreenContainer } from './screen.styles';

interface IScreenProps {
  children: React.ReactNode;
  listBrandcrumb?: IListBreadcrumb[];
}

const Screen: React.FC<IScreenProps> = ({ children, listBrandcrumb }: IScreenProps) => {
  return (
    <ScreenContainer>
      {listBrandcrumb && <Breadcrumb listBrandcrumb={listBrandcrumb} />}
      {children}
    </ScreenContainer>
  );
};

export default Screen;
