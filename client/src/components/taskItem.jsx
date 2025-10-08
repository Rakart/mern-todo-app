// client/src/components/taskItem.jsx

import React from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

//TaskItem receives the task object and a hangler functions as props
const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {

    // --- U: TOGGLE COMPLETION STATUS (PUT) ---
  const handleToggle = async () => {
    try {
      // 1. Determine the new status
      const newCompletedStatus = !task.completed;

      // 2. Send PUT request to update the task by ID
      const response = await axios.put(`${API_URL}/${task._id}`, {
        completed: newCompletedStatus,
      });

      // 3. Call the parent function to update the state with the new task data
      onTaskUpdated(response.data);

    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task status.");
    }
  };

    // --- DELETE: DELETE TASK (DELETE) ---
    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete: "${task.description}"?`)) {
            return;
          }
            try {
                await axios.delete(`${API_URL}/${task._id}`);
                onTaskDeleted(task._id);
            } catch (error) {
                console.error('Error deleting task:', error);
                alert('Failed to delete task. Check your server connection.');
            }
    };

    // Style the description text based on the completed status
    const taskStyle = {
        textDecoration: task.completed ? 'line-through' : 'none',
        marginRight: '15px',
        flexGrow: 1, // Allows the text to grow and fill the available space
        cursor: 'pointer',
    };

    // Format the creation date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    return (
        <li style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px dotted #ccc' }}>
            <div style={{ flexGrow: 1 }}>
                <span style={taskStyle} onClick={handleToggle}>
                    {task.description}
                </span>
                <div style={{ fontSize: '0.8em', color: '#666', marginTop: '2px' }}>
                    Created: {formatDate(task.createdAt)}
                </div>
            </div>
            <button onClick={handleDelete} style={{backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                Delete
            </button>
        </li>
    );
};

export default TaskItem;