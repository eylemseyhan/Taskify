import React from 'react';
import { Dropdown, Menu, Avatar } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';

const ProfileDropdown = ({ onProfileClick, onLogoutClick }) => {
  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={onProfileClick} icon={<UserOutlined />}>
        Profil
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Ayarlar
      </Menu.Item>
      <Menu.Item key="logout" onClick={onLogoutClick} icon={<LogoutOutlined />}>
        Çıkış Yap
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <Avatar size="large" icon={<UserOutlined />} />
      </a>
    </Dropdown>
  );
};

export default ProfileDropdown;
