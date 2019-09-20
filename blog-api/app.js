var createError = require("http-errors");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var jwt = require("jwt-simple"); //引入jwt中间件
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var articleRouter = require("./routes/article");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//设置jwt密钥
app.set("jwtTokenSecret", "qwert569263082@!");

//配置body-parser中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');  //请求源
  res.header('Access-Control-Allow-Headers', '*');  //请求头
  res.header('Access-Control-Max-Age',600);  //请求时间
  res.header('Access-Control-Allow-Methods', '*');  //请求方法  
  res.header('Content-Type', 'application/json;charset=utf-8');
   
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});
  

app.all("/article", (req, res) => {
  // 获取token,这里默认是放在headers的authorization
  let token = req.headers.authorization;
  if (token) {
    let decoded = jwt.decode(token, app.get("jwtTokenSecret"));
    // 判断是否token已过期以及接收方是否为自己
    if (decoded.exp <= Date.now() || decoded.aud !== "hit") {
      res.sendStatus(401);
    } else {
      res.sendStatus(200);
    }
  } else {
    res.sendStatus(401);
  }
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/article", articleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
