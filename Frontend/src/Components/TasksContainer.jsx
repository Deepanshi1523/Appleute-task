import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TasksContainerStyles.css";
import TaskDetailsModal from "./TaskDetailsModal";

function TasksContainer({ searchTerm, setSearchTerm, onTaskClick }) {
  const [tasks, setTasks] = React.useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  

  useEffect(() => {
    // Fetch tasks from the backend when the component mounts
    axios
      .get("http://localhost:3001/events")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
    onTaskClick(task);
  };

  const formatDate = (dateString) => {
    try {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      const formattedDate = new Date(dateString).toLocaleDateString(
        undefined,
        options
      );
      return formattedDate;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  const formatTimeRange = (startTime, endTime) => {
    const formattedStartTime = new Date(startTime).toLocaleTimeString(
      undefined,
      {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }
    );

    const formattedEndTime = new Date(endTime).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${formattedStartTime} to ${formattedEndTime}`;
  };

  const handleDelete = (taskId) => {
    axios
      .delete(`http://localhost:3001/events/${taskId}`)
      .then((response) => {
        console.log(response.data.message);
        // Update the state to reflect the deletion
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const filteredTasks = tasks.filter((task) =>
  task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

const handleEditTask = (editedTask) => {
    // Find the index of the task to be edited
    const taskIndex = tasks.findIndex((task) => task.id === editedTask.id);

    // Update the tasks array with the edited task
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = editedTask;

    // Update the state to reflect the changes
    setTasks(updatedTasks);

    // Send an HTTP request to update the task on the server
    axios
      .put(`http://localhost:3001/events/${editedTask.id}`, editedTask)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  return (
    <div className="tasks-container">
      <h3 className="tasks">Tasks</h3>
      <input
        className="search"
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
      {filteredTasks.map((task, index) => (
          <li key={index} onClick={() => handleTaskClick(task)}>
            {task.mediaFile && (
              <img
                src={`http://localhost:3001/uploads/${task.mediaFile.filename}`}
                alt="Event Media"
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
            )}
            <strong>Title:</strong> <span className="title">{task.title}</span>{" "}
            <br />
            <strong>Description:</strong>{" "}
            <span className="description">{task.description}</span>
            <br />
            <strong>Date:</strong> {formatDate(task.startTime)} <br />
            <strong>Time:</strong>{" "}
            {formatTimeRange(task.startTime, task.endTime)} <br />
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
        {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onEdit={handleEditTask} 
        />
      )}
      </ul>
    </div>
  );
}

export default TasksContainer;
