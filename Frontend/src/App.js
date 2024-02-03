import React, { useState } from 'react';
import CalendarComponent from './Components/CalendarComponent';
import TasksContainer from './Components/TasksContainer';
import TaskDetailsModal from "./Components/TaskDetailsModal";  // 

import './App.css';


function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState(null); 

  const handleTaskClick = (task) => {
    console.log('Task clicked:', task);
    setSelectedTask(task);
  };

  return (
    <div className="app-container">
      <h1 className="centered-h1">Task Scheduler</h1>
      <div className='scheduler-component'>
        <CalendarComponent 
          tasks={tasks} 
          setTasks={setTasks} 
          onTaskClick={handleTaskClick}/>
        <TasksContainer 
          tasks={tasks}
          setTasks={setTasks}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onTaskClick={handleTaskClick}/>
      </div>
    </div>
  );
}

export default App;
