var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Article = require('../models/article')
require('../util/util')

//展示所有的文章
router.get('/',function(req,res,next){
    Article.find({},function (err,doc){
      if(err){
        res.json({
          code:'1',
          msg:err.message,
          data:{}
        });
      }else{
        res.json({
          code:'0',
          msg:'',
          data:doc
        });
      }
    })
  })
  //展示关键字搜索到列表
  router.get('/type',function(req,res,next){
    var keyword = req.param('keyword')
    Article.find({"type":{$regex:keyword}},function (err,doc){
      if(err){
        res.json({
          status:'1',
          msg:err.message
        });
      }else{
        res.json({
          code:'0',
          msg:'',
          data:doc
        })
      }
    })
  })
  //展示所有的分类列表
  router.get('/typeList',function(req,res,next){
    Article.find({},function (err,doc){
      let typeList = []
      doc.map((item)=>{
        typeList.push(item.type)
      })
      if(err){
        res.json({
          code:'1',
          msg:err.message,
          data:[]
        });
      }else{
        res.json({
          code:'0',
          msg:'',
          data:typeList
        });
      }
    })
  })
  //展示对应id的文章
  router.get('/detail',function(req,res,next){
    var articleId = req.param('articleId') 
    Article.find({articleId:articleId},function (err,doc){
      if(err){
        res.json({
          code:'1',
          msg:err.message
        });
      }else{
        res.json({
          code:'0',
          msg:'',
          data:doc
        });
      }
    })
  })
  //展示对应文章的所有评论
  router.get('/showcomment',function(req,res,next){
    //var userId = req.cookies.userId;
    var articleId = req.param('articleId');
  
    var userId = req.cookies.userId;
    var userrecive = [];
    //console.log(userId)
   
    User.find({},function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            if(doc){
                doc.forEach(item=>{
                    item.comment.forEach(item1 =>{
                      if(item1.articleId == articleId){
                        userrecive.push(item1.content)
                      }
                    })
                  })
                  res.json({
                    status:'0',
                    result:doc
                  })
            }
              }
            })
  })


module.exports = router;