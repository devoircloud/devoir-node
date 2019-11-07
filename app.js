/**
boilerplate - https://github.com/oguzhanoya/express-mvc-boilerplate
*/

const express = require('express');
const formidable = require('express-formidable');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const debug = require('debug')('myapp:app');

// config
const config = require('./config/config');
  

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

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.multipart());
// app.use(favicon(path.join(__dirname, 'public', 'favicon/favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(formidable());

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
  res.send(err);
  console.log(err);
});

app.listen(config.server.port, config.server.hostname, () => {
    debug(`App listening on ${config.server.hostname} port: ${config.server.port}`);
    app.emit('appStarted');
  });

module.exports = app;
