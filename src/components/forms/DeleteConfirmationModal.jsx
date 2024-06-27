import React from 'react';
import { Modal } from 'antd';

const DeleteConfirmationModal = ({ open, onConfirm, onCancel }) => {
  return (
    <Modal
      title="Görevi Sil"
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Sil"
      cancelText="İptal"
    >
      <p>Bu görevi silmek istediğinizden emin misiniz?</p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
