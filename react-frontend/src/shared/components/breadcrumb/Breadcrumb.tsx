import { Breadcrumb as BreadcrumbAntd } from 'antd';
import { useNavigate } from 'react-router-dom';

export interface IListBreadcrumb {
  name: string;
  navigateTo?: string;
}

interface IBreadcrumbProps {
  listBrandcrumb: IListBreadcrumb[];
}

const Breadcrumb: React.FC<IBreadcrumbProps> = ({ listBrandcrumb }: IBreadcrumbProps) => {
  const navigate = useNavigate();

  const handleGoToClick = (navigateTo: string) => {
    navigate(navigateTo);
  };

  return (
    <BreadcrumbAntd
      items={listBrandcrumb.map(({ name, navigateTo }) => ({
        title: navigateTo ? <a onClick={() => handleGoToClick(navigateTo)}>{name}</a> : name,
      }))}
    />
  );
};

export default Breadcrumb;
