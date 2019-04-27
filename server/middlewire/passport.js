// const passport = require('passport')  
// const LocalStrategy = require('passport-local').Strategy
// import db from '../routes/db'
// const reqBody = {  
//   usernameField: 'phone',
//   passwordFieldord: 'password',
//   passReqToCallback: true
// }
// passport.serializeUser(function (user, done) {//保存user对象
//   console.log('serializeUser', user.id)
//   done(null, user.id);//可以通过数据库方式操作
// });

// passport.deserializeUser(function (id, done) {
//   console.log('deserializeUser', id)
//   db.query(`select * from user where id = '${id}'`, function(err, rows) {
//     // if(err) {
//     //   return done(err);
//     // }
//     console.log(user)
//     done(err, rows[0])
//   })
// });

// passport.use('local-login', new LocalStrategy(reqBody,
//   function(req, phone, password, done) {
//     let sql = `select * from user where phone = '${phone}' and password = '${password}'`
//     console.log(sql)
//     db.query(sql, function(err, user) {
//       if(err) {
//         console.log(err)
//         return done(err, false, {
//           message: '服务器错误'
//         })
//       }
//       if(user.length === 0) {
//         console.log('不存在')
//         return done(null, false, {mesage: '没有此用户'})
//       } else {
//         let userName = JSON.parse(JSON.stringify(user))
//         console.log('登陆成功之后查找： ', userName[0])
//         return done(null,userName[0])
//       }
    
//     })
//   }
// ))

// passport.authenticateMiddleware = function authenticationMiddleware() {
//   return function (req, res, next) {
//     console.log('登录后的session', req.session)
//     if (req.isAuthenticated()) {
//       return next();
//     } else {
//       res.json({
//         status: 1,
//         data: '没有登录'
//       })
//     }
//   }
// };
// export default passport
// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log('deserializeUser', id)
        connection.query("SELECT * FROM user WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    // passport.use(
    //     'local-signup',
    //     new LocalStrategy({
    //         // by default, local strategy uses username and password, we will override with email
    //         usernameField : 'phone',
    //         passwordField : 'password',
    //         passReqToCallback : true // allows us to pass back the entire request to the callback
    //     },
    //     function(req, username, password, done) {
    //         // find a user whose email is the same as the forms email
    //         // we are checking to see if the user trying to login already exists
    //         connection.query("SELECT * FROM user WHERE phone = ?",[phone], function(err, rows) {
    //             if (err)
    //                 return done(err);
    //             if (rows.length) {
    //                 return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
    //             } else {
    //                 // if there is no user with that username
    //                 // create the user
    //                 var newUserMysql = {
    //                     username: phone,
    //                     password: password  // use the generateHash function in our user model
    //                 };

    //                 var insertQuery = "INSERT INTO user ( username, password ) values (?,?)";

    //                 connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],function(err, rows) {
    //                     newUserMysql.id = rows.insertId;

    //                     return done(null, newUserMysql);
    //                 });
    //             }
    //         });
    //     })
    // );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'phone',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, phone, password, done) { // callback with email and password from our form
            connection.query("SELECT * FROM user WHERE phone = ?",[phone], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!rows[0].password)
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};
