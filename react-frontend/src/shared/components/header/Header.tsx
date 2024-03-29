import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../functions/connection/auth';
import { HeaderTestIdEnum } from './enum/headerTestIdEnum';
import { HeaderContainer, LogoExit } from './header.styles';

const Header: React.FC = () => {
  const navigate = useNavigate();
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
        data-testid={HeaderTestIdEnum.HEADER_MODAL}
        closeIcon={<CloseOutlined />}
        title="Atenção"
        open={open}
        onOk={() => logout(navigate)}
        onCancel={hideModal}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p data-testid={HeaderTestIdEnum.HEADER_MODAL_P}>Deseja realmente sair?</p>
      </Modal>
      <HeaderContainer data-testid={HeaderTestIdEnum.HEADER_CONTAINER}>
        <LogoExit data-testid={HeaderTestIdEnum.HEADER_LOGO} onClick={showModal} />
      </HeaderContainer>
    </>
  );
};

export default Header;
