import React, { useState, useContext, useEffect } from 'react';
import { Layout } from 'antd';
import ProfileDropdown from './ProfileDropdown';
import NotificationBadge from './NotificationBadge';
import ProfileModal from './ProfileModal';
import LogoutModal from './LogoutModal';
import NotificationModal from './NotificationModal';
import { TaskContext } from '../../../context/TaskContext';
import logo from '../../../assets/logo.png';
import './Navbar.css';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../../firebase';

const { Header } = Layout;

const Navbar = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); //başta kapalı
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);//başta kapalı
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false); //başta kapalı
  const { taskNotifications, currentUser, setCurrentUser } = useContext(TaskContext);
  const navigate = useNavigate();

  const unreadNotifications = taskNotifications.filter(
    notification => !notification.read && notification.assignee === currentUser?.email
  ); // read durumu false. assignee bilgisi currentUser olan notificationları filtrele

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userInfo = await getUserInfo(user.email);
        if (userInfo) {
          console.log('User Info:', userInfo); // Kullanıcı bilgilerini consoleda doğruladım
          setCurrentUser(userInfo);
        }
      }
    };

    fetchUserName();
  }, [setCurrentUser]);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/'); // Login sayfasına yönlendirme
    });
  };

  return (
    <Header className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="right-content">
        <span className="welcome-message">
          Hoş geldiniz {currentUser?.name ? currentUser.name : ''} 
        </span>
        <ProfileDropdown
          onProfileClick={() => setIsProfileModalOpen(true)} //profil modalı açıyor
          onLogoutClick={() => setIsLogoutModalOpen(true)}
        />
        <NotificationBadge
          count={unreadNotifications.length}
          onClick={() => setIsNotificationModalOpen(true)}
        />
      </div>
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
    </Header>
  );
};

export default Navbar;
