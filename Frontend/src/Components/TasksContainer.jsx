import React, { useEffect } from 'react';
import axios from 'axios'; // Add this line
import './TasksContainerStyles.css';

// ... (other imports and code)

function TasksContainer({ searchTerm, setSearchTerm }) {
  const [tasks, setTasks] = React.useState([]);

  useEffect(() => {
    // Fetch tasks from the backend when the component mounts
    axios.get('http://localhost:3001/events')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
      return formattedDate;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const handleDelete = (taskId) => {
    axios.delete(`http://localhost:3001/events/${taskId}`)
      .then(response => {
        console.log(response.data.message);
        // Update the state to reflect the deletion
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };


  return (
    <div className="tasks-container">
      <h3 className='tasks'>Tasks</h3>
      <input
        className='search'
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.mediaFile && (
              <img
                src={`http://localhost:3001/uploads/${task.mediaFile.filename}`}
                alt="Event Media"
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
            )}
            <strong>Title:</strong> {task.title} <br />
            {console.log(task.title)}
            <strong className='description'>Description:</strong> {task.description} <br />
            <strong>Date:</strong> {formatDate(task.startTime)} <br />
            <strong>Time:</strong> {task.startTime} to {task.endTime} <br />
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TasksContainer;