import React, { useContext, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TaskContext } from '../context/TaskContext';
import './Calendar.css'; // CSS dosyasını içe aktar

const TaskCalendar = () => {
  const { tasks, loadTasks } = useContext(TaskContext);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const events = tasks.map(task => ({
    title: task.name,
    start: task.startDate,
    end: task.endDate,
    description: task.description
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek" 
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      events={events}
      locale="tr" 
      nowIndicator={true} 
      businessHours={{ 
        daysOfWeek: [1, 2, 3, 4, 5, 6 ,7], 
        startTime: '00:00', 
        endTime: '24:00',
      }}
      slotMinTime="00:00:00"
      slotMaxTime="24:00:00" 
      eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }} 
      now={new Date().toISOString()} 
    />
  );
};

export default TaskCalendar;
