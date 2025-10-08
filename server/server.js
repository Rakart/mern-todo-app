// server.js

// 1. Load Environment Variables (e.g., PORT)
require('dotenv').config();

// 2. Import Express
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

// 3. Initialize the Express App
const app = express();

// 4. Define the Port
// Use the PORT from .env, or default to 5000 if it's missing
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

//4.5 Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('🔌 Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

connectDB();

app.use(cors()); // to handle cross-origin requests
app.use(express.json()); // to handle JSON requests
app.use('/api/tasks', taskRoutes); // to handle all the routes in taskRoutes

// 5. Basic Middleware (to handle JSON requests)
// This is essential for handling POST and PUT requests later


// 6. Define a simple test route
app.get('/', (req, res) => {
  res.send('Task List API is running!');
});

// 7. Start the Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`Test URL: http://localhost:${PORT}`);
});