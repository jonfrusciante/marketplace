-- MySQL dump 10.13  Distrib 8.0.11, for Linux (x86_64)
--
-- Host: localhost    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cart` (
  `id` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `cart` text NOT NULL,
  `wishlist` text NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `version` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_756f53ab9466eb52a52619ee01` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `category` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `version` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_23c05c292c439d77b0de816b50` (`name`),
  UNIQUE KEY `IDX_cb73208f151aa71cdd78f662d7` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoryProduct`
--

DROP TABLE IF EXISTS `categoryProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `categoryProduct` (
  `id` varchar(255) NOT NULL,
  `productSkuId` varchar(255) NOT NULL,
  `categoryId` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `version` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoryProduct`
--

LOCK TABLES `categoryProduct` WRITE;
/*!40000 ALTER TABLE `categoryProduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoryProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `order` (
  `id` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `productSkuId` varchar(255) NOT NULL,
  `initiatedDate` date NOT NULL,
  `completedDate` date NOT NULL,
  `description` text NOT NULL,
  `status` enum('Processing','In Transit','Complete','Canceled') NOT NULL DEFAULT 'Processing',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `version` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderProduct`
--

DROP TABLE IF EXISTS `orderProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `orderProduct` (
  `id` varchar(255) NOT NULL,
  `productSkuId` varchar(255) NOT NULL,
  `orderId` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `shippedDate` date NOT NULL,
  `deliveredDate` date NOT NULL,
  `shippingCompany` varchar(255) NOT NULL,
  `shippingCost` int(11) NOT NULL,
  `totalCost` int(11) NOT NULL,
  `description` text NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `version` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderProduct`
--

LOCK TABLES `orderProduct` WRITE;
/*!40000 ALTER TABLE `orderProduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `vendorId` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `version` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_8cfaf4a1e80806d58e3dbe6922` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('20s-3s2-s2-s2s3d','Product 3','c3d82dbb-f30a-4eea-99f4-f214293eba1c','product-3',0,'2018-07-23 20:50:43.822756','2018-07-23 20:50:43.822756',1),('3724v-322s-s2s-s2','Product 1','c3d82dbb-f30a-4eea-99f4-f214293eba1c','product-1',0,'2018-07-23 20:50:43.792117','2018-07-23 20:50:43.792117',1),('d32d-d2-sf2f-32','Product 6','d9302-d32d-2-ger-4f4','product-6',0,'2018-07-23 20:50:44.797307','2018-07-23 20:50:44.797307',1),('de-33d-d3qf-rgr','Product 5','s920hd3-d32dj0s-d32d2s-d32d3','product-5',0,'2018-07-23 20:50:43.828713','2018-07-23 20:50:43.828713',1),('di2o-3n3s-s3-s2','Product 2','c3d82dbb-f30a-4eea-99f4-f214293eba1c','product-2',0,'2018-07-23 20:50:43.820019','2018-07-23 20:50:43.820019',1),('s3902sn-s32-s-sd-2d','Product 4','n39bs2-d2-sd-3-f-d3-d3','product-4',0,'2018-07-23 20:50:43.826627','2018-07-23 20:50:43.826627',1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productSku`
--

DROP TABLE IF EXISTS `productSku`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `productSku` (
  `id` varchar(255) NOT NULL,
  `productId` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL,
  `color` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `version` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9f4c4fd154ecc87874dc5933fb` (`slug`),
  KEY `FK_2234563ab688ba74d89fd044af2` (`productId`),
  CONSTRAINT `FK_2234563ab688ba74d89fd044af2` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productSku`
--

LOCK TABLES `productSku` WRITE;
/*!40000 ALTER TABLE `productSku` DISABLE KEYS */;
INSERT INTO `productSku` VALUES ('3-d2-d-e3e3q','de-33d-d3qf-rgr','Product 5 Sku 1','product-5-sku-1',10,'red','large',20,'Product sku number 1',0,'2018-07-23 20:59:25.979068','2018-07-23 20:59:25.979068',1),('3-d2-d-e3ed3q','d32d-d2-sf2f-32','Product 6 Sku 1','product-6-sku-1',10,'red','large',20,'Product sku number 1',0,'2018-07-23 20:58:18.781485','2018-07-23 20:58:18.781485',1),('3-d2a-d-e3ed3q','20s-3s2-s2-s2s3d','Product 3 Sku 1','product-3-sku-1',10,'red','large',20,'Product sku number 1',0,'2018-07-23 20:57:14.504948','2018-07-23 20:57:14.504948',1),('3-d2da-d-e3ed3q','di2o-3n3s-s3-s2','Product 2 Sku 1','product-2-sku-1',10,'red','large',20,'Product sku number 1',0,'2018-07-23 20:56:27.554374','2018-07-23 20:56:27.554374',1),('3-d2dda-d-e3ed3q','3724v-322s-s2s-s2','Product 1 Sku 1','product-sku-1',10,'red','large',20,'Product sku number 1',0,'2018-07-23 20:55:00.561920','2018-07-23 20:55:00.561920',1),('3-d2dda-d-n43i2s-s2','3724v-322s-s2s-s2','Product 1 Sku 4','product-sku-4',600,'gold','x-large',2,'Product sku number 2',0,'2018-07-23 20:55:01.649778','2018-07-23 20:55:01.649778',1),('3-ddda-d-n432s-s2','20s-3s2-s2-s2s3d','Product 3 Sku 4','product-3-sku-4',600,'gold','x-large',2,'Product sku number 2',0,'2018-07-23 20:57:15.364884','2018-07-23 20:57:15.364884',1),('3-ddda-d-n43i2s-s2','di2o-3n3s-s3-s2','Product 2 Sku 4','product-2-sku-4',600,'gold','x-large',2,'Product sku number 2',0,'2018-07-23 20:56:28.444201','2018-07-23 20:56:28.444201',1),('4d9-d333da-d-e3ed3q','di2o-3n3s-s3-s2','Product 2 Sku 2','product-2-sku-2',30,'green','medium',20,'Product sku number 2',0,'2018-07-23 20:56:27.583283','2018-07-23 20:56:27.583283',1),('4d9-d33d3da-d-e3ed3q','3724v-322s-s2s-s2','Product 1 Sku 2','product-sku-2',30,'green','medium',20,'Product sku number 2',0,'2018-07-23 20:55:00.594463','2018-07-23 20:55:00.594463',1),('4d9-d33da-d-e3ed3q','20s-3s2-s2-s2s3d','Product 3 Sku 2','product-3-sku-2',30,'green','medium',20,'Product sku number 2',0,'2018-07-23 20:57:14.522089','2018-07-23 20:57:14.522089',1),('4d9-d3da-d-e3d3q','de-33d-d3qf-rgr','Product 5 Sku 2','product-5-sku-2',30,'green','medium',20,'Product sku number 2',0,'2018-07-23 20:59:26.020429','2018-07-23 20:59:26.020429',1),('4d9-d3da-d-e3ed3q','d32d-d2-sf2f-32','Product 6 Sku 2','product-6-sku-2',30,'green','medium',20,'Product sku number 2',0,'2018-07-23 20:58:18.819971','2018-07-23 20:58:18.819971',1),('d233-d3d3-e33q','de-33d-d3qf-rgr','Product 5 Sku 3','product-5-sku-3',5,'yellow','small',50,'Product sku number 3',0,'2018-07-23 20:59:26.628468','2018-07-23 20:59:26.628468',1),('d233-d3d3-e3d3q','d32d-d2-sf2f-32','Product 6 Sku 3','product-6-sku-3',5,'yellow','small',50,'Product sku number 3',0,'2018-07-23 20:58:19.640372','2018-07-23 20:58:19.640372',1),('d233-d3d3-e3ed3q','20s-3s2-s2-s2s3d','Product 3 Sku 3','product-3-sku-3',5,'yellow','small',50,'Product sku number 3',0,'2018-07-23 20:57:14.524575','2018-07-23 20:57:14.524575',1),('d23d3-d32d3-e3ed3q','3724v-322s-s2s-s2','Product 1 Sku 3','product-sku-3',5,'yellow','small',50,'Product sku number 3',0,'2018-07-23 20:55:00.598149','2018-07-23 20:55:00.598149',1),('d23d3-d3d3-e3ed3q','di2o-3n3s-s3-s2','Product 2 Sku 3','product-2-sku-3',5,'yellow','small',50,'Product sku number 3',0,'2018-07-23 20:56:27.587016','2018-07-23 20:56:27.587016',1);
/*!40000 ALTER TABLE `productSku` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `session` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','Vendor','Customer') NOT NULL DEFAULT 'Customer',
  `confirmed` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `version` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('c3d82dbb-f30a-4eea-99f4-f214293eba1c','Duran Humes','duranhumes@gmail.com','$argon2d$v=19$m=8192,t=4,p=2$a8saoTDLFdzjH2BGs84Utw$A+erQlEAEkM1posCRLMxNDhcPgSXQPn9mwJA4rTudJI','Customer',0,'2018-07-23 20:43:50.344407','2018-07-23 20:43:50.344407',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userCart`
--

DROP TABLE IF EXISTS `userCart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `userCart` (
  `id` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `cart` text NOT NULL,
  `wishlist` text NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `version` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_53d20e025433d7949a28300627` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userCart`
--

LOCK TABLES `userCart` WRITE;
/*!40000 ALTER TABLE `userCart` DISABLE KEYS */;
/*!40000 ALTER TABLE `userCart` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-23 17:02:02
