/*
 * @Descripttion:
 * @Author: sjq
 * @Date: 2020-05-30 15:01:41
 * @LastEditors: sjq
 * @LastEditTime: 2020-05-30 15:02:18
 */
var mysql = require("mysql");
var option = {
  host: "localhost",
  port: "3306",
  database: "my_db",
  user: "root",
  password: "123321",
};
var query = function (sql, params, callback) {
  var conn = mysql.createConnection(option);
  conn.connect(function (err) {
    if (err) {
      callback(qerr, null, null);
    } else {
      conn.query(sql, params, function (qerr, vals, fields) {
        //释放连接
        conn.end();
        //事件驱动回调
        callback(qerr, vals, fields);
      });
    }
  });
};
module.exports = query;