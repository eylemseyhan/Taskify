import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import LoginForm from '../components/forms/LoginForm';
import { DotLottiePlayer } from '@dotlottie/react-player';
import taskAnimation from '../assets/tasks.lottie'; // Correct path to the animation file
import './Login.css'; // Dış CSS dosyasını yeniden kullanın

const { Content } = Layout;
const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <Layout className="login-layout">
      <Content className="login-content">
        <div className="login-form-container">
          <Title level={1} className="login-title">Taskify'a giriş yap.</Title>
          <LoginForm onLogin={handleLogin} />
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
        style={{ position: 'absolute', top: 20, left: 20 }}
      >
        Geri Dön
      </Button>
    </Layout>
  );
};

export default Login;
