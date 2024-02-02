import React, { useState } from 'react';
import CalendarComponent from './Components/CalendarComponent';
import TasksContainer from './Components/TasksContainer';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="app-container">
      <h1 className="centered-h1">Task Scheduler</h1>
      <div className='scheduler-component'>
        <CalendarComponent tasks={tasks} setTasks={setTasks}/>
        <TasksContainer tasks={tasks} setTasks={setTasks} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
    </div>
  );
}

export default App;
