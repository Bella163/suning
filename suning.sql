/*
Navicat MySQL Data Transfer

Source Server         : mycon
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : suning

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2019-05-19 23:40:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for 0516comment
-- ----------------------------
DROP TABLE IF EXISTS `0516comment`;
CREATE TABLE `0516comment` (
  `cid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `gid` int(11) DEFAULT NULL,
  `satisfaction` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of 0516comment
-- ----------------------------

-- ----------------------------
-- Table structure for 0516goodsinfo
-- ----------------------------
DROP TABLE IF EXISTS `0516goodsinfo`;
CREATE TABLE `0516goodsinfo` (
  `gid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `mcid` int(11) DEFAULT NULL,
  `stock` int(50) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `sale` int(50) DEFAULT NULL,
  `originalprice` decimal(10,0) DEFAULT NULL,
  `currentprice` decimal(10,0) DEFAULT NULL,
  `size` varchar(10) DEFAULT NULL,
  `goodsname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`gid`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of 0516goodsinfo
-- ----------------------------
INSERT INTO `0516goodsinfo` VALUES ('1', '1', '561', '1.jpg&2.jpg&3.jpg&4.jpg', '12', '66', '77', '64g', 'HUAWEI/华为P30 亮黑色 8GB+128GB 徕卡三摄 未来影像 移动联通电信4G全面屏全网通手机');
INSERT INTO `0516goodsinfo` VALUES ('2', '1', '2461', '1.jpg&2.jpg&3.jpg&5.jpg', '16', '77', '79', '32g', '华为 荣耀V20 胡歌同款手机全网通 6GB+128GB 标配版 幻夜黑 移动联通电信4G');
INSERT INTO `0516goodsinfo` VALUES ('3', '1', '12', '1.jpg&2.jpg&3.jpg&6.jpg', '20', '79', '87', '128g', 'Apple iPhone XR 128GB 黑色 移动联通电信4G全网通手机 双卡双待');
INSERT INTO `0516goodsinfo` VALUES ('4', '1', '14', '1.jpg&2.jpg&3.jpg&7.jpg', '24', '87', '91', '256g', '华为(HUAWEI) 华为P30 Pro 麒麟980 超感光徕卡四摄 全网通版 8GB+128GB 珠');
INSERT INTO `0516goodsinfo` VALUES ('5', '1', '16', '1.jpg&2.jpg&3.jpg&8.jpg', '28', '94', '96', '32g', 'SAMSUNG/三星 Galaxy S10+（SM-G9750) 8GB +128GB 皓玉白 超感官全视屏 ');
INSERT INTO `0516goodsinfo` VALUES ('6', '1', '18', '1.jpg&2.jpg&3.jpg&9.jpg', '32', '100', '101', '64g', 'Xiaomi/小米 小米9 6GB+128GB 深空灰 移动联通电信全网通4G手机 小水滴全面');
INSERT INTO `0516goodsinfo` VALUES ('7', '1', '20', '1.jpg&2.jpg&3.jpg&10.jpg', '36', '107', '106', '64g', '华为/荣耀(honor） Magic2 麒麟980AI智能芯片 超广角AI三摄 6GB+128GB 渐');
INSERT INTO `0516goodsinfo` VALUES ('8', '1', '22', '1.jpg&2.jpg&3.jpg&11.jpg', '40', '113', '111', '32g', 'Xiaomi/小米 小米9 SE 6GB+64GB 深空灰 移动联通电信全网通4G手机 小水滴全');
INSERT INTO `0516goodsinfo` VALUES ('9', '1', '24', '1.jpg&2.jpg&3.jpg&12.jpg', '44', '120', '116', '128g', 'vivo X27 雀羽蓝 8GB+256GB 广角夜景三摄 全面屏拍照游戏手机 升降摄像头全网通4G手机');
INSERT INTO `0516goodsinfo` VALUES ('10', '1', '26', '1.jpg&2.jpg&3.jpg&13.jpg', '48', '126', '121', '256g', 'Apple iPhone XR 64GB 黑色 移动联通电信4G全网通手机 双卡双待');
INSERT INTO `0516goodsinfo` VALUES ('11', '1', '28', '1.jpg&2.jpg&3.jpg&14.jpg', '52', '133', '126', '32g', 'HUAWEI/华为P30 亮黑色 8GB+128GB 徕卡三摄 未来影像 移动联通电信4G全面屏全网通手机');
INSERT INTO `0516goodsinfo` VALUES ('12', '1', '30', '1.jpg&2.jpg&3.jpg&15.jpg', '56', '139', '131', '64g', '华为 荣耀V20 胡歌同款手机全网通 6GB+128GB 标配版 幻夜黑 移动联通电信4G');
INSERT INTO `0516goodsinfo` VALUES ('13', '1', '32', '1.jpg&2.jpg&3.jpg&16.jpg', '60', '146', '136', '64g', 'Apple iPhone XR 128GB 黑色 移动联通电信4G全网通手机 双卡双待');
INSERT INTO `0516goodsinfo` VALUES ('14', '1', '34', '1.jpg&2.jpg&3.jpg&17.jpg', '64', '152', '141', '32g', '华为(HUAWEI) 华为P30 Pro 麒麟980 超感光徕卡四摄 全网通版 8GB+128GB 珠');
INSERT INTO `0516goodsinfo` VALUES ('15', '1', '36', '1.jpg&2.jpg&3.jpg&18.jpg', '68', '159', '146', '128g', 'SAMSUNG/三星 Galaxy S10+（SM-G9750) 8GB +128GB 皓玉白 超感官全视屏 ');
INSERT INTO `0516goodsinfo` VALUES ('16', '1', '38', '1.jpg&2.jpg&3.jpg&19.jpg', '72', '165', '151', '256g', 'Xiaomi/小米 小米9 6GB+128GB 深空灰 移动联通电信全网通4G手机 小水滴全面');
INSERT INTO `0516goodsinfo` VALUES ('17', '1', '40', '1.jpg&2.jpg&3.jpg&20.jpg', '76', '172', '156', '32g', '华为/荣耀(honor） Magic2 麒麟980AI智能芯片 超广角AI三摄 6GB+128GB 渐');
INSERT INTO `0516goodsinfo` VALUES ('18', '1', '42', '1.jpg&2.jpg&3.jpg&21.jpg', '80', '178', '161', '64g', 'Xiaomi/小米 小米9 SE 6GB+64GB 深空灰 移动联通电信全网通4G手机 小水滴全');
INSERT INTO `0516goodsinfo` VALUES ('19', '1', '44', '1.jpg&2.jpg&3.jpg&22.jpg', '84', '185', '166', '64g', 'vivo X27 雀羽蓝 8GB+256GB 广角夜景三摄 全面屏拍照游戏手机 升降摄像头全网通4G手机');
INSERT INTO `0516goodsinfo` VALUES ('20', '1', '46', '1.jpg&2.jpg&3.jpg&23.jpg', '88', '191', '171', '32g', 'Apple iPhone XR 64GB 黑色 移动联通电信4G全网通手机 双卡双待');
INSERT INTO `0516goodsinfo` VALUES ('21', '1', '48', '1.jpg&2.jpg&3.jpg&24.jpg', '92', '198', '176', '128g', 'HUAWEI/华为P30 亮黑色 8GB+128GB 徕卡三摄 未来影像 移动联通电信4G全面屏全网通手机');
INSERT INTO `0516goodsinfo` VALUES ('22', '1', '33', '1.jpg&2.jpg&3.jpg&25.jpg', '96', '204', '181', '256g', '华为 荣耀V20 胡歌同款手机全网通 6GB+128GB 标配版 幻夜黑 移动联通电信4G');
INSERT INTO `0516goodsinfo` VALUES ('23', '1', '35', '1.jpg&2.jpg&3.jpg&26.jpg', '100', '211', '186', '32g', 'Apple iPhone XR 128GB 黑色 移动联通电信4G全网通手机 双卡双待');
INSERT INTO `0516goodsinfo` VALUES ('24', '1', '37', '1.jpg&2.jpg&3.jpg&27.jpg', '104', '217', '191', '64g', '华为(HUAWEI) 华为P30 Pro 麒麟980 超感光徕卡四摄 全网通版 8GB+128GB 珠');
INSERT INTO `0516goodsinfo` VALUES ('25', '1', '39', '1.jpg&2.jpg&3.jpg&28.jpg', '108', '224', '196', '64g', 'SAMSUNG/三星 Galaxy S10+（SM-G9750) 8GB +128GB 皓玉白 超感官全视屏 ');
INSERT INTO `0516goodsinfo` VALUES ('26', '1', '41', '1.jpg&2.jpg&3.jpg&29.jpg', '112', '230', '201', '32g', 'Xiaomi/小米 小米9 6GB+128GB 深空灰 移动联通电信全网通4G手机 小水滴全面');
INSERT INTO `0516goodsinfo` VALUES ('27', '1', '43', '1.jpg&2.jpg&3.jpg&30.jpg', '116', '237', '206', '128g', '华为/荣耀(honor） Magic2 麒麟980AI智能芯片 超广角AI三摄 6GB+128GB 渐');
INSERT INTO `0516goodsinfo` VALUES ('28', '1', '45', '1.jpg&2.jpg&3.jpg&31.jpg', '120', '243', '211', '256g', 'Xiaomi/小米 小米9 SE 6GB+64GB 深空灰 移动联通电信全网通4G手机 小水滴全');

-- ----------------------------
-- Table structure for 0516managerinfo
-- ----------------------------
DROP TABLE IF EXISTS `0516managerinfo`;
CREATE TABLE `0516managerinfo` (
  `mid` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `jurisdiction` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`mid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of 0516managerinfo
-- ----------------------------

-- ----------------------------
-- Table structure for 0516merchantinfo
-- ----------------------------
DROP TABLE IF EXISTS `0516merchantinfo`;
CREATE TABLE `0516merchantinfo` (
  `mcid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `merchantname` varchar(255) DEFAULT NULL,
  `gid` int(11) DEFAULT NULL,
  `mclocation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`mcid`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of 0516merchantinfo
-- ----------------------------
INSERT INTO `0516merchantinfo` VALUES ('1', '晋商数码专营店', null, '广东 广州');
INSERT INTO `0516merchantinfo` VALUES ('2', '杭州数码商城', null, '浙江 杭州');
INSERT INTO `0516merchantinfo` VALUES ('3', '北京数码专营店', null, '北京');
INSERT INTO `0516merchantinfo` VALUES ('4', '华为专营店', null, '广东 深圳');
INSERT INTO `0516merchantinfo` VALUES ('5', '益阳手机店', null, '广西 桂林');
INSERT INTO `0516merchantinfo` VALUES ('6', '合肥数码商城', null, '安徽 合肥');
INSERT INTO `0516merchantinfo` VALUES ('7', '帅哥数码电子商城', null, '四川 成都');
INSERT INTO `0516merchantinfo` VALUES ('8', '晋商数码专营店', null, '湖北 武汉');
INSERT INTO `0516merchantinfo` VALUES ('9', '杭州数码商城', null, '湖南 永州');
INSERT INTO `0516merchantinfo` VALUES ('10', '北京数码专营店', null, '广东 广州');
INSERT INTO `0516merchantinfo` VALUES ('11', '华为专营店', null, '浙江 杭州');
INSERT INTO `0516merchantinfo` VALUES ('12', '益阳手机店', null, '北京');
INSERT INTO `0516merchantinfo` VALUES ('13', '合肥数码商城', null, '广东 深圳');
INSERT INTO `0516merchantinfo` VALUES ('14', '帅哥数码电子商城', null, '广西 桂林');
INSERT INTO `0516merchantinfo` VALUES ('15', '晋商数码专营店', null, '安徽 合肥');
INSERT INTO `0516merchantinfo` VALUES ('16', '杭州数码商城', null, '四川 成都');
INSERT INTO `0516merchantinfo` VALUES ('17', '北京数码专营店', null, '湖北 武汉');
INSERT INTO `0516merchantinfo` VALUES ('18', '华为专营店', null, '湖南 永州');
INSERT INTO `0516merchantinfo` VALUES ('19', '益阳手机店', null, '广东 广州');
INSERT INTO `0516merchantinfo` VALUES ('20', '合肥数码商城', null, '浙江 杭州');
INSERT INTO `0516merchantinfo` VALUES ('21', '帅哥数码电子商城', null, '北京');
INSERT INTO `0516merchantinfo` VALUES ('22', '晋商数码专营店', null, '广东 深圳');
INSERT INTO `0516merchantinfo` VALUES ('23', '杭州数码商城', null, '广西 桂林');
INSERT INTO `0516merchantinfo` VALUES ('24', '北京数码专营店', null, '安徽 合肥');
INSERT INTO `0516merchantinfo` VALUES ('25', '华为专营店', null, '四川 成都');
INSERT INTO `0516merchantinfo` VALUES ('26', '益阳手机店', null, '湖北 武汉');
INSERT INTO `0516merchantinfo` VALUES ('27', '合肥数码商城', null, '湖南 永州');

-- ----------------------------
-- Table structure for 0516orderform
-- ----------------------------
DROP TABLE IF EXISTS `0516orderform`;
CREATE TABLE `0516orderform` (
  `orderid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `gid` int(11) DEFAULT NULL,
  `mcid` int(11) DEFAULT NULL,
  `goodsname` varchar(255) DEFAULT NULL,
  `merchantname` varchar(50) DEFAULT NULL,
  `gamount` int(50) DEFAULT NULL,
  `size` double(10,0) DEFAULT NULL,
  `currentprice` decimal(10,2) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`orderid`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of 0516orderform
-- ----------------------------
INSERT INTO `0516orderform` VALUES ('16', null, '14', '1', '华为(HUAWEI) 华为P30 Pro 麒麟980 超感光徕卡四摄 全网通版 8GB 128GB 珠', null, '1', null, '141.00', '15986771945', '../images/list/17.jpg');
INSERT INTO `0516orderform` VALUES ('15', null, '21', '1', 'HUAWEI/华为P30 亮黑色 8GB 128GB 徕卡三摄 未来影像 移动联通电信4G全面屏全网通手机', null, '1', null, '176.00', '15986771945', '../images/list/24.jpg');

-- ----------------------------
-- Table structure for 0516userinfo
-- ----------------------------
DROP TABLE IF EXISTS `0516userinfo`;
CREATE TABLE `0516userinfo` (
  `uid` int(50) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `passwords` varchar(30) NOT NULL,
  `telephone` varchar(30) NOT NULL,
  `regtime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email` varchar(50) DEFAULT NULL,
  `identity` varchar(20) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `shoprecord` varchar(255) DEFAULT NULL,
  `browserecord` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of 0516userinfo
-- ----------------------------
INSERT INTO `0516userinfo` VALUES ('1', 'malin', '123456', '15986771942', '2019-05-17 11:05:23', null, null, null, null, null, null, null);
INSERT INTO `0516userinfo` VALUES ('2', null, '123456', '15986771943', '2019-05-17 11:05:23', null, null, null, null, null, null, null);
INSERT INTO `0516userinfo` VALUES ('14', null, '123456', '15986771946', '2019-05-17 11:05:23', null, null, null, null, null, null, null);
INSERT INTO `0516userinfo` VALUES ('24', null, '123456', '15986771940', '2019-05-17 11:28:37', null, null, null, null, null, null, null);
INSERT INTO `0516userinfo` VALUES ('9', null, '123456', '15986771944', '2019-05-17 11:05:23', null, null, null, null, null, null, null);
INSERT INTO `0516userinfo` VALUES ('11', null, '123456', '15986771945', '2019-05-17 11:05:23', null, null, null, null, null, null, null);
INSERT INTO `0516userinfo` VALUES ('15', null, '123456', '15986771947', '2019-05-17 11:05:23', null, null, null, null, null, null, null);
INSERT INTO `0516userinfo` VALUES ('17', null, '123456', '15986771948', '2019-05-17 11:05:23', null, null, null, null, null, null, null);
INSERT INTO `0516userinfo` VALUES ('19', null, '123456', '15986771949', '2019-05-17 11:12:08', null, null, null, null, null, null, null);
INSERT INTO `0516userinfo` VALUES ('20', null, '123456', '15986771910', '2019-05-17 11:12:55', null, null, null, null, null, null, null);
INSERT INTO `0516userinfo` VALUES ('23', null, '123456', '15986771911', '2019-05-17 11:26:42', null, null, null, null, null, null, null);
INSERT INTO `0516userinfo` VALUES ('22', null, '123456', '15986771912', '2019-05-17 11:23:09', null, null, null, null, null, null, null);
INSERT INTO `0516userinfo` VALUES ('25', null, '123456', '15986771111', '2019-05-17 11:31:27', null, null, null, null, null, null, null);
INSERT INTO `0516userinfo` VALUES ('26', null, '123456', '15986771999', '2019-05-17 11:34:49', null, null, null, null, null, null, null);
INSERT INTO `0516userinfo` VALUES ('27', null, '123456', '15986771998', '2019-05-17 11:38:45', null, null, null, null, null, null, null);
INSERT INTO `0516userinfo` VALUES ('28', null, '123466', '15986771997', '2019-05-17 11:49:20', null, null, null, null, null, null, null);
INSERT INTO `0516userinfo` VALUES ('29', null, '123456', '15986771996', '2019-05-17 11:50:52', null, null, null, null, null, null, null);
INSERT INTO `0516userinfo` VALUES ('30', null, '123456', '15986771995', '2019-05-17 11:52:31', null, null, null, null, null, null, null);
SET FOREIGN_KEY_CHECKS=1;
