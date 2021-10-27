'use strict';

const { User } = require('../model')

///bring in express router 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const basicAuth = require('./basicAuth.js');

const createUser = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await User.create(req.body);
    res.status(201);
    res.json(record);
  } catch (e){ 
    res.status(403).send(e); 
  }
};

const signInUser = async (req, res) => {
  try {
    res.status(200);
    res.send(req.user);
  } catch (error) { 
    res.status(403);
    res.send("Invalid Login"); 
  }
};

// routes 
router.post('/signin', basicAuth, signInUser);

router.post('/signup', createUser);

module.exports = router;