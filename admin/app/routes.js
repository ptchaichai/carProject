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
			let sql = null;
			let role = req.body.role || userInfo.role;
			let optionParams = [];
			
			if(param.page == -1) {
				optionParams = [];
				sql = role == 0 ? "SELECT username, phone, role, birthday, time, sex  FROM user" : "SELECT username, phone, role, birthday, time, sex FROM user where role = 2";
				findAll(sql, res);
			} else {
			  let page= parseInt(param.page || 1); //页码
			  let end = parseInt(param.pageSize || 10); //页数
				let start = (page - 1) * end
				let search = {
					name: param.search_idx,
					value: param.search_value
				};
				console.log(search.value)
				//为了提高性能，就不放到一个sql语句了
				let countSql = role == 1 ? "SELECT COUNT(*) FROM  user where role = 2 and pass" : "SELECT COUNT(*) FROM  user"
				// if(role == 1) {
				// 	if(search.name == 'username') {
				// 		sql = search.value ? "SELECT * FROM user order by time desc limit ?, ? where role = 2 and username like ?" : "SELECT *  FROM user ORDER BY time desc limit ?, ? where role = 2" 
				// 	} else if(search.name == 'sex') {
				// 		sql = search.value ? "SELECT * FROM user order by time desc limit ?, ? where role = 2 and sex like ?" : "SELECT * FROM user order by time desc limit ?, ? where role = 2" 
				// 	} else if(search.name == 'phone') {
				// 		sql = search.value ? "SELECT * FROM user order by time desc limit ?, ? where role = 2 and phone like ?" : "SELECT * FROM user order by time desc limit ?, ? where role = 2" 
				// 	}
				// } else if(role == 0) {
				// 	if(search.name == 'username') {
				// 		sql = search.value ? "SELECT * FROM user order by time desc limit ?, ? where username like ?" : "SELECT *  FROM user order by time desc limit ?, ?" 
				// 	} else if(search.name == 'sex') {
				// 		sql = search.value ? "SELECT * FROM user order by time desc limit ?, ? where sex like ?" : "SELECT * FROM user order by time desc limit ?, ?" 
				// 	} else if(search.name == 'phone') {
				// 		sql = search.value ? "SELECT * FROM user order by time desc limit ?, ? where phone like ?" : "SELECT * FROM user order by time desc limit ?, ?" 
				// 	} else if(search.name == 'role') {
				// 		sql = search.value ? "SELECT * FROM user order by time desc limit ?, ? where role like ?" : "SELECT * FROM user order by time desc limit ?, ?" 
				// 	}
				// }

				sql = {
					count: countSql,
					page: `SELECT * FROM user WHERE username LIKE '%${search.value}%' ORDER BY time desc limit ${start}, ${end}`
				}
				pageNation(param, sql, res)
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
	// console.log('session', req.session)
	// console.log('isAuthenticated', req.isAuthenticated())
	if (req.isAuthenticated()) return next();
	res.json({
		status: 2,
		data: '没有登录'
	})
}

/**
 * 获取列表所有数据
 * @param {*} sql 
 */
	function findAll(sql, res) {
		connection.query(sql, function(err, rows){
			if(err) {
				res.json({
					status: 1,
					data: err
				})
				return
			} else {
				res.json({
					status: 0,
					data: rows
				})
			}
		});
	}
  /**
	 * 分页函数封装
	 * @param 
	 */
	function pageNation(param, sql, res){
		let page= parseInt(param.page || 1); //页码
		let pageSize = parseInt(param.pageSize || 10); //页数
		connection.query(sql.count, function(err, count){
			if(err) {
				res.json({
					status: 1,
					data: err
				})
				return
			} else {
				let totalCount = JSON.parse(JSON.stringify(count[0])) || 0;
				connection.query(sql.page, function(err, rows){
					if(err) {
						res.json({
							status: 1,
							data: err
						})
						return
					} else {
						res.json({
							status: 0,
							count: totalCount['COUNT(*)'],
							current_page: page,
							total_page: Math.ceil(totalCount['COUNT(*)'] / pageSize),
							data: rows
						})
					}
				})
			}
		})
	}
}