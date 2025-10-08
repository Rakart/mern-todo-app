// client/src/components/taskForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

// Define the API URL
const API_URL = 'http://localhost:5000/api/tasks';

// TaskForm receives a prop (function) to call when a new task is added
const TaskForm = ({ onTaskAdded }) => {
    // State to hold the value of the input field (Controlled Component)
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // basic validation to ensure the description is not empty
        if (!description.trim()) {
            alert('Description is required');
            return;
        }

        try {
            const response = await axios.post(API_URL, { description });
            onTaskAdded(response.data);
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Failed to add task. Check your server connection.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="What needs to be done?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" style={{ padding: '10px' }}>
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
