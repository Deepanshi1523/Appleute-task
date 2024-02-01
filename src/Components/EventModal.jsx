import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import './EventModalStyles.css'; // Import your custom styles

function EventModal({ date, onClose, tasks, setTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('12:00'); 
  const [endTime, setEndTime] = useState('13:00');
  const [mediaFile, setMediaFile] = useState(null);
  const [warning, setWarning] = useState('');

  const handleSubmit = () => {
    if (compareTimes(startTime, endTime) === 1) {
      setWarning('Start time must be less than end time.');
      return;
    }
    if (!title.trim()) {
      setWarning('Title is required.');
      return;
    }
    // Clear the warning if the condition is met
    setWarning('');
    const newTask = {
      title,
      description,
      startTime,
      endTime,
    };
    // Clear form inputs
    setTasks([...tasks, newTask]);
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

  return (
    <div className="event-modal">
    <div className='modal-content'>
        <h2>Add Event</h2>
        <p>Date: {date.toDateString()}</p>
        <form className='form-div'>
          <div className='event-header'>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}  className='input-div title'/>

            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='input-div'/>
          </div>

          <div className='event-duration'>
            <label>Start Time:
              <TimePicker
                onChange={(newTime) => setStartTime(newTime)}
                value={startTime}
                format="HH:mm"
                clearIcon={null}
                disableClock
              />
            </label>
            <label>End Time:
              <TimePicker
                onChange={(newTime) => setEndTime(newTime)}
                value={endTime}
                format="HH:mm"
                clearIcon={null}
                disableClock 
              />
            </label>
          </div>

          {warning && <div className="warning">{warning}</div>}

          <div className='media-div'>
            <label>Media (Picture/Video) : </label>
            <input type="file" onChange={(e) => setMediaFile(e.target.files[0])} />
          </div>

          <div className='event-buttons'>
            <button type="button" className='save' onClick={handleSubmit}>
              Save
            </button>
            <button type="button" className='cancel' onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal;
