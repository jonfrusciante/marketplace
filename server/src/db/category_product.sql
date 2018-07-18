CREATE TABLE IF NOT EXISTS `category_product` (
  `category_id` VARCHAR(255) NOT NULL,
  `product_id` VARCHAR(255) NOT NULL,
  KEY `category_id` (`category_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `category_product`
  ADD CONSTRAINT `category_product_nu3b2894b94n2b34`
    FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `category_product_n4392b4983b49342`
    FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE;
