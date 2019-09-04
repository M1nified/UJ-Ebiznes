-- course_ebiznes schema

-- !Ups

ALTER TABLE `course_ebiznes`.`order`
ADD COLUMN `order_country` VARCHAR(45) NOT NULL AFTER `order_created_at`,
ADD COLUMN `order_city` VARCHAR(45) NOT NULL AFTER `order_country`,
ADD COLUMN `order_address` VARCHAR(45) NOT NULL AFTER `order_city`,
ADD COLUMN `order_postal` VARCHAR(45) NOT NULL AFTER `order_address`,
ADD COLUMN `order_name1` VARCHAR(45) NOT NULL AFTER `order_postal`,
ADD COLUMN `order_name2` VARCHAR(45) NOT NULL AFTER `order_name1`;

-- !Downs
