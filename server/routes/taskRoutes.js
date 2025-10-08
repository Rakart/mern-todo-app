// server/routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // import the Task model

// All routes will go here
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { description } = req.body;

    // Basic Validation

    if (!description) {
        return res.status(400).json({ message: 'Description is required' });
    }

    const newTask = new Task({ description });

    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/tasks/:id - Update task (e.g. mark as completed)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            // $set is used to update the field
            { $set: { completed: completed } },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

