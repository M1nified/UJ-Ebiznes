-- course_ebiznes schema

-- !Ups

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_email` varchar(45) NOT NULL,
  `admin_password` varchar(45) NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `admin_email_UNIQUE` (`admin_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user` (
                        `user_id` int(11) NOT NULL AUTO_INCREMENT,
                        `user_name` varchar(45) NOT NULL,
                        `user_password` varchar(45) NOT NULL,
                        `user_email` varchar(45) NOT NULL,
                        `user_country` varchar(45) DEFAULT NULL,
                        `user_street` varchar(45) DEFAULT NULL,
                        `user_city` varchar(45) DEFAULT NULL,
                        `user_address` varchar(45) DEFAULT NULL,
                        `user_postal` varchar(45) DEFAULT NULL,
                        `user_name_2` varchar(45) DEFAULT NULL,
                        PRIMARY KEY (`user_id`),
                        UNIQUE KEY `userEmail_UNIQUE` (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) NOT NULL,
  `category_parent_id` int(11) DEFAULT NULL,
  `category_description` longtext,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name_UNIQUE` (`category_name`),
  KEY `category_category_parent_id_idx` (`category_parent_id`),
  CONSTRAINT `category_category_parent_id` FOREIGN KEY (`category_parent_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `order_created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_description` longtext NOT NULL,
  `product_price` int(11) DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `product_unavailable` tinyint(1) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `inventory` (
                             `inventory_id` int(11) NOT NULL,
                             `product_id` int(11) NOT NULL,
                             `inventory_count` int(11) NOT NULL DEFAULT '0',
                             PRIMARY KEY (`inventory_id`),
                             KEY `product_id_idx` (`product_id`),
                             CONSTRAINT `inventory_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `order_product` (
 `order_product_id` int(11) NOT NULL AUTO_INCREMENT,
 `order_id` int(11) NOT NULL,
 `product_id` int(11) NOT NULL,
 `order_product_amount` int(11) NOT NULL DEFAULT '1',
 PRIMARY KEY (`order_product_id`),
 KEY `order_id_idx` (`order_id`),
 KEY `product_id_idx` (`product_id`),
 CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`),
 CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- !Downs
-- DROP TABLE PRODUCT;

DROP TABLE IF EXISTS `admin`;
DROP TABLE IF EXISTS `category`;
DROP TABLE IF EXISTS `inventory`;
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS `order_product`;
DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `user`;
