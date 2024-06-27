import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TaskCalendar from './pages/Calendar';
import Schedule from './pages/Schedule';

import { TaskProvider } from './context/TaskContext';
import ErrorBoundary from './ErrorBoundary';
import { ConfigProvider } from 'antd';
import './index.css';
import 'antd/dist/reset.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#52c41a', 
        colorLink: '#1890ff', 
        colorSuccess: '#52c41a', 
        colorWarning: '#faad14', 
        colorError: '#f5222d', 
        fontSizeBase: '14px', 
        headingColor: '#333333', 
        textColor: '#595959', 
        textColorSecondary: '#8c8c8c', 
        disabledColor: '#d9d9d9', 
        borderRadiusBase: '4px', 
        borderColorBase: '#d9d9d9', 
        boxShadowBase: '0 2px 8px rgba(0, 0, 0, 0.15)', 
        colorBackground: '#E7D37F', 
      },
    }}
  >
    <TaskProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="calendar" element={<TaskCalendar />} />
              <Route path="schedule" element={<Schedule />} />
              
            </Route>
          </Routes>
        </ErrorBoundary>
      </Router>
    </TaskProvider>
  </ConfigProvider>
);
