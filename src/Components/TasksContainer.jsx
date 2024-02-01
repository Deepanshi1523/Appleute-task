import React from 'react';
import './TasksContainerStyles.css'

function TasksContainer({ tasks, searchTerm, setSearchTerm }) {
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
            <strong>{task.title}</strong> - {task.startTime} to {task.endTime}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TasksContainer;
