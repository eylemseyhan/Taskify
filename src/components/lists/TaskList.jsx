import React, { useEffect, useState } from 'react';
import { List, Button, Card, Empty } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';
import { getUsers } from '../../firebase';
import "./TaskList.css";

const TaskList = ({ tasks, handleEditTask, handleDeleteTask, isAuthorized }) => {
  const [users, setUsers] = useState([]);


  // Bileşen yüklendiğinde kullanıcıları getiren useEffect hook'u

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await getUsers();
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

   // Atanan kişilerin isimlerini almak için

  const getAssigneeNames = (assignees) => {
    if (!assignees) return 'Atanan kişi yok';
    return assignees.split(', ').map(email => { //diziye dönüştürüyor ve her bir elemanı işliyor
      const user = users.find(user => user.email === email); // email'e göre kullanıcıyı buluyor
      return user ? user.name : email;  // kullanıcı varsa ismini yoksa email'i döndürüyor
    }).join(', ');
  };

  const getAssigneeIds = (assignees) => { 
    if (!assignees) return []; // Eğer assignees yoksa boş dizi döndür
    return assignees.split(', '); // assignees'i virgüllerden ayırıp diziye çevir
  };

  const handleEdit = (task) => {
    const assigneeIds = getAssigneeIds(task.assignees);
    const updatedTask = {
      ...task,
      assignees: assigneeIds.map(email => {
        const user = users.find(user => user.email === email);
        return user ? user.name : email;
      }).join(', ')
    };
    handleEditTask(updatedTask);
  };

  return (
    <div className="task-list-container">
      {tasks && tasks.length > 0 ? ( // Eğer görevler varsa listele
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={tasks}
          renderItem={task => (
            <CSSTransition
              key={task.id}
              timeout={500}
              classNames="task-card"
            >
              <List.Item>
                <Card
                  title={task.name}
                  bordered={false} 
                  actions={[
                    <Button type="link" className="button-link" icon={<EditOutlined />} onClick={() => handleEdit(task)}>
                      Düzenle
                    </Button>,
                    isAuthorized && (
                      <Button type="link" className="button-link" danger icon={<DeleteOutlined />} onClick={() => handleDeleteTask(task)}>
                        Sil
                      </Button>
                    )
                  ]}
                >
                  <p>{task.description}</p>
                  <p>Atanan Kişiler: {getAssigneeNames(task.assignees)}</p>
                  <p>Tarih Aralığı: {task.startDate} - {task.endDate}</p>
                  <p>Alt Görevler:</p>
                  <ul>
                    {task.subtasks && task.subtasks.map((subtask, index) => (
                      <li key={index}>{subtask}</li>
                    ))}
                  </ul>
                </Card>
              </List.Item>
            </CSSTransition>
          )}
        />
      ) : (
        <Empty description="Henüz planlanmış bir görev yok" />
      )}
    </div>
  );
};

export default TaskList;
