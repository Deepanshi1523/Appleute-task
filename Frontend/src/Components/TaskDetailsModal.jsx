import React, { useState } from 'react';
import './TaskDetailsModalStyles.css';

const TaskDetailsModal = ({ task, onClose, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const formattedDate = new Date(editedTask.startTime).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });

  const formattedStartTime = new Date(editedTask.startTime).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const formattedEndTime = new Date(editedTask.endTime).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div className="task-details-modal">
      <div className="modal-content">
        <h2>Task Details</h2>
        {isEditing ? (
          <>
            {/* Editing mode form */}
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleInputChange}
            />
            <br />
            <label>Description:</label>
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleInputChange}
            />
            <br />
            <label>Start Time:</label>
            <input
              type="text"  // Adjust the input type as needed for your date format
              name="startTime"
              value={editedTask.startTime}
              onChange={handleInputChange}
            />
            <br />
            <label>End Time:</label>
            <input
              type="text"  // Adjust the input type as needed for your date format
              name="endTime"
              value={editedTask.endTime}
              onChange={handleInputChange}
            />
            <br />
            <button type="button" onClick={handleSaveClick}>
              Save
            </button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </>
        ) : (
          <>
            {/* Display mode */}
            <p>Title: {editedTask.title}</p>
            <p>Description: {editedTask.description}</p>
            <p>Date: {formattedDate}</p>
            <p>Time: {formattedStartTime} to {formattedEndTime}</p>
            <button type="button" onClick={onClose}>
              Close
            </button>
            <button type="button" onClick={handleEditClick}>
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetailsModal;
