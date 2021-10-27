'use strict';

const express = require('express');
const app = express();
const userRoutes = require('./auth/routes/userRoute.js');
const cors = require('cors');
app.use(cors());

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', userRoutes);

module.exports = {
  app,
  start: (PORT) => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)) 
  }
};

