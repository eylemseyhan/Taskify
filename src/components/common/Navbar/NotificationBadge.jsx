import React from 'react';
import { Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const NotificationBadge = ({ count, onClick }) => {
  return (
    <Badge count={count} offset={[-5, 5]}>
      <BellOutlined onClick={onClick} style={{ fontSize: '24px', cursor: 'pointer' }} />
    </Badge>
  );
};

export default NotificationBadge;
