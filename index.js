/*
 * @Descripttion: 
 * @Author: sjq
 * @Date: 2020-05-30 14:33:40
 * @LastEditors: sjq
 * @LastEditTime: 2020-05-30 14:42:05
 */ 
const http = require('http');
const path = require('path');
const url = require('url');
const mysql = require('mysql');

const readFildeFn = require('./http_readfile.js');
const staticPath = file => path.join(__dirname, 'static', file); //index是文件夹的名字

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123321',
  database: 'my_db'
});

connection.connect();


// connection.end();

let server = http.createServer((req, res) => {
  var pathName=url.parse(req.url).pathname;//请求路径
  var method=req.method.toLowerCase();//请求方式
  if(method==='get' && pathName.startsWith('/web'))












  // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
  // let ourl = url.parse(req.url);
  // let pathName = ourl.pathname;
  // //console.log(pathName);
  // if (pathName == '/favicon.ico') {
  //   res.end('');
  //   return;
  // }
  // pathName = pathName === '/' ? 'index.html' : pathName;
  // let extName = path.extname(pathName);
  // if (extName) {
  //   readFildeFn(staticPath(pathName))
  //     .then(con => {
  //       res.end(con);
  //     })
  //     .catch(error => {
  //       res.end(JSON.stringify(error));
  //     });
  // } else {
  //   //请求的是接口
  //   console.log(pathName, "pathName")
  //   let data = ''
  //   switch (pathName) {
  //     case '/api/getuserlist':
  //       var sql = "select * from user"
  //       connection.query(sql, (err, data) => {
  //         console.log(data, '1')
  //         data = data

  //       })
  //       console.log(data, '3')
  //       break;
  //   }
  //   console.log(data, '2')
  //   // connection.end();
  //   res.end('data');
  // }
});
server.listen(8080, () => {
  console.log('服务请求成功,端口为http://localhost:8080/index.html');
});