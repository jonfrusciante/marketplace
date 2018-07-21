-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: ecommerce
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoryProduct` (
  `id` varchar(255) NOT NULL,
  `productSkuId` varchar(255) NOT NULL,
  `categoryId` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `version` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
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
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
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
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
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
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('8943-d323-d23d-s2s3','Product 1','46fedfa4-0b87-4389-bff3-cd8c0d9e1ced','product-1',0,'2018-07-21 18:01:11.358909','2018-07-21 18:01:11.358909',1),('fd43-ffd3-d33d-s2432','Product 3','3ni3-d322-f32d-d2s2','product-3',0,'2018-07-21 18:01:11.442408','2018-07-21 18:01:11.442408',1),('fd43-ft23-d33d-s2s3','Product 2','46fedfa4-0b87-4389-bff3-cd8c0d9e1ced','product-2',0,'2018-07-21 18:01:11.414902','2018-07-21 18:01:11.414902',1),('fdd3-gfd3-df3d-s432','Product 4','3ni3-d322-f32d-d2s2','product-4',0,'2018-07-21 18:01:11.463760','2018-07-21 18:01:11.463760',1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productSku`
--

DROP TABLE IF EXISTS `productSku`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productSku` (
  `id` varchar(255) NOT NULL,
  `productId` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL,
  `color` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `version` int(11) NOT NULL DEFAULT '1',
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9f4c4fd154ecc87874dc5933fb` (`slug`),
  KEY `FK_2234563ab688ba74d89fd044af2` (`productId`),
  CONSTRAINT `FK_2234563ab688ba74d89fd044af2` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productSku`
--

LOCK TABLES `productSku` WRITE;
/*!40000 ALTER TABLE `productSku` DISABLE KEYS */;
INSERT INTO `productSku` VALUES ('231e-d1s2-d23d-s324','8943-d323-d23d-s2s3','Sku 1','product-1-sku-1',4,'blue','medium','Sku 1 description',0,'2018-07-19 20:14:07.118125','2018-07-19 20:14:07.118125',1,30),('231e-d1s2-d2ds-s324','fd43-ft23-d33d-s2s3','Sku 1','product-2-sku-1',4,'blue','medium','Sku 1 description',0,'2018-07-19 20:14:07.118125','2018-07-19 20:14:07.118125',1,10),('23ge-d1s2-d2ds-s324','fd43-ffd3-d33d-s2432','Sku 1','product-3-sku-1',4,'blue','medium','Sku 1 description',0,'2018-07-19 20:14:07.118125','2018-07-19 20:14:07.118125',1,5),('2rge-d1s2-drds-s324','fdd3-gfd3-df3d-s432','Sku 1','product-4-sku-1',4,'blue','medium','Sku 1 description',0,'2018-07-19 20:14:07.118125','2018-07-19 20:14:07.118125',1,24),('5f1e-dss2-d23d-sf34','fd43-ft23-d33d-s2s3','Sku 2','product-2-sku-2',4,'blue','medium','Sku 2 description',0,'2018-07-19 20:32:34.445902','2018-07-19 20:32:34.445902',1,10),('5f1e-dss2-d23d-sfds','fd43-ffd3-d33d-s2432','Sku 3','product-3-sku-3',4,'blue','medium','Sku 3 description',0,'2018-07-19 20:32:34.445902','2018-07-19 20:32:34.445902',1,5),('5f1e-dss2-df3d-s4ds','fdd3-gfd3-df3d-s432','Sku 3','product-4-sku-3',4,'blue','medium','Sku 3 description',0,'2018-07-19 20:32:34.445902','2018-07-19 20:32:34.445902',1,24),('5f1e-f5s2-d23d-sf34','8943-d323-d23d-s2s3','Sku 2','product-1-sku-2',4,'blue','medium','Sku 2 description',0,'2018-07-19 20:32:34.445902','2018-07-19 20:32:34.445902',1,30),('d90d-d3d2-d23d-442d','8943-d323-d23d-s2s3','Sku 3','product-1-sku-3',4,'blue','medium','Sku 3 description',0,'2018-07-19 20:33:24.111538','2018-07-19 20:33:24.111538',1,30),('d90d-dd32-d23d-442d','fd43-ffd3-d33d-s2432','Sku 3','product-3-sku-4',4,'blue','medium','Sku 3 description',0,'2018-07-19 20:33:24.111538','2018-07-19 20:33:24.111538',1,5),('d90d-dfd2-d23d-442d','fd43-ft23-d33d-s2s3','Sku 3','product-2-sku-3',4,'blue','medium','Sku 3 description',0,'2018-07-19 20:33:24.111538','2018-07-19 20:33:24.111538',1,10),('d9ed-dd32-d22d-442d','fdd3-gfd3-df3d-s432','Sku 3','product-4-sku-4',4,'blue','medium','Sku 3 description',0,'2018-07-19 20:33:24.111538','2018-07-19 20:33:24.111538',1,24);
/*!40000 ALTER TABLE `productSku` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `session` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES ('9PAdkRCyS6pj-i8Z3bUxm1yPRNG0KDbZ',1532287917,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2018-07-22T18:04:35.733Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":\"46fedfa4-0b87-4389-bff3-cd8c0d9e1ced\"}}'),('S3_Mb92_cvgBm_yxQD2mPqdqqNza7lJT',1532282295,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2018-07-22T17:58:14.906Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}');
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `DOB` date NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `role` enum('Admin','Vendor','Customer') NOT NULL DEFAULT 'Customer',
  `confirmed` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `version` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('46fedfa4-0b87-4389-bff3-cd8c0d9e1ced','duran','duranhumes@gmail.com','$argon2d$v=19$m=8192,t=4,p=2$2Y33xdAGN/shdoN/JGNtOg$sNE6AP27+LIUsDWwgjCV0WanTDR2HSnlvjDSiQso+RA','Duran','Humes','1997-10-26','Male','Customer',0,'2018-07-21 17:58:14.866396','2018-07-21 17:58:14.866396',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userCart`
--

DROP TABLE IF EXISTS `userCart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
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

-- Dump completed on 2018-07-21 15:35:49
