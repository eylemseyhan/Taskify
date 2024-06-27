import React, { useContext, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/tr';  // Türkçe yerelleştirme
import { TaskContext } from '../context/TaskContext';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

moment.locale('tr');  // moment kütüphanesini Türkçe olarak ayarlayın

const localizer = momentLocalizer(moment);

const TaskCalendar = () => {
  const { tasks, loadTasks } = useContext(TaskContext);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const events = tasks.map(task => ({
    title: task.name,
    start: new Date(task.startDate),
    end: new Date(task.endDate),
    desc: task.description,
  }));

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={{ month: true, week: true }}
        defaultView={Views.MONTH}
        popup={true}
        toolbar={true}
        messages={{
          allDay: 'Tüm gün',
          previous: 'Geri',
          next: 'İleri',
          today: 'Bugün',
          month: 'Ay',
          week: 'Hafta',
          day: 'Gün',
          agenda: 'Ajanda',
          date: 'Tarih',
          time: 'Zaman',
          event: 'Etkinlik',
          noEventsInRange: 'Bu aralıkta etkinlik yok.',
          showMore: total => `+${total} daha fazla`
        }}
        components={{
          event: ({ event }) => (
            <span>
              <strong>{event.title}</strong>
              {event.desc && ': ' + event.desc}
            </span>
          )
        }}
      />
    </div>
  );
};

export default TaskCalendar;
