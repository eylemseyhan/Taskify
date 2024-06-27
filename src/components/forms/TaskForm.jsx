import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, Select, Button, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getUsers } from '../../firebase';

const { RangePicker } = DatePicker;
const { Option } = Select;

const TaskForm = ({ open, onCancel, onSubmit, isEditing, task }) => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Formun yalnızca bir kez gönderilmesini sağlamak için

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

  useEffect(() => {
    if (open && task) {
      form.setFieldsValue({
        name: task.name || '',
        description: task.description || '',
        dates: task.startDate && task.endDate
          ? [dayjs(task.startDate), dayjs(task.endDate)]
          : [],
        assignees: task.assignees ? task.assignees.split(', ') : [],
        subtasks: task.subtasks || [], // Alt görevler dizi olarak set ediliyor
        status: task.status || 'Beklemede'
      });
    } else {
      form.resetFields();
    }
  }, [open, task, form]);

  const handleFinish = async (values) => {
    setLoading(true); // Formun gönderilmesini engellemek için yükleme durumu
    const assigneesEmails = values.assignees.map(name => {
      const user = users.find(user => user.name === name);
      return user ? user.email : name;
    });

    const taskData = {
      name: values.name || '',
      description: values.description || '',
      startDate: values.dates ? values.dates[0].format('YYYY-MM-DD') : '',
      endDate: values.dates ? values.dates[1].format('YYYY-MM-DD') : '',
      assignees: assigneesEmails.join(', '),
      subtasks: values.subtasks || [], // Alt görevler dizi olarak kaydediliyor
      status: values.status || 'Beklemede'
    };

    try {
      await onSubmit(taskData);
      form.resetFields();
    } catch (error) {
      console.error('Error handling form submission:', error);
    } finally {
      setLoading(false); // Yükleme durumunu sıfırla
    }
  };

  return (
    <Modal
      forceRender
      open={open}
      title={isEditing ? 'Görevi Güncelle' : 'Görev Ekle'}
      okText={isEditing ? 'Güncelle' : 'Ekle'}
      cancelText="İptal"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields()
          .then((values) => {
            handleFinish(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
            message.error('Lütfen gerekli alanları doldurun.');
          });
      }}
      confirmLoading={loading} // Modalın yükleme durumunu kontrol et
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Görev Adı"
          rules={[{ required: true, message: 'Lütfen görev adını girin' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Açıklama"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="dates"
          label="Tarih Aralığı"
          rules={[{ required: true, message: 'Lütfen tarih aralığını seçin' }]}
        >
          <RangePicker />
        </Form.Item>
        <Form.Item
          name="assignees"
          label="Atanan Kişiler"
          rules={[{ required: true, message: 'Lütfen atanan kişileri seçin' }]}
        >
          <Select mode="tags">
            {users.map((user, index) => (
              <Option key={index} value={user.name}>
                {user.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.List name="subtasks">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Form.Item
                  key={key}
                  {...restField}
                  label="Alt Görev"
                >
                  <Input.Group compact>
                    <Form.Item
                      {...restField}
                      name={[name]}
                      style={{ display: 'inline-block', width: 'calc(100% - 32px)' }}
                      rules={[{ required: true, message: 'Lütfen alt görevi girin' }]}
                    >
                      <Input placeholder="Alt Görev" />
                    </Form.Item>
                    <MinusCircleOutlined
                      style={{ display: 'inline-block', margin: '0 8px' }}
                      onClick={() => remove(name)}
                    />
                  </Input.Group>
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Alt Görev Ekle
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item
          name="status"
          label="Durum"
          rules={[{ required: true, message: 'Lütfen durumu girin' }]}
        >
          <Select>
            <Option value="Beklemede">Beklemede</Option>
            <Option value="Tamamlandı">Tamamlandı</Option>
            <Option value="Devam Ediyor">Devam Ediyor</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
