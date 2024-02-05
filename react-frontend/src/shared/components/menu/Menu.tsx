import {
  HomeOutlined,
  LaptopOutlined,
  ProfileOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu as MenuAntd } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EProductRoutesEnum } from '../../../modules/product/routes';
import { ContainerLogoName, ContainerMenu, LogoMenu, NameCompany } from './menu.styles';

type MenuItem = Required<MenuProps>['items'][number];

const Menu: React.FC = () => {
  const navitage = useNavigate();
  const [current, setCurrent] = useState('1');

  const items: MenuItem[] = [
    {
      key: 'home',
      label: 'Principal',
      icon: <HomeOutlined />,
    },
    {
      key: 'products',
      label: 'Produtos',
      icon: <LaptopOutlined />,
      children: [
        {
          key: 'products_view',
          label: 'Visualizar',
          onClick: () => navitage(EProductRoutesEnum.PRODUCT),
        },
        {
          key: 'products_insert',
          label: 'Inserir',
          onClick: () => navitage(EProductRoutesEnum.PRODUCT_INSERT),
        },
      ],
    },
    {
      key: 'categories',
      label: 'Categorias',
      icon: <ProfileOutlined />,
      children: [
        {
          key: 'category_view',
          label: 'Visualizar',
          onClick: () => navitage(EProductRoutesEnum.PRODUCT),
        },
        {
          key: 'category_insert',
          label: 'Inserir',
          onClick: () => navitage(EProductRoutesEnum.PRODUCT_INSERT),
        },
      ],
    },
    {
      key: 'order',
      label: 'Pedidos',
      icon: <SafetyCertificateOutlined />,
    },
    {
      key: 'user',
      label: 'Clientes',
      icon: <UserOutlined />,
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <ContainerMenu>
      <ContainerLogoName>
        <LogoMenu />
        <NameCompany strong>Vendas Online</NameCompany>
      </ContainerLogoName>
      <MenuAntd
        theme="dark"
        onClick={onClick}
        style={{ width: 240 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </ContainerMenu>
  );
};

export default Menu;
