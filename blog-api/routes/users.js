var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req, res, next) {
  res.json({
    code:0,
    data:{
      name:'hit'
    },
    msg:'成功返回'
  })
});

module.exports = router;
