const mongoose = require('mongoose');

//Define the structure of the task document
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Task description is required'],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

// Create the model (Mongoose uses the model name 'Task' to find the collection named 'tasks' in MongoDB)
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;