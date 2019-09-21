var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "collect":[{
    "articleId":String
    }],
    "like":[{
    "articleId":String
    }],
    "comment":[{
    "articleId":String,
    "content":String,
    "time":String
    }]
});

module.exports = mongoose.model("User",userSchema);