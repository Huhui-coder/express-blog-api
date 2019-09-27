该项目是基于 vue+vue-router+vuex+vuetifyjs+express+mongoDB 搭建的个人博客系统，分为前端和后端两个部分。

前端地址：https://github.com/Huhui-coder/vue-blog-client

后端地址：https://github.com/Huhui-coder/express-blog-api

注意得启动 mongoDB 服务。

```
git clone git@github.com:Huhui-coder/express-blog-api.git
npm i
npm run start
```

- [√] 使用 jwt-simple，进行 JWT 权限验证
- [√] 构建 auth 权限验证中间件
- [√] 使用 mongoose 对 mongoDB 数据库进行增删查改
- [√] 完成 multer 文件上传中间件的使用
