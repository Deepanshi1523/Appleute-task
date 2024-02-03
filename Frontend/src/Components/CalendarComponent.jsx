import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventModal from './EventModal';
import Notification from './Notification';
import axios from 'axios';

import './CustomCalendarStyles.css';

function CalendarComponent({ tasks, setTasks, updateTasks }) {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the backend when the component mounts
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();

    // Check for events matching the current time every minute
    const intervalId = setInterval(checkEventTimes, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const checkEventTimes = () => {
    const currentTime = new Date();

    // Filter events that match the current time
    const matchingEvents = events.filter((event) => {
      const eventStartTime = new Date(event.startTime);
      return currentTime >= eventStartTime && currentTime < new Date(event.endTime);
    });

    if (matchingEvents.length > 0) {
      // Display the notification for the first matching event
      const eventData = matchingEvents[0];
      setShowNotification(true);

      // Implement your notification logic here (using Notification API)
      if (Notification.permission === 'granted') {
        new Notification(`Event: ${eventData.title}`, {
          body: `Starts at ${eventData.startTime}`,
        });
      }
    }
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  const handleNotificationSnooze = () => {
    // Implement snooze logic here (e.g., set a timer to check event times again in 5 mins)
    setTimeout(checkEventTimes, 300000); // 300000 milliseconds = 5 minutes
    setShowNotification(false);
  };

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
      {showNotification && (
        <Notification
          title="Event Notification"
          onClose={handleNotificationClose}
          onSnooze={handleNotificationSnooze}
        />
      )}

    </>
  );
}

export default CalendarComponent;
