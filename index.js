var http = require("http");       //加载HTTP模块，用于创建HTTP服务器
var url = require("url");         //加载URL模块，用于解析url
var fs = require("fs");          //加载f s模块，用于读写文件
var path = require("path");      //加载URL模块，用于路径操作
var mime = require("mime");    //加载mime模块
var querystring = require("querystring");            //加载querystring模块
var formidable = require("formidable");             //上传文件模块
var requestProcessing = require("./action/action.js");   //加载控制层
var host = 'localhost';
var port = 8080;
http.createServer(function (request, response) {
  var pathName = url.parse(request.url).pathname;  //获取请求的资源路径
  var method = request.method.toLowerCase();	//获取请求方法post|get
  //用于向客户端返回数据的回调函数
  var returnDataFn = function (data, status) {
    //设置响应头
    response.writeHead(status, { "Content-Type": "text/plain;charset=utf-8", "Access-Control-Allow-Origin": "*" });
    response.end(data);    //向客户端发送数据
  };
  //格式化文件大小
  var renderSize = function (value) {
    if (null == value || value == '') {
      return "0 Bytes";
    }
    var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
    var index = 0;
    var srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    var size = srcsize / Math.pow(1024, index);
    size = size.toFixed(2);//保留的小数位数
    return size + unitArr[index];
  };
  if (method == "get" && pathName.startsWith("/web")) {    //如果是get请求，且请求的是eis路径下的资源，则作为静态资源，读取文件，将文件内容发送到客户端
    var target = path.resolve(__dirname, '../' + pathName);  //获取请求的资源路径
    var contentType = mime.getType(pathName);         //获取资源的contentType
    fs.exists(target, function (exists) {                  //判断文件是否存在
      if (!exists) target = path.resolve(__dirname, '../web/pages/common/error.html');    //若文件不存在，则指向错误页
      fs.readFile(target, (err, data) => {    //读取文件
        if (err) {
          returnDataFn("访问出错", 500);
        } else {
          response.writeHead(200, { "Content-Type": contentType + ";charset=utf8", "Access-Control-Allow-Origin": "*" });
          response.end(data);
        }
      });
    });
  } else if (method == "post" && pathName.indexOf("/up") >= 0) {
    //如果是post请求，且上传文件
    var reqData = url.parse(request.url, true).query;    //解析url参数
    var form = new formidable.IncomingForm();    //建立form，用于解析含有文件的表单
    form.keepExtensions = true;                  //保存扩展名
    form.uploadDir = path.join(__dirname, './temp');  //缓存目录
    form.onPart = (part) => {    //处理空文件，防止存储空文件
      if (part.filename === "") return;
      form.handlePart(part);
    }
    form.parse(request, function (err, fields, files) {    //解析上传数据
      if (err) {
        returnDataFn(JSON.stringify({ "message": "上传出现错误", "status": "failure" }), 200);
      } else {
        var file = files['upload'];
        if (file && file.size > 0) {
          var oldpath = file.path;    //文件暂存路径
          var extname = path.extname(file.name);    //获得扩展名
          var newFilename = (new Date()).getTime() + extname;    //用时间戳生成新文件名
          var newpath = path.join(__dirname, "/upload/" + newFilename);    //新文件路径
          fs.renameSync(oldpath, newpath);    //将上传文件存在新路径下
          fields.fileName = newFilename;
          fields.fileSrcName = file.name;
          fields.fileContentType = file.type;
          fields.fileSize = renderSize(file.size);
        } else {
          fields.fileName = '';
          fields.fileSrcName = '';
          fields.fileContentType = '';
          fields.fileSize = '';
        }
        requestProcessing(pathName, reqData, fields, returnDataFn);//将请求的数据传给requestProcessing函数，执行具体业务功能，该函数是action.js中的函数
      }
    });
  } else {
    var reqData = url.parse(request.url, true).query;
    var buf = [];    //定义一个buf用于暂存请求体的信息
    request.on('data', function (chunk) {
      buf.push(chunk);
    });
    //在end事件触发后，通过querystring.parse将buf解析为真正的post请求格式
    request.on('end', function () {
      var postData = querystring.parse(buf.join());
      requestProcessing(pathName, reqData, postData, returnDataFn);
    });
  }
}).listen(port, host, function () {
  console.log("开始监听...");
});