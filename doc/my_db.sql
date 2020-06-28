-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.20 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  8.2.0.4675
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出 my_db 的数据库结构
DROP DATABASE IF EXISTS `my_db`;
CREATE DATABASE IF NOT EXISTS `my_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `my_db`;


-- 导出  表 my_db.product 结构
DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `p_id` int(11) NOT NULL AUTO_INCREMENT,
  `no` char(50) NOT NULL DEFAULT '0',
  `name` char(50) NOT NULL DEFAULT '0',
  `type` char(50) NOT NULL DEFAULT '0',
  `price` char(50) NOT NULL DEFAULT '0',
  `pic` char(50) DEFAULT '0',
  `num` char(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`p_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- 正在导出表  my_db.product 的数据：~11 rows (大约)
DELETE FROM `product`;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`p_id`, `no`, `name`, `type`, `price`, `pic`, `num`) VALUES
	(1, '12', '12', '12', '12', NULL, '222'),
	(2, '123', '123', '12', '12', '/upload/1593310498910.jpg', '12'),
	(3, '123', '123', '12', '12', '/upload/1593310501185.jpg', '12'),
	(4, '123', '123', '12', '12', '/upload/1593310502805.jpg', '12'),
	(5, '123', '123', '12', '12', '/upload/1593310505294.jpg', '12'),
	(6, '123', '123', '12', '12', '/upload/1593310507846.jpg', '12'),
	(7, '123', '123', '12', '12', '/upload/1593310510076.jpg', '12'),
	(8, '123', '123', '12', '12', '/upload/1593310512753.jpg', '12'),
	(9, '12', '12', '12', '12', '/upload/', '12'),
	(10, '123', '123', '12', '12', '/upload/', '12'),
	(11, '123', '123', '123', '3123', '/upload/', '12');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;


-- 导出  表 my_db.user 结构
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(50) NOT NULL COMMENT '用户名',
  `password` char(50) NOT NULL COMMENT '密码',
  `userSex` char(50) NOT NULL COMMENT '性别 男1  女2',
  `userEmail` char(50) NOT NULL COMMENT '邮箱',
  `userBasicInfo` char(50) DEFAULT NULL COMMENT '基本情况',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- 正在导出表  my_db.user 的数据：~4 rows (大约)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `username`, `password`, `userSex`, `userEmail`, `userBasicInfo`) VALUES
	(2, '123', '123', '1', '1', '123'),
	(5, 'a12332', '123123', '1', '16@qq.com', '1'),
	(7, 'a123323', '123123', '1', '16@qq.com', '1'),
	(14, 'aa123', '123123', '2', '16@qq.com', '123');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
