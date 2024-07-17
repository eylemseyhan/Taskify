import React, { useContext, useEffect, useState } from 'react';
import { Table, Layout, Empty } from 'antd';
import { TaskContext } from '../context/TaskContext';
import { getUsers } from '../firebase';
import './Schedule.css';

const { Content } = Layout;

const Schedule = () => {
  const { tasks } = useContext(TaskContext);
  const [users, setUsers] = useState([]);

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

  const columns = [
    {
      title: 'Görev Adı',
      dataIndex: 'name',
      key: 'name',
      render: text => <span className="task-name">{text}</span>,
    },
    {
      title: 'Açıklama',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Başlangıç Tarihi',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Bitiş Tarihi',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Atanan Kişiler',
      dataIndex: 'assignees',
      key: 'assignees',
      render: (assignees) => getAssigneeNames(assignees),
    },
  ];

  return (
    <Layout className="schedule-layout">
      <Content className="schedule-content">
        <Table
          dataSource={tasks}
          columns={columns}
          rowKey="id"
          pagination={false}
          bordered
          className="schedule-table"
          locale={{
            emptyText: (
              <Empty
                description="Henüz planlanmış görev yok"
              />
            ),
          }}
        />
      </Content>
    </Layout>
  );
};

export default Schedule;
