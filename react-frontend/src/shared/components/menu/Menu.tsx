import { ContainerLogoName, ContainerMenu, LogoMenu, NameCompany } from './menu.styles';

const Menu: React.FC = () => {
  return (
    <ContainerMenu>
      <ContainerLogoName>
        <LogoMenu />
        <NameCompany strong>Vendas Online</NameCompany>
      </ContainerLogoName>
    </ContainerMenu>
  );
};

export default Menu;
