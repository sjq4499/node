var query = require("../doc/mysql.js");
var productService = function (method, reqData, postData, returnData) {
  switch (method) {
    case "find":
      query("SELECT * FROM   product", [], function (err, results, fields) {
        returnHandle(err, results, returnData);
      });
      break;
    case "up":
      console.log(postData);
      query(
        "insert into  product(no,name,type,price,pic,num) values(?,?,?,?,?,?)",
        [
          postData.no,
          postData.name,
          postData.type,
          postData.price,
          "/upload/" + postData.fileName,
          postData.num,
        ],
        function (err, results, fields) {
          returnHandle(err, results, returnData);
        }
      );
      break;
    case "delete":
      var { id } = postData;
      query("delete from product where p_id=? ", [id], function (
        err,
        results,
        fields
      ) {
        if (err) {
          returnHandle(err, results, returnData, "执行数据操作失败", 0);
        } else {
          returnHandle(err, results, returnData, "删除成功", 1);
        }
      });
      break;
    case "detail":
      var { id } = reqData;
      query("select * from product where p_id=? ", [id], function (
        err,
        results,
        fields
      ) {
        if (err) {
          returnHandle(err, results, returnData, "执行数据操作失败", 0);
        } else {
          returnHandle(err, results, returnData, "获取成功", 1);
        }
      });
      break;
    case "upedit":
      var { no, name, type, price, pic, num, p_id } = postData;
      query(
        "update product  set no=? , name=? , type=? , price=? , pic=? , num=?  where p_id=? ",
        [no, name, type, price, pic, num, p_id],
        function (err, results, fields) {
          if (err) {
            returnHandle(err, results, returnData, "sql错误", 0);
          } else {
            returnHandle(err, results, returnData, "编辑成功", 1);
          }
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
  function returnHandle(err, results, returnData, msg, code) {
    if (err) {
      console.log(err);
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
module.exports = productService;
