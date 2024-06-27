import React, { useContext, useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { TaskContext } from '../../../context/TaskContext';
import { auth, getUserInfo } from '../../../firebase';

const ProfileModal = ({ isOpen, onClose }) => {
  const { taskNotifications } = useContext(TaskContext);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        const userData = await getUserInfo(user.uid);
        if (userData) {
          setUserInfo({
            name: userData.name,
            email: user.email,
            password: userData.password
          });
        }
      }
    };

    if (isOpen) {
      fetchUserInfo();
    }
  }, [isOpen]);

  return (
    <Modal
      title="Profil Bilgileri"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Kapat
        </Button>
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="İsim">
          <Input value={userInfo.name} readOnly />
        </Form.Item>
        <Form.Item label="E-posta">
          <Input value={userInfo.email} readOnly />
        </Form.Item>
        <Form.Item label="Şifre">
          <Input.Password value={userInfo.password} readOnly />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProfileModal;

