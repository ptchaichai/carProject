const mysql = require('mysql');
const dbconfig = require('../config/database');
const connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
var userInfo = {
	role: '',
	id: '',
	store_id: ''
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
								role: user.role,
								store_id: user.store_id,
								phone: user.phone
							}
							res.json({
								status: 0,
								data: {
									name: user.username,
									phone: user.phone,
									id: user.id,
									role: user.role,
									store_id: user.store_id
								}
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
					time: rows[0].add_time, 
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
	/**
	 * 增加经理和人员
	 */
	app.post('/api/addEmployee', isLoggedIn, function(req, res, next){
		if(req.body) {
			let param = req.body;
			connection.query(`SELECT id from user WHERE phone = ${param.phone}`,function(err, rows){
				if(err) {
					res.json({
						status: 1,
						data: err
					})
				} else {
					console.log(rows)
					if(rows.length > 0) {
						res.json({
						status : 1,
						data: '已经含有相同号码'
						})
					} else {
						let sql = `INSERT INTO user (username, password,role, phone, store_id, sex) VALUES ('${param.username}', '123456','${param.role}','${param.phone}', '${param.store_id}', 0)`;
						addOne(sql,res)
					}
				}
			})
		}
	})
  // 删除销售经理信息
	app.post('/api/delManager', isLoggedIn, function(req, res, next){
		if(req.body) {
			let param = req.body;
			let sql = `DELETE FROM user WHERE id=${param.id}`;
			deleteOne(sql,res)
		}
	})
	// 删除人员
	app.post('/api/delPerson', isLoggedIn, function(req, res, next){
		if(req.body) {
			let param = req.body;
			let sql = `DELETE FROM user WHERE id=${param.id}`;
			deleteOne(sql,res)
		}
	})
	//修改销售人员个人信息
	app.post('/api/updatePerson', isLoggedIn, function(req,res,next){
		if(req.body) {
			let param = req.body;
			let sql = `UPDATE user SET role=${param.role} and store_id=${+param.subarea} WHERE id=${param.id}`;
			addOne(sql,res)
		}
	})
	//修改销售经理个人信息
	app.post('/api/updateManager', isLoggedIn, function(req,res,next){
		if(req.body) {
			let param = req.body;
			let sql = `UPDATE user SET store_id=${+param.subarea} WHERE id=${param.id}`;
			addOne(sql,res)
		}
	})
	//获取销售经理列表
	app.post('/api/getManagerList', isLoggedIn, function(req, res, next){
		if(req.body) {
			let param = req.body; //获取的参数
			let sql = null;
			if(param.page == -1) {
				sql = "SELECT username, phone, role, birthday, time, sex FROM user where role = 1";
				findAll(sql, res);
			} else {
				let page= parseInt(param.page || 1); //页码
			  let end = parseInt(param.pageSize || 10); //页数
				let start = (page - 1) * end
				let search = {
					name: param.search_idx,
					value: param.search_value
				};
				//为了提高性能，就不放到一个sql语句了
				let countSql =  "SELECT COUNT(*) FROM  user where role = 1 "
				sql = search.value ? `SELECT * FROM user WHERE '%${search.name}%' LIKE '%${search.value}%' AND role = 1 ORDER BY add_time desc limit ${start}, ${end}` : `SELECT * FROM user WHERE role = 1 ORDER BY add_time desc limit ${start}, ${end}` 
				let allSql = {
					count: countSql,
					page: sql
				}
				pageNation(param, allSql, res)
			}	
		}
	})
	//根据获取销售人员列表
	app.post('/api/getPersonList', isLoggedIn, function(req, res, next){
		let id = req.session.passport.user || userInfo.id;
		if(req.body) {
			let param = req.body; //获取的参数
			let sql = null;
			let role = req.body.role || userInfo.role;		
			if(param.page == -1) {
				sql = role == 0 ? `SELECT *  FROM user where role = 2` : `SELECT * FROM user where role=2 and store_id=${param.store_id}`;
				findAll(sql, res);
			} else {
			  let page= parseInt(param.page || 1); //页码
			  let end = parseInt(param.pageSize || 10); //页数
				let start = (page - 1) * end
				let search = {
					name: param.search_idx,
					value: param.search_value
				};
				//为了提高性能，就不放到一个sql语句了
				let countSql = role == 1 ? `SELECT COUNT(*) FROM  user where role = 2 and store_id=${param.store_id}` : `SELECT COUNT(*) FROM  user WHERE role=2`
				if(role == 1) {
					sql = search.value ? `SELECT * FROM user WHERE '%${search.name}%' LIKE '%${search.value}%' AND role = 2 ORDER BY add_time desc limit ${start}, ${end}` : `SELECT * FROM user WHERE role=2 and store_id=${param.store_id} ORDER BY add_time desc limit ${start}, ${end}` 
				} else if(role == 0) {
					sql = search.value ? `SELECT * FROM user WHERE '%${search.name}%' LIKE '%${search.value}%' AND role = 2 ORDER BY add_time desc limit ${start}, ${end}` : `SELECT * FROM user WHERE role=2 ORDER BY add_time desc limit ${start}, ${end}`
				}
				let allSql = {
					count: countSql,
					page: sql
				}
				pageNation(param, allSql, res)
			}
		}
	})
	//获取汽车信息列表
	app.post('/api/getCarList', isLoggedIn, function(req, res, next){
		if(req.body) {
			let param = req.body; //获取的参数
			let sql = null;
			if(param.page == -1) {
				sql = "SELECT *  FROM car" ;
				findAll(sql, res);
			} else {
			  let page= parseInt(param.page || 1); //页码
			  let end = parseInt(param.pageSize || 10); //页数
				let start = (page - 1) * end
				let search = {
					name: param.search_idx,
					value: param.search_value
				};
				//为了提高性能，就不放到一个sql语句了
				let countSql = "SELECT COUNT(*) FROM  car" ;
				sql = search.value ? `SELECT * FROM car WHERE carname LIKE '%${search.value}%' ORDER BY add_time desc limit ${start}, ${end}`: `SELECT * FROM car ORDER BY add_time desc limit ${start}, ${end}`
				let allSql = {
					count: countSql,
					page: sql
				}
				pageNation(param, allSql, res)
			}
		}
	})
	//添加汽车
	app.post('/api/addCar', isLoggedIn, function(req, res, next){
		if(req.body) {
			let param = req.body;
		  let sql =	`UPDATE car SET carname='${param.carname}', shape='${param.shape}', color='${param.shape}', price='${param.price}', status='${param.status}' WHERE car_id='${param.car_id}'`
			addOne(sql,res)
		}
	})
	//添加公告
	app.post('/api/addAnnounce', isLoggedIn, function(req, res, next){
		if(req.body) {
			let param = req.body;
		  let sql =	`INSERT INTO announce (title, content, user_name, user_role, user_id) VALUES ('${param.title}', '${param.content}', '${param.username}', '${param.userrole}', '${param.userid}')`
			addOne(sql,res)
		}
	})
	app.post('/api/updateCar', isLoggedIn, function(req, res, next){
		if(req.body) {
			let param = req.body;
			connection.query(`SELECT car_id from car WHERE car_id = '${param.car_id}'`,function(err, rows){
				if(err) {
					res.json({
						status: 1,
						data: err
					})
				} else {
					console.log(rows)
					if(rows.length > 0) {
						res.json({
						status : 1,
						data: '车的编号重复'
						})
					} else {
						let sql = `INSERT INTO car (car_id, carname, shape, color, price, status) VALUES ('${param.car_id}','${param.carname}','${param.shape}','${param.color}','${param.price}',${param.status})`;
						addOne(sql,res)
					}
				}
			})
		}
	})
	//获取客户列表
	app.post('/api/getCustomList', isLoggedIn, function(req, res, next){
		if(req.body) {
			let param = req.body; //获取的参数
			let sql = null;
			if(param.page == -1) {
				sql = "SELECT *  FROM custom" ;
				findAll(sql, res);
			} else {
			  let page= parseInt(param.page || 1); //页码
			  let end = parseInt(param.pageSize || 10); //页数
				let start = (page - 1) * end
				let search = {
					name: param.search_idx,
					value: param.search_value
				};
				//为了提高性能，就不放到一个sql语句了
				let countSql = "SELECT COUNT(*) FROM  custom" ;
				sql = search.value ? `SELECT * FROM custom WHERE name LIKE '%${search.value}%' AND label = ${param.label} ORDER BY add_time desc limit ${start}, ${end}`: `SELECT * FROM custom WHERE label = ${param.label} ORDER BY add_time desc limit ${start}, ${end}`
				let allSql = {
					count: countSql,
					page: sql
				}
				pageNation(param, allSql, res)
			}
		}
	})
	//获取公告
	app.post('/api/getAnnounceList', isLoggedIn, function(req, res, next){
		if(req.body) {
			let param = req.body; //获取的参数
			let sql = null;
			if(param.page == -1) {
				sql = "SELECT *  FROM announce" ;
				findAll(sql, res);
			} else {
			  let page= parseInt(param.page || 1); //页码
			  let end = parseInt(param.pageSize || 10); //页数
				let start = (page - 1) * end
				let search = {
					name: param.search_idx,
					value: param.search_value
				};
				//为了提高性能，就不放到一个sql语句了
				let countSql = "SELECT COUNT(*) FROM  announce" ;
				sql = search.value ? `SELECT * FROM announce WHERE '%${search.name}%' LIKE '%${search.value}%' AND label = ${param.label} ORDER BY add_time desc limit ${start}, ${end}`: `SELECT * FROM announce WHERE label = ${param.label} ORDER BY add_time desc limit ${start}, ${end}`
				let allSql = {
					count: countSql,
					page: sql
				}
				pageNation(param, allSql, res)
			}
		}
	})
  //登出
	app.get('/logout', function(req, res) {
		req.logout();
	})
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
	/**
	 * 添加函数封装
	 */
	function addOne(sql,res){
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
					data: '添加成功'
				})
			}
		});
	}
	/**
	 * 修改函数封装
	 */
	function updateeOne(sql,res){
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
					data: '修改成功'
				})
			}
		});
	}
	/**
	 * 删除函数封装
	 */
	function deleteOne(sql,res){
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
					data: '删除成功'
				})
			}
		});
	}
}
