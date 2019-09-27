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
  //对文章进行编辑
  router.post('/edit',function(req,res,next){
    console.log(req.body)
    let Aticle = req.body,
        articleId = Aticle.articleId,
        title = Aticle.title,
        content = Aticle.content,
        type = Aticle.type,
        time = Aticle.time;
    Article.find({articleId:articleId},function (err,doc){
      console.log(doc)
      doc[0].title = title
      doc[0].content = content
      doc[0].type = type
      doc[0].time = time
      doc[0].save((err,doc)=>{
      })
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
  //用户删除一篇文章
  router.get('/delect',function(req,res,next){
    var articleId =req.param('articleId');
    Article.remove({articleId:articleId},function (err,doc){
      if(err){
        res.json({
          code:'1',
          msg:'出现错误',
          data:{}
        })
      }else{
        res.json({
          code:'0',
          msg:'删除成功',
          data:{}
        })
      }
    })
  })



module.exports = router;