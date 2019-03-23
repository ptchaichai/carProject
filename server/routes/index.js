var express = require('express');
var router = express.Router();
import db from './db'
/* GET home page. */
// router.get('/', function(req,res,next) {
//   res.render('index');
// })
// router.get('/user', function(req,res,next) {
//   res.render('user');
// })
// 登录
router.post('/api/login', function(req, res, next) {
  let params = req.body
  let sql = `select * from user where username = '${params.name}' and password = '${params.pwd}'` 
    db.query(sql, function(err, data){
    if(err) {
      res.json({
        status: 1,
        data: err.message
      })
    } else {
      res.cookie('user', params.name, {maxAge: 1000*60*60*2})
      //req.session.username = params.name 
      res.json({
        status: 0,
        data: '登陆成功'
      });
    }
  })

});
router.post('/api/check', function(req, res, next) {
  // console.log(decodeURI(res.req.headers.cookie.match(/SSEID=([^&]*)(\S|;|$)/g)[0].replace(/(SSEID=|;)/g, '')))
  // console.log(encodeURIComponent(req.cookies.SSEID))
  console.log(req.session)
  res.json({
    status: 0,
    data: '登录成功'
  })
});
// 注册
router.post('/api/logout', function(req,res,next){
  req.session.destroy(function(err){   //req.session.destroy() 销毁session
    if(err){
      console.log('退出登录失败')
    }
})
});
module.exports = router;
