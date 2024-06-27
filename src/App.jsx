import React, { Suspense } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { ConfigProvider, App as AntdApp } from 'antd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css'; 

const App = () => {
  const location = useLocation();

  return (
    <ConfigProvider>
      <AntdApp>
        <div className="app-container">
          <Suspense fallback={<div>Loading...</div>}>
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                classNames="page"
                timeout={300}
              >
                <Outlet />
              </CSSTransition>
            </TransitionGroup>
          </Suspense>
        </div>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
