import React, { useState, useEffect } from 'react';
import { Form, Select, DatePicker, Button } from 'antd';
import { getUsers } from '../../firebase'; // Firebase'den kullanıcıları alma işlevini içe aktarın

const { RangePicker } = DatePicker;
const { Option } = Select;

const TaskFilter = ({ onFilter }) => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleFinish = (values) => { //Form gönderildiğinde çağrılır ve seçilen kişileri ve tarih aralığını alır
    const selectedAssignees = values.assignees || [];
    const dateRange = values.dates || [];
    onFilter(selectedAssignees, dateRange);
  };

  return (
    <Form form={form} layout="inline" onFinish={handleFinish} className="task-filter-form">
      <Form.Item name="assignees" label="Kişiler">
        <Select 
          mode="multiple" //çoklu seçim olabilir.
          placeholder="Kişileri Seçin" 
          allowClear
          style={{ minWidth: '200px' }}
        >
          {users.map((user, index) => (
            <Option key={index} value={user.email}>
              {user.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="dates" label="Tarih Aralığı">
        <RangePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Filtrele
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskFilter;
