var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/bill', (req, res) => {
  res.sendFile(path.join(__dirname, 'bill.html'));
});

app.get('/input_loading', (req, res) => {
  res.sendFile(path.join(__dirname, 'input_loading.html'));
});

app.get('/input_success', (req, res) => {
  res.sendFile(path.join(__dirname, 'input_success.html'));
});

app.get('/order_pay', (req, res) => {
  res.sendFile(path.join(__dirname, 'order_pay.html'));
});

app.get('/pay_success', (req, res) => {
  res.sendFile(path.join(__dirname, 'pay_success.html'));
});

app.get('/pay_wait', (req, res) => {
  res.sendFile(path.join(__dirname, 'pay_wait.html'));
});

app.get('/qrcode', (req, res) => {
  res.sendFile(path.join(__dirname, 'qrcode.html'));
});

app.get('/shop_home', (req, res) => {
  res.sendFile(path.join(__dirname, 'shop_home.html'));
});

app.get('/userId_form', (req, res) => {
  res.sendFile(path.join(__dirname, 'userId_form.html'));
});

app.get('/user_info', (req, res) => {
  res.sendFile(path.join(__dirname, 'userInfo.html'));
});

app.get("/option", (req, res) => {
  res.sendFile(path.join(__dirname, "option.html"))
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var io = require('socket.io')(2000);


io.on('connection', function (socket) {

  socket.on("commit_pay", function() {

    io.emit("commit_pay");
  });

  socket.on("commit_input", function() {

    console.log("commit_input")
    io.emit("commit_input");
  })
})



module.exports = app;
