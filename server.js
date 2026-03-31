const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Assuming routes are defined in 'routes' directory

// Create the Express application
const app = express();

// Connect to MongoDB (update the connection string accordingly)
mongoose.connect('mongodb://localhost:27017/pdf-converter', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Initialize routes
app.use('/api', routes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
