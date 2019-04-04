var express = require('express');
var router = express.Router();
import db from './db'
import requireLogin from '../middlewire/login'
import passport from '../middlewire/passport'
/* GET home page. */
// 登录
// router.post('/api/login', function(req, res, next) {
//   let params = req.body
//   // let sql = `select * from user where username = '${params.name}' and password = '${params.pwd}' and role = '${params.role}'`
//     db.query(sql, function(err, data){
//     if(err) {
//       res.json({
//         status: 1,
//         data: err.message
//       })
//     } else {
//       req.session.user = params.name 
//       res.json({
//         status: 0,
//         data: '登陆成功'
//       });
//     }
//   })
// });
router.post('/api/login', passport.authenticate('local', {session: true}), function(req, res) {
  console.log("-------req.user-----------");
  // console.log(req);
  console.log("-------req.user-----------");
  if(req.user) {
    res.json({
      status: 0,
      data: '登录成功'
    })
  }

})
router.post('/api/check',passport.authenticateMiddleware(),function(req, res, next) {
  res.json({
    status: 0,
    data: '验证成功'
  })
  // console.log(decodeURI(res.req.headers.cookie.match(/SSEID=([^&]*)(\S|;|$)/g)[0].replace(/(SSEID=|;)/g, '')))
  // console.log(encodeURIComponent(req.cookies.SSEID)
  // if(req.isAuthenticated()) {
  //   res.json({
  //     status: 2,
  //     data: '请先进行登录'
  //   })
  // } else {
  //    res.json({
  //     status: 0,
  //     data: '登录成功'
  //   })
  // }
});
// 注册
router.post('/api/logout',passport.authenticateMiddleware(), function(req,res,next){
  req.session.destroy(function(err){   //req.session.destroy() 销毁session
    if(err){
      console.log('退出登录失败')
    } else {
      console.log('退出登录成功')
    }
})
});
module.exports = router;
