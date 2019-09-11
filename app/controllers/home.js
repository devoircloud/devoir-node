const express = require('express');

const router = express.Router();

const Todo = require('../models/todo');
const Utils = require('../helpers/utils');

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

// get login page
router.get('/login', (req, res, next) => {
  // generate a new name
  const name = Utils.randomString(5);

  // new todo model
  const newTodo = new Todo({ name, done: false });

  newTodo.save()
    .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    .catch((err) => { console.log(err); });

  res.render('register', { title: 'Express' });
});

// get plan selection page
router.get('/1-select-plan', (req, res, next) => {
  // generate a new name
  const name = Utils.randomString(5);

  // new todo model
  const newTodo = new Todo({ name, done: false });

  newTodo.save()
    .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    .catch((err) => { console.log(err); });

  res.render('1_plan', { title: '1/4 Select plan' });
});

// get server selection page
router.get('/2-select-server', (req, res, next) => {
  // generate a new name
  const name = Utils.randomString(5);

  // new todo model
  const newTodo = new Todo({ name, done: false });

  newTodo.save()
    .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    .catch((err) => { console.log(err); });

  res.render('2_server', { title: '2/4 Select plan' });
});

// get payment selection page
router.get('/3-select-algorithm', (req, res, next) => {
  // generate a new name
  const name = Utils.randomString(5);

  // new todo model
  const newTodo = new Todo({ name, done: false });

  newTodo.save()
    .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    .catch((err) => { console.log(err); });

  res.render('3_algorithm', { title: '3/4 Select plan' });
});

// get after payment page
router.get('/4-payment', (req, res, next) => {
  // generate a new name
  const name = Utils.randomString(5);

  // new todo model
  const newTodo = new Todo({ name, done: false });

  newTodo.save()
    .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    .catch((err) => { console.log(err); });

  res.render('4_payment', { title: '4/4 Payment' });
});


// get server selection page
router.get('/5-after-payment', (req, res, next) => {
  // generate a new name
  const name = Utils.randomString(5);

  // new todo model
  const newTodo = new Todo({ name, done: false });

  newTodo.save()
    .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    .catch((err) => { console.log(err); });

  res.render('5_after_payment', { title: 'After payment...' });
});


// get content manager page
router.get('/content-manager', (req, res, next) => {
  // generate a new name
  const name = Utils.randomString(5);

  // new todo model
  const newTodo = new Todo({ name, done: false });

  newTodo.save()
    .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    .catch((err) => { console.log(err); });

  res.render('manager_content', { title: 'Content Manager' });
});

// get server manager page
router.get('/server-manager', (req, res, next) => {
  // generate a new name
  const name = Utils.randomString(5);

  // new todo model
  const newTodo = new Todo({ name, done: false });

  newTodo.save()
    .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    .catch((err) => { console.log(err); });

  res.render('manager_server', { title: 'Servers Manager' });
});


// get algorithm manager page
router.get('/algorithm-manager', (req, res, next) => {
  // generate a new name
  const name = Utils.randomString(5);

  // new todo model
  const newTodo = new Todo({ name, done: false });

  newTodo.save()
    .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    .catch((err) => { console.log(err); });

  res.render('manager_algorithm', { title: 'Algorithms Manager' });
});


// get Domain Name manager page
router.get('/domain-name-manager', (req, res, next) => {
  // generate a new name
  const name = Utils.randomString(5);

  // new todo model
  const newTodo = new Todo({ name, done: false });

  newTodo.save()
    .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    .catch((err) => { console.log(err); });

  res.render('manager_domain_name', { title: 'Domain Names Manager' });
});

// get payments manager page
router.get('/payment-manager', (req, res, next) => {
  // generate a new name
  const name = Utils.randomString(5);

  // new todo model
  const newTodo = new Todo({ name, done: false });

  newTodo.save()
    .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    .catch((err) => { console.log(err); });

  res.render('manager_payment', { title: 'Payments Manager' });
});


// get stats page
router.get('/stats-manager', (req, res, next) => {
  // generate a new name
  const name = Utils.randomString(5);

  // new todo model
  const newTodo = new Todo({ name, done: false });

  newTodo.save()
    .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    .catch((err) => { console.log(err); });

  res.render('manager_stats', { title: 'Stats' });
});

// get settings page
router.get('/settings-manager', (req, res, next) => {
  // generate a new name
  const name = Utils.randomString(5);

  // new todo model
  const newTodo = new Todo({ name, done: false });

  newTodo.save()
    .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    .catch((err) => { console.log(err); });

  res.render('manager_settings', { title: 'Settings' });
});


module.exports = router;
