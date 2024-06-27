import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'antd';
import TaskList from '../lists/TaskList';
import TaskForm from '../forms/TaskForm';
import DeleteConfirmationModal from '../forms/DeleteConfirmationModal';
import { TaskContext } from '../../context/TaskContext';
import { addTaskToFirestore, updateTaskInFirestore, deleteTaskFromFirestore } from '../../firebase';

const TaskManagement = () => {
  const { tasks, setTasks, addTaskNotification, removeTaskNotification, loadTasks } = useContext(TaskContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    loadTasks(); // Görevleri yükledik
  }, [loadTasks]);

  const handleAddTask = async (task) => {
    try {
      // Görevin iki kez eklenmemesi için kontroller
      setIsModalOpen(false); // Modalı hemen kapat
      const taskId = await addTaskToFirestore(task); // Görevi Firestore'a ekledik
      const newTask = { ...task, id: taskId }; // Görevi ID ile ekledik
      setTasks(prevTasks => [...prevTasks, newTask]);
      addTaskNotification({
        type: 'added',
        assignee: task.assignees,
        taskName: task.name,
        taskId: taskId
      });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = (task) => {
    setCurrentTask(task); // Şu anki görevi seçtik update etmek için
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await updateTaskInFirestore(currentTask.id, updatedTask);
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === currentTask.id ? { ...updatedTask, id: currentTask.id } : task))
      ); // Eğer görev ile aynı id'ye sahipse güncelle yoksa aynı şekilde bırak
      addTaskNotification({
        type: 'updated',
        assignee: updatedTask.assignees,
        taskName: updatedTask.name,
        taskId: updatedTask.id
      });
      setIsModalOpen(false);
      setIsEditing(false);
      setCurrentTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      if (taskToDelete && taskToDelete.id) {
        await deleteTaskFromFirestore(taskToDelete.id);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskToDelete.id));
        removeTaskNotification(taskToDelete.id);
        taskToDelete.assignees.split(', ').forEach(assignee => {
          addTaskNotification({
            type: 'removed',
            assignee: assignee,
            taskName: taskToDelete.name,
            taskId: taskToDelete.id
          });
        });
        setDeleteModalOpen(false);
        setTaskToDelete(null);
      } else {
        console.error('Task to delete is not properly defined:', taskToDelete);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const showDeleteModal = (task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  return (
    <div className="task-management-container">
      <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: 16 }}>
        Görev Ekle
      </Button>
      <TaskList
        tasks={tasks}
        handleEditTask={handleEditTask}
        handleDeleteTask={showDeleteModal}
        isAuthorized={true} // Herkes yetkili
      />
      <TaskForm
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setIsEditing(false);
          setCurrentTask(null);
        }}
        onSubmit={isEditing ? handleUpdateTask : handleAddTask}
        isEditing={isEditing}
        task={currentTask}
      />
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onConfirm={handleDeleteTask}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default TaskManagement;
