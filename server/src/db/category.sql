CREATE TABLE IF NOT EXISTS `category` (
  `id` VARCHAR(255) NOT NULL,
  `parent_id` INT(10) UNSIGNED DEFAULT NULL,
  `name` VARCHAR(45) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `status` ENUM('1','0') COLLATE utf8_unicode_ci NOT NULL DEFAULT '1' COMMENT '1:Active, 0:Inactive',
  `createTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
