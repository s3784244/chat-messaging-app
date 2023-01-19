const express = require('express');
const cors = require('cors'); // Cross origin request

// Add routes for Sign In and Register
const authRoutes = require("./routes/auth.js");

// Create an instance of the express application
const app = express()
// Specify port
const PORT = process.env.PORT || 5000;

// Will allow us to call env variables in our node app
require('dotenv').config();

// Set up middleware
app.use(cors());
// Will allow us to pass json payloads to frontend to backend
app.use(express.json());
// This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded());

// Create route
// Request and response parameters
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('./auth', authRoutes);

// Listen to the backend that is running on a port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
