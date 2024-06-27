import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import RegisterForm from '../components/forms/RegisterForm';
import { DotLottiePlayer } from '@dotlottie/react-player';
import taskAnimation from '../assets/register.lottie'; // Correct path to the animation file
import './Login.css'; // Dış CSS dosyasını yeniden kullanın

const { Content } = Layout;
const { Title } = Typography;

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/dashboard');
  };

  return (
    <Layout className="login-layout">
      <Content className="login-content">
        <div className="login-form-container">
          <Title level={1} className="login-title">Taskify'a kayıt ol.</Title>
          <RegisterForm onRegister={handleRegister} />
        </div>
      </Content>
      <div className="dotlottie-container">
        <DotLottiePlayer src={taskAnimation} autoplay loop />
      </div>
      <Button
        type="link"
        className='back-button'
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/')}
        style={{ position: 'absolute', top: 20, left: 20}}
      >
        Geri Dön
      </Button>
    </Layout>
  );
};

export default Register;
