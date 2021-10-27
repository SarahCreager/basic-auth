'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { User } = require('../model/index.js');

async function basicAuth(request, response, next){

  // decode auth header {authorization: Basic ABX787=a}
  if (!request.headers.authorization) {
    response.status(403);
    response.send('No Auth Headers');
  }

  let encodedUserPass = request.headers.authorization.split(' '); // ABX787=a
  let pop = encodedUserPass.pop();
  let decodedUserPass = base64.decode(pop); // jacob:password
  let [username] = decodedUserPass.split(':');
  
  // find user by username
  let userQuery = await User.findOne({ where: { username }});

  if (userQuery) {
    request.user = userQuery;
    // when do we need to call next??
    next();
  } else {
    response.status(403);
    response.send('Authentication Error');
  }
}

module.exports = basicAuth;