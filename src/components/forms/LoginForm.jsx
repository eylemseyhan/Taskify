import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import './LoginForm.css';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      message.success('Giriş başarılı!');
      navigate('/dashboard');
    } catch (error) {
      message.error('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      console.error('Error during login:', error);
    }
    setLoading(false);
  };

  return (
    <Form
      name="login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Lütfen e-posta adresinizi girin!' }]}
      >
        <Input placeholder="E-posta" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
      >
        <Input type="password" placeholder="Şifre" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
          Giriş Yap
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
