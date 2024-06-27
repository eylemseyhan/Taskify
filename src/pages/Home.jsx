import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Button, Row, Col, Card, Avatar, Menu } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import logo from '../assets/logo.png';
import './Home.css';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const testimonials = [
  {
    name: 'İpek Öztürk',
    text: 'Taskify sayesinde tüm görevlerimi kolayca yönetebiliyorum. İşbirliği yapmak çok daha kolay hale geldi.',
    image: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'Ebrar Seda Gündüz',
    text: 'Taskify, takım projelerinde düzeni sağlamak için harika bir araç. Herkese tavsiye ederim!',
    image: 'https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'Zeynep Helin Aydın',
    text: 'Görevlerimi takip etmek ve tamamlandıklarında işaretlemek hiç bu kadar kolay olmamıştı. Taskify mükemmel!',
    image: 'https://images.pexels.com/photos/785667/pexels-photo-785667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout className="home-layout">
      <Header className="home-header">
        <div className="home-logo-container">
          <img src={logo} alt="Taskify Logo" className="home-logo" />
         
        </div>
        <Menu mode="horizontal" className="home-menu">
          <Menu.Item key="home" onClick={() => navigate('/')}>Anasayfa</Menu.Item>
          <Menu.Item key="features" onClick={() => navigate('/features')}>Özellikler</Menu.Item>
          <Menu.Item key="pricing" onClick={() => navigate('/pricing')}>Fiyatlandırma</Menu.Item>
          <Menu.Item key="contact" onClick={() => navigate('/contact')}>İletişim</Menu.Item>
        </Menu>
      </Header>
      <Content className="home-content">
        <div className="home-welcome">
          <Title level={1} className="home-title">Taskify'a Hoş Geldiniz</Title>
          <Paragraph className="home-paragraph">
          Taskify, takım görevlerinizi düzenlemenize ve yönetmenize yardımcı olan bir platformdur. Görevlerinizi ekleyin, düzenleyin ve takım üyelerinizle işbirliği yaparak projelerinizi yönetin. İş süreçlerinizi daha verimli hale getirin ve takımınızla birlikte başarıya ulaşın.
          </Paragraph>
          <div className="home-buttons">
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/login')}
              className="home-button home-button-primary"
              icon={<ArrowRightOutlined />}
            >
              Giriş Yap
            </Button>
            <Button
              type="default"
              size="large"
              onClick={() => navigate('/register')}
              className="home-button home-button-default"
              icon={<ArrowRightOutlined />}
            >
              Kayıt Ol
            </Button>
          </div>
        </div>
        <Row gutter={16} className="home-info-row">
          <Col xs={24} md={8}>
            <Card title="Görev Yönetimi" bordered={false} className="info-card">
              Takımınızın görevlerinizi kolayca ekleyin ve yönetin.
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="Takım İşbirliği" bordered={false} className="info-card">
              Takım üyelerinizle işbirliği yapın ve projeleri birlikte yönetin.
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="İlerleme Takibi" bordered={false} className="info-card">
              Görevlerinizin ilerlemesini kolayca takip edin.
            </Card>
          </Col>
        </Row>
        <div className="testimonials-section">
          <Title level={2} className="section-title">Kullanıcı Yorumları</Title>
          <Row gutter={16}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} md={8} key={index}>
                <Card bordered={false} className="testimonial-card">
                  <Avatar size={64} src={testimonial.image} />
                  <Paragraph className="testimonial-text">{testimonial.text}</Paragraph>
                  <Paragraph className="testimonial-author">- {testimonial.name}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
