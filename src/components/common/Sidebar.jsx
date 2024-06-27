import React from 'react';
import { Layout, Menu } from 'antd';
import { UnorderedListOutlined, CalendarOutlined, FileOutlined } from '@ant-design/icons';
import './Sidebar.css';

const { Sider } = Layout;

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const Sidebar = () => {
  return (
    <Sider width={200} className="custom-sider">
      <Menu defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item key="1" icon={<UnorderedListOutlined />} onClick={() => scrollToSection('tasks-section')}>
          Görevler
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />} onClick={() => scrollToSection('calendar-section')}>
          Takvim
        </Menu.Item>
        <Menu.Item key="3" icon={<FileOutlined />} onClick={() => scrollToSection('schedule-section')}>
          Çizelge
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
