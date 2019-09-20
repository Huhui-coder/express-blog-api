var express = require("express");
var jwt = require("jwt-simple"); //引入jwt中间件
const secret = 'hit'


var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/test", function (req, res, next) {
  res.json({
    code: 0,
    data: {
      name: "hit"
    },
    msg: "成功返回"
  });
});


router.post("/login", function (req, res, next) {
  let user = req.body;
  var expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
  let token = jwt.encode({//编码
    id: user.username,
    username: user.password
  }, secret);
  res.json({
    code: 0,
    data: {
      name: user.username,
      password: user.password,
      token: token,
      expires: expires
    },
    msg: "成功返回"
  });
});

// 用户校验 中间件
let auth = function(req, res, next){
  //post模拟时 添加Headers Authorization: Bearer token的值
  let authorization = req.headers['authorization']
  if(authorization) {
      let token = authorization.split(' ')[1];
      try {
          //看token是否合法，解码，如果串改过token就解不出来,进入异常页面
          let user = jwt.decode(token, secret);
          req.user = user;//后面就可以拿到user，中间件用法 
          next();//下一步
      } catch (error) {
          console.log(error)
          res.status(401).send('Not Allowed')
      }
  } else {
      res.status(401).send('Not Allowed');
  }
}


router.get('/order', auth, function(req,res,next){
  res.json({
      code: 0,
      data: {
          user: req.user
      }
  })
})
module.exports = router;
