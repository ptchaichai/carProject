const passport = require('passport')  
const LocalStrategy = require('passport-local').Strategy
import db from '../routes/db'
const reqBody = {  
  usernameField: 'phone',
  passwordFieldord: 'password',
  passReqToCallback: true
}
passport.serializeUser(function (user, done) {//保存user对象
  console.log('serializeUser', user.id)
  done(null, user.id);//可以通过数据库方式操作
});

passport.deserializeUser(function (id, done) {
  console.log('deserializeUser', id)
  db.query(`select * from user where id = '${id}'`, function(err, rows) {
    // if(err) {
    //   return done(err);
    // }
    console.log(user)
    done(err, rows)
  })
});

passport.use('local-login', new LocalStrategy(reqBody,
  function(req, phone, password, done) {
    let sql = `select * from user where phone = '${phone}' and password = '${password}'`
    console.log(sql)
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
        let userName = JSON.parse(JSON.stringify(user))
        console.log('登陆成功之后查找： ', userName[0])
        return done(null,userName[0])
      }
    
    })
  }
))

passport.authenticateMiddleware = function authenticationMiddleware() {
  return function (req, res, next) {
    console.log('登录后的session', req.session)
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.json({
        status: 1,
        data: '没有登录'
      })
    }
  }
};
export default passport