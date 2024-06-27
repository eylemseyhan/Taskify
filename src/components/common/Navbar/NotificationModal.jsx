import React, { useContext, useEffect } from 'react';
import { Modal, List, Empty, Button } from 'antd';
import { TaskContext } from '../../../context/TaskContext';

const NotificationModal = ({ isOpen, onClose }) => {
  const { taskNotifications, markNotificationsAsRead } = useContext(TaskContext);

  useEffect(() => {
    if (isOpen) {
      markNotificationsAsRead();
    }
  }, [isOpen, markNotificationsAsRead]);

  const filteredNotifications = taskNotifications.filter(
    notification => notification.assignee === localStorage.getItem('userEmail')
  );

  return (
    <Modal
      title="Bildirimler"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Kapat
        </Button>
      ]}
    >
      {filteredNotifications.length > 0 ? (
        <List
          dataSource={filteredNotifications}
          renderItem={notification => (
            <List.Item key={notification.taskId}>
              {notification.type === 'added' && <p>Göreve eklendiniz: {notification.taskName}</p>}
              {notification.type === 'removed' && <p>Görevden silindiniz: {notification.taskName}</p>}
              {notification.type === 'updated' && <p>Görev güncellendi: {notification.taskName}</p>}
            </List.Item>
          )}
        />
      ) : (
        <Empty description="No data" />
      )}
    </Modal>
  );
};

export default NotificationModal;
