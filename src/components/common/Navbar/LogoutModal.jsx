import React from 'react';
import { Modal, Button } from 'antd';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => { //propların alındığı yer
  return (
    <Modal
      title="Çıkış Yap"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          İptal
        </Button>,
        <Button key="submit" type="primary" onClick={onConfirm}>
          Çıkış Yap
        </Button>
      ]}
    >
      <p>Çıkış yapmak istediğinize emin misiniz?</p>
    </Modal>
  );
};

export default LogoutModal;
