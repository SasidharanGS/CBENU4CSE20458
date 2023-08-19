const express = require('express');
const app = express();
const port = 3000; // Choose a port number

const trainsRoutes = require('./routes/trains'); // Import your routes module

// Use your routes
app.use('/trains', trainsRoutes);

// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to the Train Schedule API!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});





