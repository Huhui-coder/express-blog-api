var express = require("express");
var router = express.Router();
var User = require("../models/user");
var jwt = require("jwt-simple"); //引入jwt中间件
var Article = require('../models/article')

const secret = "hit";
require("../util/util");

router.get("/test", function(req, res, next) {
  res.json({
    code: 0,
    data: {
      name: "hit"
    },
    msg: "成功返回"
  });
});

//用户登陆
router.post("/login", function(req, res, next) {
  let user = req.body;
  User.find({ userName: user.userName, userPwd: user.userPwd }, (err, userInfo) => {
    if (err) {
      res.json({
        code: 1,
        msg: err.message,
        data: {}
      });
    } else {
      if (userInfo.length != 0) {
        var expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
        let token = jwt.encode(
          {
            //编码
            id: user.username,
            username: user.password
          },
          secret
        );
        res.json({
          code: 0,
          data: {
            name: userInfo[0].userName,
            id:userInfo[0].userId,
            token: token,
            expires: expires
          },
          msg: "成功返回"
        });
      } else {
        res.json({
          code: 1,
          data: {},
          msg: "账号密码错误"
        });
      }
    }
  });
});

//用户注册
router.post("/register", function(req, res, next) {
  let user = req.body;
  var r1 = Math.floor(Math.random() * 10);
  var r2 = Math.floor(Math.random() * 10);
  var sysDate = new Date().Format("yyyyMMddhhmmss");
  var userId = r1 + r2 + sysDate;
  var userName = user.userName;
  var userPwd = user.userPwd;
  var params = {
    userId: userId,
    userName: userName,
    userPwd: userPwd
  };

  User.find({ userName: userName }, function(err, doc) {
    if (doc.length != 0) {
      res.json({
        status: "1",
        msg: "用户已注册"
      });
    } else {
      var registerUser = new User(params);
      registerUser.save(function() {
        res.json({
          code: "0",
          msg: "注册成功",
          data: {
            userId: userId,
            registerUser: registerUser.userName,
            userId: registerUser.userId
          }
        });
      });
    }
  });
});

//用户发表新文章
router.get('/addArticle',function(req,res,next){
  var r1 = Math.floor(Math.random()*10);
  var r2 = Math.floor(Math.random()*10);
  var sysDate = new Date().Format('yyyyMMddhhmmss');
  var this_Date = new Date().Format('yyyy-MM-dd hh:mm:ss');
  var articleId = r1+r2+sysDate;
  var userId = req.param('userId');
  if(!userId){
    res.json({
      status:'1',
      msg:'请先登陆..'
    })
  }else{
    var AddAricle = new Article({
      "articleId":articleId,
      "userId":req.param('userId'),
      "title":req.param('title'),
      "content":req.param('content'),
      "type":req.param('type'),
      "collectnum":'0',
      "likenum":'0',
      "viewsnum":'0',
      "time": this_Date
  })
  AddAricle.save(function (){
      res.json({
          code:'0',
          msg:'发帖成功',
          data:AddAricle
      })
  })

  }

 
});

// 用户校验 中间件
let auth = function(req, res, next) {
  //post模拟时 添加Headers Authorization: Bearer token的值
  let authorization = req.headers["authorization"];
  if (authorization) {
    let token = authorization.split(" ")[1];
    try {
      //看token是否合法，解码，如果串改过token就解不出来,进入异常页面
      let user = jwt.decode(token, secret);
      req.user = user; //后面就可以拿到user，中间件用法
      next(); //下一步
    } catch (error) {
      console.log(error);
      res.status(401).send("Not Allowed");
    }
  } else {
    res.status(401).send("Not Allowed");
  }
};

router.get("/order", auth, function(req, res, next) {
  res.json({
    code: 0,
    data: {
      user: req.user
    }
  });
});
module.exports = router;
