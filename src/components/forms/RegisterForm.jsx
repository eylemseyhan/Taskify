import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { auth, firestore } from '../../firebase';

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const { email, password, name } = values;
    try {
      console.log('Creating user with email:', email);
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      console.log('User created:', user);

      // Kullanıcı bilgilerini Firestore'a kaydet
      await firestore.collection('users').doc(user.email).set({
        name,
        email,
        password, // Şifreyi kaydediyoruz
      });

      message.success('Kayıt başarıyla tamamlandı!');
      form.resetFields();
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.code === 'auth/email-already-in-use') {
        message.error('Bu e-posta adresi zaten kullanılıyor. Giriş yapmayı deneyin.');
        // Eğer kullanıcı mevcutsa, giriş yapmayı deneyebiliriz
        try {
          const userCredential = await auth.signInWithEmailAndPassword(email, password);
          message.success('Giriş başarılı!');
        } catch (signInError) {
          console.error('Error signing in:', signInError);
          message.error('Giriş sırasında bir hata oluştu.');
        }
      } else {
        message.error('Kayıt sırasında bir hata oluştu.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} name="register" onFinish={onFinish}>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Lütfen adınızı girin!' }]}
      >
        <Input placeholder="Adınız" />
      </Form.Item>
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
        <Input.Password placeholder="Şifre" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Kayıt Ol
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
