/*
 * @Descripttion:
 * @Author: sjq
 * @Date: 2020-06-01 08:47:27
 * @LastEditors: sjq
 * @LastEditTime: 2020-06-01 09:24:21
 */
// 设置cookie
function setCookie(name, value, time = "", path = "") {
  if (time && path) {
    var strsec = time * 1000;
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie =
      name +
      "=" +
      escape(value) +
      ";expires=" +
      exp.toGMTString() +
      ";path=" +
      path;
  } else if (time) {
    var strsec = time * 1000;
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie =
      name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  } else if (path) {
    document.cookie = name + "=" + escape(value) + ";path=" + path;
  } else {
    document.cookie = name + "=" + escape(value);
  }
}
// 获取cookie
function getCookie(name) {
  var strcookie = document.cookie; //获取cookie字符串
  var arrcookie = strcookie.split("; "); //分割
  //遍历匹配
  for (var i = 0; i < arrcookie.length; i++) {
    var arr = arrcookie[i].split("=");
    if (arr[0] == name) {
      return arr[1];
    }
  }
  return "";
}
// 删除cookie
function deleteCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  // 这里需要判断一下cookie是否存在
  var c = getCookie(name);
  if (c != null) {
    document.cookie = name + "=" + c + ";expires=" + exp.toGMTString();
  }
}
