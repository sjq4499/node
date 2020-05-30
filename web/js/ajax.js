/*
 * @Descripttion:
 * @Author: sjq
 * @Date: 2020-05-30 14:33:40
 * @LastEditors: sjq
 * @LastEditTime: 2020-05-30 16:17:23
 */

function ajax(url, params = null, type = "GET") {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(type, url);
    params = formdata(params);
    if (type == "GET" && params) {
      url += url.indexOf("?") > -1 ? "" : "?" + params;
      xhr.send(null);
    } else if (type == "POST") {
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(params);
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      if (xhr.status == 200) {
        return resolve(JSON.parse(JSON.stringify(xhr.responseText)));
      } else {
        return reject(new Error("request failed"));
      }
    };
  });
}
//将一个对象转成序列化字符串
function formdata(opt, callback) {
  let temp = "";
  for (let key in opt) {
    temp += key + "=" + opt[key] + "&";
  }
  if (callback != undefined) {
    temp += "callback=" + callback;
  }
  return temp;
}
