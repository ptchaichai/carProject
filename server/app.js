var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');//这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
var logger = require('morgan');
var ejs = require('ejs');
var indexRouter = require('./routes/index');
const cookieSession = require('express-session');
const passport = require('passport')
const bodyParser = require("body-parser");
const redis = require('redis');
const RedisStore = require('connect-redis')(cookieSession);
var app = express(); //生成一个express实例 app

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('consolidate').handlebars);
// app.set('view engine', 'jade');
// 修改默认引擎为html
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 创建Redis客户端
var redisClient = redis.createClient(6379, '127.0.0.1');
// 初始化中间件，传入的第一个参数为singed secret
// app.use(cookieParser());
app.use(cookieSession({
  store: new RedisStore({client: redisClient}),
  //session的秘钥，防止session劫持。 这个秘钥会被循环使用，秘钥越长，数量越多，破解难度越高。
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  //session过期时间，不易太长。php默认20分钟
  cookie : {
    maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒,
    secure: false
  },
  name: 'ssid',
  unset: 'keep' ,
}))
app.use(passport.initialize())  
app.use(passport.session())  
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use(function (req, res, next) {
//   if (!req.session && req.session.user) {
//     res.json({
//       status: 2,
//       data: '请重新登录'
//     })
//   }
//   next() // otherwise continue
// })
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");//项目上线后改成页面的地址 
  res.header("Access-Control-Allow-Credentials", true);//处理cookie信息，如果有，并且不对每次请求都新开一个session
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type"); 
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
})
module.exports = app;
