import React from 'react';
import { Modal, Form, Input } from 'antd';

const SubtaskForm = ({ open, onCancel, onSubmit, subtaskName, setSubtaskName, subtaskDescription, setSubtaskDescription }) => {
  return (
    <Modal
      open={open}
      title="Alt Görev Ekle"
      okText="Ekle"
      cancelText="İptal"
      onCancel={onCancel}
      onOk={onSubmit}
    >
      <Form layout="vertical">
        <Form.Item label="Alt Görev Adı">
          <Input value={subtaskName} onChange={(e) => setSubtaskName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Alt Görev Açıklaması">
          <Input.TextArea value={subtaskDescription} onChange={(e) => setSubtaskDescription(e.target.value)} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SubtaskForm;
