//db.js
// 连接MySQL
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    // password: 'tt123456',
    password: 'root321',
    database: 'car',
    port: 3306
});
export default {
  //查询
  query: function (sql, callback) {
          pool.getConnection(function (err, connection) {
              if(err) console.log('MySQL数据库建立连接失败。');
              else {
                console.log('数据库建立连接成功。');
                connection.query(sql, function (err, rows) {
                  callback(err, rows);
                  connection.release();//释放链接
                });
              }
          });
        },
  //select和delete操作
  selsctDelete: (sql, callback) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        console.log('CONNECT ERROR:', err.message)
        callback(err, null, null)
      } else {
        conn.query(sql, function (err, rows, fields) {
          // 释放连接
          conn.release()
          // 事件驱动回调
          callback(err, rows, fields)
        })
      }
    })
  },
  //更新和插入操作
  updateInsert : function (sql, params, callback) {
    pool.getConnection(function (err, conn) {
      if (err) {
        console.log('CONNECT ERROR:', err.message)
        callback(err, null, null)
      } else {
        conn.query(sql, params, function (err, rows, fields) {
          // 释放连接
          conn.release()
          // 事件驱动回调
          callback(err, rows, fields)
        })
      }
    })
  }
}