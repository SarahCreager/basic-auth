'use strict';

const express = require('express');
const app = express();
// const { User } = require('./auth/model/index.js')

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

const signUpRouter = require('./auth/routes/userRoute.js');


// use a before Hook, runs before we create any user
// User.beforeCreate(async (user) => {
//   let encryptedPassword = await bcrypt.hash(user.password, 10);
//   user.password = encryptedPassword;
// });

// Routes
app.use('/', signUpRouter);


module.exports = {
  app,
  start: (PORT) => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)) 
  }
};

