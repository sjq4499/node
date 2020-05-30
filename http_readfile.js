/**
 * 根据路径读取文件
 * 读取文件需要使用异步读取
 * promis => 承诺
 */
const fs = require('fs');

function readFile (filePath) {
  //判断此路径是否存在，如果不存在不能继续执行
  if (!fs.existsSync(filePath)) {
    return;
  }
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, con) => {
      //读取到文件具体做什么不能写死
      if (error) {
        reject(error);
      } else {
        resolve(con);
      }
    });
  });
}
module.exports = readFile;