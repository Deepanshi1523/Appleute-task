import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventModal from './EventModal';

import './CustomCalendarStyles.css';

function CalendarComponent({ tasks, setTasks, updateTasks }) {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDateClick = (newDate) => {
    setDate(newDate);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const hasTasksForDate = (checkDate) => {
    return tasks.some((task) => {
      const taskDate = new Date(task.startTime);
      return taskDate.toDateString() === checkDate.toDateString();
    });
  };

  const tileClassName = ({ date }) => {
    return hasTasksForDate(date) ? 'task-highlight' : '';
  };

  return (
    <>
      <Calendar
        className="custom-calendar"
        onChange={handleDateClick}
        value={date}
        tileClassName={tileClassName}
      />
      {isModalOpen && <EventModal date={date} onClose={closeModal} tasks={tasks} setTasks={setTasks} updateTasks={updateTasks}/>}
    </>
  );
}

export default CalendarComponent;
