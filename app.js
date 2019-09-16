/**
boilerplate - https://github.com/oguzhanoya/express-mvc-boilerplate
*/

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
const debug = require('debug')('myapp:app');

// config
const config = require('./config/config');

// passport config
require('./config/passport')(passport);

// database config
const db = require('./config/db').MongoURI;

// connect to database
mongoose.connect(db, { useNewUrlParser: true,  useUnifiedTopology: true })
  .then(() => { 
    console.log('MongoDB Connected...')
    app.listen(config.server.port, config.server.hostname, () => {
      debug(`App listening on ${config.server.hostname} port: ${config.server.port}`);
      app.emit('appStarted');
    });
  })
  .catch(err => console.error(err));

// view engine setup
// app.set('views', path.join(__dirname, 'app/views'));
// app.set('view engine', 'pug');

// app.use(express.static(__dirname, 'public'));
// app.use(bodyParser.urlencoded({extend:true}));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'app/views'));

// Require static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, 'app/views'));

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger(config.isProd ? 'combined' : 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(favicon(path.join(__dirname, 'public', 'favicon/favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  secret: 'awesome devoir',
  resave: true,
  saveUnitialized: true
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// bootstrap routes
require('./app/routes')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message; // eslint-disable-line no-param-reassign
  res.locals.error = config.isDev ? err : {}; // eslint-disable-line no-param-reassign
  // render the error page
  res.status(err.status || 500);
  res.render('error');
  console.log(err);
});

module.exports = app;
