// components/tasks/TaskCard.jsx
import React from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const TaskCard = ({ task, onEdit, onDelete }) => (
  <Card
    title={task.name}
    actions={[
      <EditOutlined key="edit" onClick={() => onEdit(task)} />,
      <DeleteOutlined key="delete" onClick={() => onDelete(task)} />,
    ]}
  >
    <p>Açıklama: {task.description}</p>
    <p>Başlangıç Tarihi: {task.startDate}</p>
    <p>Bitiş Tarihi: {task.endDate}</p>
    <p>Atanan Kişiler: {task.assignees}</p>
  </Card>
);

export default TaskCard;
