/*
 * @Descripttion:
 * @Author: sjq
 * @Date: 2020-05-30 14:59:24
 * @LastEditors: sjq
 * @LastEditTime: 2020-05-30 15:00:35
 */
var productService = require("../service/productService.js");
var requestProcessing = function (pathName, reqData, postData, returnDataFn) {
  //如果路径为http://localhost:8080/user/add，action为user，method为add。
  var action = pathName.substring(1, pathName.lastIndexOf("/"));
  var method = pathName.substring(pathName.lastIndexOf("/") + 1);
  switch (action) {
    case "user":
      //针对用户进行处理，暂时省略
      break;
    case "product":
      productService(method, reqData, postData, returnDataFn);
      break;
    default:
      returnDataFn(
        JSON.stringify({ message: "请求路径错误", status: "failure" }),
        200
      );
      break;
  }
};
module.exports = requestProcessing;
