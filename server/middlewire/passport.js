const passport = require('passport')  
const LocalStrategy = require('passport-local').Strategy
import db from '../routes/db'
const reqBody = {  
  usernameField: 'phone',
  passwordFieldord: 'password'
}

passport.use('local', new LocalStrategy(reqBody,
  function(phone, password, done) {
    let sql = `select * from user where phone = '${phone}' and password = '${password}'`
    db.query(sql, function(err, user) {
      if(err) {
        console.log(err)
        return done(err, false, {
          message: '服务器错误'
        })
      }
      if(user.length === 0) {
        console.log('不存在')
        return done(null, false, {mesage: '没有此用户'})
      } else {
        //console.log(JSON.parse(JSON.stringify(user)))
        let userName = JSON.parse(JSON.stringify(user))
        return done(null,userName[0])
      }
      // let user = JSON.stringify(user)
      // if (user.password != password) {
      //   console.log('密码匹配有误.');
      //   console.log(user)
      //   console.log(password)
      //   return done(null, false, {message: '密码匹配有误.'});
      // }
    
    })
  }
))
passport.serializeUser(function (user, done) {//保存user对象
  console.log(user.id)
  done(null, user.id);//可以通过数据库方式操作
});

passport.deserializeUser(function (userId, done) {//删除user对象
  db.query(`select * from user where id = '${userId}'`, function(err, user) {
    if(err) {
      return done(err);
    }
    done(null, user)
  })
});
passport.authenticateMiddleware = function authenticationMiddleware() {
  return function (req, res, next) {
    console.log(req.isAuthenticated())
    console.log(req.session)
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.json({
        status: 1,
        data: '没有登录'
      })
    }
    //res.redirect('/login');
  }
};
export default passport