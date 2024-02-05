import { Divider } from 'antd';

import Breadcrumb, { IListBreadcrumb } from '../breadcrumb/Breadcrumb';
import Header from '../header/Header';
import Menu from '../menu/Menu';
import { ScreenContainer } from './screen.styles';

interface IScreenProps {
  children: React.ReactNode;
  listBrandcrumb?: IListBreadcrumb[];
}

const Screen: React.FC<IScreenProps> = ({ children, listBrandcrumb }: IScreenProps) => {
  return (
    <>
      <Header />
      <ScreenContainer>
        <Menu />
        {listBrandcrumb && (
          <>
            <Breadcrumb listBrandcrumb={listBrandcrumb} />
            <Divider />
          </>
        )}
        {children}
      </ScreenContainer>
    </>
  );
};

export default Screen;
