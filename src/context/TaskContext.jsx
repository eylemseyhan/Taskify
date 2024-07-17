import React, { createContext, useState, useEffect, useCallback } from 'react';
import { fetchAllTasksFromFirestore, getUserInfo, auth, saveUserSession, loadUserSession, clearUserSession } from '../firebase';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [taskNotifications, setTaskNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState(loadUserSession()); // Oturum bilgilerini yükle

  const loadTasks = useCallback(async () => {
    if (currentUser) {
      const tasksList = await fetchAllTasksFromFirestore();
      setTasks(tasksList); // Görevleri doğrudan yükle
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = auth.currentUser || loadUserSession(); // Oturum bilgilerini yükle
      if (user) {
        const userInfo = await getUserInfo(user.email);
        setCurrentUser(userInfo);
        saveUserSession(userInfo); // Oturum bilgilerini sakla
        loadTasks(); // Kullanıcı bilgisini aldıktan sonra görevleri yükle
      }
    };

    fetchCurrentUser();
  }, [loadTasks]);

  const addTaskNotification = (notification) => {
    setTaskNotifications((prevNotifications) => [...prevNotifications, notification]);
  };

  const removeTaskNotification = (taskId) => {
    setTaskNotifications((prevNotifications) =>
      prevNotifications.filter(notification => notification.taskId !== taskId)
    );
  };

  const markNotificationsAsRead = () => {
    setTaskNotifications((prevNotifications) =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      setTasks,
      loadTasks,
      taskNotifications,
      addTaskNotification,
      removeTaskNotification,
      markNotificationsAsRead,
      currentUser,
      setCurrentUser
    }}>
      {children}
    </TaskContext.Provider>
  );
};
