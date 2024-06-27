import React, { useState, useEffect } from 'react';
import { List, Button, message, Card, Empty } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getUsers } from '../../firebase';
import './FilteredTaskList.css';

const FilteredTaskList = ({ tasks, handleEditTask, handleDeleteTask }) => {
  const [users, setUsers] = useState([]);

  // useEffect ile bileşen yüklendiğinde kullanıcıları getirecek

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await getUsers();
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

  const getAssigneeNames = (assignees) => {
    if (!assignees) return 'Atanan kişi yok';
    return assignees.split(', ').map(email => {
      const user = users.find(user => user.email === email);
      return user ? user.name : email;
    }).join(', ');
  };

  const handleSendEmail = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); //fonksiyonu 1 saniye bekletiyoruz
      message.success('E-posta başarıyla gönderildi!');
    } catch (error) {
      console.error('E-posta gönderilirken bir hata oluştu:', error);
      message.error('E-posta gönderilirken bir hata oluştu.');
    }
  };

  return (
    <div className="filtered-task-list-container">
      {tasks && tasks.length > 0 ? (
        <List
          itemLayout="vertical"
          size="large"
          dataSource={tasks}
          renderItem={task => (
            <List.Item key={task.id}>
              <Card
                title={task.name}
                bordered={false}
               
              >
                <p>{task.description}</p>
                <p>Atanan Kişiler: {getAssigneeNames(task.assignees)}</p>
                <p>Tarih Aralığı: {task.startDate} - {task.endDate}</p>
              </Card>
            </List.Item>
          )}
        />
      ) : ( // Eğer görevler yoksa empty bileşeni
        <Empty className="empty-description" description="Henüz planlanmış bir görev yok" />
      )}
      <Button type="primary" onClick={handleSendEmail} style={{ marginTop: '16px' }}>
        Görev Listesini E-posta ile Gönder
      </Button>
    </div>
  );
};

export default FilteredTaskList;
