/**
 *  Blokchainer interacts with blockchain to get the parameters of algorithm.
 *
 */

// const express = require('express');
// const bcrypt = require('bcryptjs');
// const passport = require('passport');

// const router = express.Router();

// const Todo = require('../models/todo');
// const User = require('../models/user');
// const Utils = require('../helpers/utils');

// const { ensureAuthenticated } = require('../../config/auth');

// get home page
router.get('/', (req, res, next) => {
  // generate a new name
  const name = Utils.randomString(5);

  // new todo model
  const newTodo = new Todo({ name, done: false });

  newTodo.save()
    .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    .catch((err) => { console.log(err); });

  console.log("\n\n\n\n\n\n");
  console.log(req.app.get('views'));

  res.render('index', { title: 'Express' });
});

// get register page
router.get('/register', (req, res, next) => {
  // generate a new name
  const name = Utils.randomString(5);

  // new todo model
  // const newTodo = new Todo({ name, done: false });

  // newTodo.save()
    // .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    // .catch((err) => { console.log(err); });

  res.render('register', { title: 'Express' });
});

module.exports = router;
