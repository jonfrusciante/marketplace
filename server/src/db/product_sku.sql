CREATE TABLE IF NOT EXISTS `product_sku` (
  `sku_id` VARCHAR(255) NOT NULL,
  `product_id` VARCHAR(255) NOT NULL,
  `price` INT(11) NOT NULL,
  `currency_type` INT(11) NOT NULL,
  `stock` INT(11) NOT NULL,
  `color` VARCHAR(255),
  `size` VARCHAR(255),
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `status` ENUM('1','0') COLLATE utf8_unicode_ci NOT NULL DEFAULT '1' COMMENT '1:Active, 0:Inactive',
  `createTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sku_id`),
  UNIQUE KEY `IDX_97672ac88fds9b4dddsfds8be` (`sku_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `product_sku`
  ADD CONSTRAINT `product_sku_34fd894894234b9`
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
