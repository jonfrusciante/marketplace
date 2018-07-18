CREATE TABLE IF NOT EXISTS `user` (
  `id` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `DOB` DATE NOT NULL,
  `vendor` ENUM('A','P','N') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'N' COMMENT 'A:Approved, P:Pending, N:Not',
  `gender` ENUM('M','F') COLLATE utf8_unicode_ci NOT NULL COMMENT 'M:Male, F:Female',
  `emailConfirmed` ENUM('1','0') COLLATE utf8_unicode_ci NOT NULL DEFAULT '0' COMMENT '1:Confirmed, 0:Unconfirmed',
  `createTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
