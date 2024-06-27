import React, { useState, useEffect, useContext } from 'react';
import { Layout, Menu } from 'antd';
import Navbar from '../components/common/Navbar/Navbar';
import TaskManagement from '../components/tasks/TaskManagement';
import TaskFilter from '../components/tasks/TaskFilter';
import FilteredTaskList from '../components/lists/FilteredTaskList';
import AppFooter from '../components/common/Footer';
import dayjs from 'dayjs';
import Sidebar from '../components/common/Sidebar';
import { TaskContext } from '../context/TaskContext';
import './Dashboard.css';
import TaskCalendar from '../pages/Calendar';
import Schedule from '../pages/Schedule';



const { Content } = Layout;

const InfoCard = ({ title, value }) => (
  <div className="info-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("1");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const { tasks, loadTasks } = useContext(TaskContext);
  const [taskStats, setTaskStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0
  });

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    console.log("Tasks in dashboard:", tasks);
    const validTasks = tasks.filter(task => task && task.status);
    const completed = validTasks.filter(task => task.status === 'Tamamlandı').length;
    const pending = validTasks.filter(task => task.status === 'Beklemede').length;
    const inProgress = validTasks.filter(task => task.status === 'Devam Ediyor').length;

    setTaskStats({ completed, pending, inProgress });
  }, [tasks]);

  const handleMenuClick = ({ key }) => {
    setSelectedMenu(key);
  };

  const handleFilter = (selectedAssignees, dateRange) => {
    const filtered = tasks.filter((task) => {
      const assigneeMatch =
        selectedAssignees.length === 0 ||
        selectedAssignees.some((assignee) => task.assignees.includes(assignee));
      const dateMatch =
        dateRange.length === 0 ||
        (dayjs(task.startDate).isSameOrAfter(dateRange[0]) &&
          dayjs(task.endDate).isSameOrBefore(dateRange[1]));
      return assigneeMatch && dateMatch;
    });
    setFilteredTasks(filtered);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <Layout className="site-layout">
        <Navbar />
        <Content className="content-container">
          <Menu
            onClick={handleMenuClick}
            selectedKeys={[selectedMenu]}
            mode="horizontal"
            style={{ marginBottom: 24 }}
            items={[
              { key: "1", label: "Görevler" },
              { key: "4", label: "Görev Filtrele" },
            ]}
          />
          {selectedMenu === "1" && (
            <>
              <div className="info-cards">
                <InfoCard title="Tamamlanmış Görevler" value={taskStats.completed} />
                <InfoCard title="Bekleyen Görevler" value={taskStats.pending} />
                <InfoCard title="Devam Eden Görevler" value={taskStats.inProgress} />
              </div>
              <div id="tasks-section">
                <TaskManagement />
              </div>
            </>
          )}
          {selectedMenu === "4" && (
            <>
              <TaskFilter onFilter={handleFilter} />
              <FilteredTaskList tasks={filteredTasks} />
            </>
          )}
          <div className="calendar-schedule-container" style={{ marginTop: 24 }}>
            <h1 id="calendar-section" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2rem' }}>Takvim</h1>
            <TaskCalendar />
            <h1 id="schedule-section" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2rem', marginTop: '24px' }}>Çizelge</h1>
            <Schedule />
          </div>
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default Dashboard;
