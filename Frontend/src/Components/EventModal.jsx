import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import axios from 'axios';
import './EventModalStyles.css';

const EventModal = ({ date, onClose, tasks, setTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('13:00');
  const [mediaFile, setMediaFile] = useState(null);
  const [warning, setWarning] = useState('');

  const handleSubmit = async () => {
    if (compareTimes(startTime, endTime) === 1) {
      setWarning('Start time must be less than end time.');
      return;
    }
    if (!title.trim()) {
      setWarning('Title is required.');
      return;
    }

    // Check if the selected date is in the past
    const currentDate = new Date();
    const selectedDateTime = new Date(`${date.toDateString()} ${startTime}`);
    if (selectedDateTime < currentDate) {
      setWarning('Cannot add tasks for past dates.');
      return;
    }

    // Clear the warning if the condition is met
    setWarning('');

    const formData = new FormData();
    formData.append('startTime', selectedDateTime.toISOString());
    formData.append('title', title);
    formData.append('description', description);
    // formData.append('startTime', startTime);
    formData.append('endTime', endTime);
    formData.append('mediaFile', mediaFile);

    try {
      const response = await axios.post('http://localhost:3001/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);

      // Update tasks by calling the function passed from App.js
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error('Error adding event:', error);
    }

    // Clear form inputs
    setTitle('');
    setDescription('');
    setStartTime('12:00');
    setEndTime('13:00');
    setMediaFile(null);
    onClose();
  };
  const compareTimes = (time1, time2) => {
    // Helper function to compare two time strings
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    if (hours1 < hours2) {
      return -1;
    } else if (hours1 > hours2) {
      return 1;
    } else if (minutes1 < minutes2) {
      return -1;
    } else if (minutes1 > minutes2) {
      return 1;
    } else {
      return 0;
    }
  };

  const formattedDate = date instanceof Date ? date.toLocaleString() : '';

  return (
    <div className="event-modal">
      <div className="modal-content">
        <h2>Add Event</h2>
        <p>Date: {date ? date.toLocaleDateString() : ''}</p>
        <form className="form-div">
          <div className="event-header">
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input-div title" />

            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-div"
            />
          </div>

          <div className="event-duration">
            <label>
              Start Time:
              <TimePicker
                onChange={(newTime) => setStartTime(newTime)}
                value={startTime}
                format="HH:mm"
                clearIcon={null}
                disableClock
              />
            </label>
            <label>
              End Time:
              <TimePicker
                onChange={(newTime) => setEndTime(newTime)}
                value={endTime}
                format="HH:mm"
                clearIcon={null}
                disableClock
              />
            </label>
          </div>

          <div className="media-div">
            <label>Media (Picture/Video) : </label>
            <input type="file" onChange={(e) => setMediaFile(e.target.files[0])} />
          </div>

          {warning && <div className="warning">{warning}</div>}

          <div className="event-buttons">
            <button type="button" className="save" onClick={handleSubmit}>
              Save
            </button>
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
