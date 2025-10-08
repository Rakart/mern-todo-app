// client/src/App.jsx

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/taskForm';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  // State variables
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError("Failed to load tasks. Check your server connection.");
      setLoading(false);
    }
  };

  // Function to handle adding a new task
  const handleTaskAdded = (newTask) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  // useEffect to run fetchTasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className='todo-app-container'>
      <h1>MERN To-Do List</h1>
      
      {/* TASK FORM (placeholder) */}
      <div className='task-form-container'>
        <TaskForm onTaskAdded={handleTaskAdded} />
      </div>

      <hr />
      
      {/* TASK LIST (placeholder) */}
      <div className='task-list-container'>
        <h2>Open Tasks: ({tasks.length})</h2>
        {tasks.length === 0 ? (
          <p>No open tasks, add one above!</p>
        ) : (
          <ul>
            {tasks.map(task => (
              <li key={task._id}>
                {task.description} - Status: {task.completed ? '✅' : '❌'}
              </li>
            ))}
          </ul>
      
        )}
      </div>
    </div>
  );
}

export default App;