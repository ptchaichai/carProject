const mysql = require('mysql');
const dbconfig = require('../config/database');
const connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
var userInfo = {
	role: '',
	id: ''
}
module.exports = function(app, passport) {
	/**
	 * 登录
	 */
	app.post('/api/login', function(req, res, next) {
		passport.authenticate('local-login',{session: true}, function(err, user, info) {
				if(err) {
					res.json({
						status: 1,
						data: err
					})
				} else if(info) {
					res.json({
						status: 1,
						data: info
					})
				} else {
					req.logIn(user, function(err) {
						if(err) {
							res.json({
								status: 1,
								data: err
							})
						} else {
							userInfo = {
								id: user.id,
								role: user.role
							}
							res.json({
								status: 0,
								data: user.role
							})
							console.log('此时的session', req.session)
						}
					})
				}
		})(req, res, next)
	})


	app.post('/api/check',isLoggedIn,function(req, res, next) {
		connection.query("SELECT * FROM user WHERE id = ?",[req.session.passport.user], function(err, rows){
			if(err) {
				res.json({
					status: 1,
					data: err
				})
			} else {
				userInfo = {
					role: rows[0].role,
					id: rows[0].id
				}
				res.json({
					status: 0,
					data: rows[0]
				})
			}
    });
	})


  //查看个人信息
	app.post('/api/getPerson',isLoggedIn,function(req, res, next) {
		let id =  userInfo.id || req.session.passport.user;
		connection.query("SELECT * FROM user WHERE id = ? ",[id], function(err, rows){
			if(err) {
				res.json({
					status: 1,
					data: err
				})
			} else {
				let data = {
					username: rows[0].username,
					role: rows[0].role,
					phone: rows[0].phone,
					sex: rows[0].sex, 
					time: rows[0].time, 
					idcard: rows[0].idcard,
					birthday: rows[0].birthday,
					email: rows[0].email,
					address: rows[0].address
				}
				res.json({
					status: 0,
					data: data
				})
			}
    });
	})

	//新增个人信息
	app.post('/api/get', isLoggedIn, function(){
		let id = req.session.passport.user || userInfo.id;

	})

	/**
	 * 增加个人信息
	 */
	app.post('/api/addSubordinate', isLoggedIn, function(req, res, next){

	})

	//根据权限获取列表
	app.post('/api/getPersonList', isLoggedIn, function(req, res, next){
		let id = req.session.passport.user || userInfo.id;
		if(req.body) {
			let param = req.body; //获取的参数
			let sql = '';
			let role = req.body.role || userInfo.role;
			let optionParams = [];
			if(param.page == -1) {
				optionParams = [];
				sql = role == 0 ? "SELECT username, phone, role, birthday, time, sex  FROM user" : "SELECT username, phone, role, birthday, time, sex FROM user where role = 2";
				connection.query(sql, function(err, rows){
					if(err) {
						res.json({
							status: 1,
							data: err
						})
					} else {
						res.json({
							status: 0,
							data: rows
						})
					}
				});
			} else {
			  let page= parseInt(param.page || 1); //页码
			  let end = parseInt(param.pageSize || 10); //页数
				let start = (page - 1) * end
				let search = {
					name: page.search_idx,
					value: page.search_value
				};
				//为了提高性能，就不放到一个sql语句了,并且不进行封装
				let countSql = role == 1 ? "SELECT COUNT(*) FROM  user where role = 2" : "SELECT COUNT(*) FROM  user"
				let totalCount = 0;
				connection.query(countSql, function(err, count){
					if(err) {
						res.json({
							status: 1,
							data: err
						})
					} else {
						totalCount = count;
						console.log(count)
						if(role == 1) {
							if(search.name == 'username') {
								sql = search.value ? "SELECT * FROM user order by time desc limit ?, ? where role = 2 and username like ?" : "SELECT *  FROM user ORDER BY time desc limit ?, ? where role = 2" 
								optionParams = search.value ? [start, end, `%${search.value}%`] : [start, end]
							} else if(search.name == 'sex') {
								sql = search.value ? "SELECT * FROM user order by time desc limit ?, ? where role = 2 and sex like ?" : "SELECT * FROM user order by time desc limit ?, ? where role = 2" 
								optionParams = search.value ? [start, end, `%${search.value}%`] : [start, end]
							} else if(search.name == 'phone') {
								sql = search.value ? "SELECT * FROM user order by time desc limit ?, ? where role = 2 and phone like ?" : "SELECT * FROM user order by time desc limit ?, ? where role = 2" 
								optionParams = search.value ? [start, end, `%${search.value}%`] : [start, end]
							}
						} else if(role == 0) {
							if(search.name == 'username') {
								sql = search.value ? "SELECT * FROM user order by time desc limit ?, ? where username like ?" : "SELECT *  FROM user order by time desc limit ?, ?" 
								optionParams = search.value ? [start, end, `%${search.value}%`] : [start, end]
							} else if(search.name == 'sex') {
								sql = search.value ? "SELECT * FROM user order by time desc limit ?, ? where sex like ?" : "SELECT * FROM user order by time desc limit ?, ?" 
								optionParams = search.value ? [start, end, `%${search.value}%`] : [start, end]
							} else if(search.name == 'phone') {
								sql = search.value ? "SELECT * FROM user order by time desc limit ?, ? where phone like ?" : "SELECT * FROM user order by time desc limit ?, ?" 
								optionParams = search.value ? [start, end, `%${search.value}%`] : [start, end]
							} else if(search.name == 'role') {
								sql = search.value ? "SELECT * FROM user order by time desc limit ?, ? where role like ?" : "SELECT * FROM user order by time desc limit ?, ?" 
								optionParams = search.value ? [start, end, `%${search.value}%`] : [start, end]
							}
						}
					}
					connection.query(sql, optionParams, function(err, rows){
						if(err) {
							res.json({
								status: 1,
								data: err
							})
						} else {
							res.json({
								status: 0,
								data: rows,
								count: totalCount,
								current_page: page
							})
						}
					})
				});
			}
		}
	})
	/**
	 * 登出
	 */
	app.get('/logout', function(req, res) {
		req.logout();
	});

// 判断是否登录的中间件
function isLoggedIn(req, res, next) {
	console.log('session', req.session)
	console.log('isAuthenticated', req.isAuthenticated())
	if (req.isAuthenticated()) return next();
	res.json({
		status: 2,
		data: '没有登录'
	})
}
}
