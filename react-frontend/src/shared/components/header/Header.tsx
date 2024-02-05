import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useState } from 'react';

import { logout } from '../../functions/connection/auth';
import { HeaderContainer, LogoExit } from './header.styles';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        closeIcon={<CloseOutlined />}
        title="Atenção"
        open={open}
        onOk={logout}
        onCancel={hideModal}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Deseja realmente sair?</p>
      </Modal>
      <HeaderContainer>
        <LogoExit onClick={showModal} />
      </HeaderContainer>
    </>
  );
};

export default Header;
