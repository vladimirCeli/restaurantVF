var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session= require('express-session');
var app = express();
var mongoose= require('mongoose');
var flash= require('connect-flash');


// database//
const  database  = {URI: process.env.URI}
mongoose.connect(database.URI, {useUnifiedTopology: true,useNewUrlParser: true    
})
.then(db => console.log('base de datos conectada'))
.catch(err => console.log(err));


// Middelwares
app.use(session({
    secret: 'restorantesession',
    resave: false,
    saveUnitialized: false
})); //
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use(require(usersRouter));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
