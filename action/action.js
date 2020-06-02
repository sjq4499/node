/*
 * @Descripttion:
 * @Author: sjq
 * @Date: 2020-05-30 14:59:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-02 08:59:14
 */
var productService = require("../service/productService.js");
var userService = require("../service/userService.js");
var requestProcessing = function (pathName, reqData, postData, returnDataFn) {
  //如果路径为http://localhost:8080/user/add，action为user，method为add。
  var action = pathName.substring(1, pathName.lastIndexOf("/"));
  var method = pathName.substring(pathName.lastIndexOf("/") + 1);
  switch (action) {
    case "user":
      userService(method, reqData, postData, returnDataFn);
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
