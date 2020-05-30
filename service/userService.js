/*
 * @Descripttion:
 * @Author: sjq
 * @Date: 2020-05-30 15:00:52
 * @LastEditors: sjq
 * @LastEditTime: 2020-05-30 15:40:11
 */

var query = require("../doc/mysql.js");
var userService = function (method, reqData, postData, returnData) {
  switch (method) {
    case "find":
      query("select * from user", [], function (err, results, fields) {
        console.log(err);
        returnHandle(err, results, returnData);
      });
      break;
    case "up":
      query(
        "insert into  product(no,name,type,price,pic,num) values(?,?,?,?,?,?)",
        [
          postData.no,
          postData.name,
          postData.type,
          postData.price,
          postData.filename,
          postData.num,
        ],
        function (err, results, fields) {
          returnHandle(err, results, returnData);
        }
      );
      break;
    default:
      returnData(
        null,
        JSON.stringify({ message: "请求方法错误", status: "failure" }),
        200
      );
      break;
  }

  function returnHandle(err, results, returnData) {
    if (err) {
      console.log(err);
      returnData(
        JSON.stringify({ message: "执行数据操作失败", status: "failure" }),
        200
      );
    } else {
      returnData(
        JSON.stringify({
          message: "执行数据操作成功",
          status: "success",
          result: results,
        }),
        200
      );
    }
  }
};
module.exports = userService;
