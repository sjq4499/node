/*
 * @Descripttion:
 * @Author: sjq
 * @Date: 2020-05-30 15:00:52
 * @LastEditors: sjq
 * @LastEditTime: 2020-06-01 11:30:11
 */

var query = require("../doc/mysql.js");
var userService = function (method, reqData, postData, returnData) {
  switch (method) {
    case "login":
      var { username, password } = postData;
      query("select * from user where username=? ", [username], function (
        err,
        results,
        fields
      ) {
        if (err) {
          returnHandle(err, results, returnData, "执行数据操作失败", 0);
        } else {
          if (results.length === 0) {
            returnHandle(err, results, returnData, "账号未注册", 0);
          } else {
            query(
              "select * from user where username=? and password=? ",
              [username, password],
              function (err, results, fields) {
                if (err) {
                  returnHandle(err, results, returnData, "执行数据操作失败", 0);
                } else {
                  if (results.length === 0) {
                    returnHandle(err, results, returnData, "密码错误", 0);
                  } else {
                    returnHandle(err, results, returnData, "登录成功", 1);
                  }
                }
              }
            );
          }
        }
      });
      break;
    case "register":
      var { userSex, username, password, userEmail, userBasicInfo } = postData;
      query("select * from user where username=? ", [username], function (
        err,
        results,
        fields
      ) {
        if (err) {
          returnHandle(err, results, returnData, "执行数据操作失败", 0);
        } else {
          if (results.length > 0) {
            returnHandle(err, results, returnData, "账号已注册", 0);
          } else {
            query(
              "insert into  user (username,password,userSex,userEmail,userBasicInfo) values (?,?,?,?,?) ",
              [username, password, userSex, userEmail, userBasicInfo],
              function (err, results, fields) {
                if (err) {
                  returnHandle(err, results, returnData, "sql错误", 0);
                } else {
                  returnHandle(err, results, returnData, "注册成功", 1);
                }
              }
            );
          }
        }
      });
      break;

    default:
      returnData(
        null,
        JSON.stringify({ message: "请求方法错误", status: "failure" }),
        200
      );
      break;
  }

  function returnHandle(err, results, returnData, msg, code) {
    if (err) {
      returnData(
        JSON.stringify({
          code,
          message: msg,
          status: "failure",
        }),
        200
      );
    } else {
      returnData(
        JSON.stringify({
          code,
          message: msg,
          status: "success",
          result: results,
        }),
        200
      );
    }
  }
};
module.exports = userService;
