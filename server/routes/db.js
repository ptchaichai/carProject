//db.js
// 连接MySQL
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'tt123456',
    database: 'car',
    port: 3306
});
// let sql = 'select * from user'
// pool.getConnection((err, connection) => {
//   if(err) {
//     console.log('MySQL数据库建立连接失败。');
//     console.log(err)
//   } else {
//     connection.query(sql, function (err, rows) {
//         for (var i in rows) {
//           console.log(rows[i]);
//         }
//         connection.release();//释放链接
//       });
//   }
// })
export default {
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
}