-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: date-a-base
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `base`
--

DROP TABLE IF EXISTS `base`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `base` (
  `baseId` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `pictureURL` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`baseId`),
  UNIQUE KEY `BaseID_UNIQUE` (`baseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chatmessagehassessioncreatedby`
--

DROP TABLE IF EXISTS `chatmessagehassessioncreatedby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `chatmessagehassessioncreatedby` (
  `chatMessageId` int(11) NOT NULL,
  `message` varchar(45) NOT NULL,
  `timeStamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `chatSessionId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`chatMessageId`,`chatSessionId`,`userId`),
  UNIQUE KEY `chatMessageID_UNIQUE` (`chatMessageId`),
  KEY `USERIDdfglkdjg_idx` (`userId`),
  KEY `chatsessionidsdafsdfj_idx` (`chatSessionId`),
  CONSTRAINT `chatsessionidsdafsdfj` FOREIGN KEY (`chatSessionId`) REFERENCES `chatsession` (`chatSessionId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `useridasdfjjj` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chatsession`
--

DROP TABLE IF EXISTS `chatsession`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `chatsession` (
  `creationTimeStamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `chatSessionId` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `isReported` int(11) NOT NULL,
  PRIMARY KEY (`chatSessionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `commentsfrompostbyuser`
--

DROP TABLE IF EXISTS `commentsfrompostbyuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `commentsfrompostbyuser` (
  `commentId` int(11) NOT NULL,
  `message` varchar(45) NOT NULL,
  `timeStamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`commentId`),
  UNIQUE KEY `CommentID_UNIQUE` (`commentId`),
  KEY `PostID_idx` (`postId`),
  KEY `UsreIDzzz_idx` (`userId`),
  CONSTRAINT `PostIDzz` FOREIGN KEY (`postId`) REFERENCES `socialpostscreatedbyuser` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UsreIDzzz` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `friendwith`
--

DROP TABLE IF EXISTS `friendwith`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `friendwith` (
  `userId1` int(11) NOT NULL,
  `userId2` int(11) NOT NULL,
  `pH` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`userId1`,`userId2`),
  KEY `Userid2_idx` (`userId2`),
  CONSTRAINT `Userid1` FOREIGN KEY (`userId1`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Userid2` FOREIGN KEY (`userId2`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `horoscopebirthday`
--

DROP TABLE IF EXISTS `horoscopebirthday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `horoscopebirthday` (
  `id` int(11) NOT NULL,
  `horoscope` varchar(45) NOT NULL,
  `birthday` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `horoscope_UNIQUE` (`horoscope`),
  UNIQUE KEY `birthday_UNIQUE` (`birthday`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reportsfrompostbyuser`
--

DROP TABLE IF EXISTS `reportsfrompostbyuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `reportsfrompostbyuser` (
  `reportId` int(11) NOT NULL,
  `timeStamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`reportId`),
  KEY `PostID_idx` (`postId`),
  KEY `UserIDbvnvbn_idx` (`userId`),
  CONSTRAINT `PostIDfk` FOREIGN KEY (`postId`) REFERENCES `socialpostscreatedbyuser` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserIDtyutyutyu` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `socialpostscreatedbyuser`
--

DROP TABLE IF EXISTS `socialpostscreatedbyuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `socialpostscreatedbyuser` (
  `postId` int(11) NOT NULL,
  `message` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `timeStamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`postId`),
  UNIQUE KEY `PostID_UNIQUE` (`postId`),
  KEY `UserID_idx` (`userId`),
  CONSTRAINT `UserID` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sortinghatquestions`
--

DROP TABLE IF EXISTS `sortinghatquestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sortinghatquestions` (
  `questionId` int(11) NOT NULL,
  `question` varchar(45) NOT NULL,
  `answers` varchar(45) NOT NULL,
  PRIMARY KEY (`questionId`),
  UNIQUE KEY `QuestionID_UNIQUE` (`questionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `systemadmins`
--

DROP TABLE IF EXISTS `systemadmins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `systemadmins` (
  `userId` int(11) NOT NULL,
  `loginName` varchar(255) NOT NULL,
  `password` varchar(32) NOT NULL,
  `username` varchar(25) NOT NULL,
  `emailAdress` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `UserID_UNIQUE` (`userId`),
  UNIQUE KEY `LoginName_UNIQUE` (`loginName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trophy`
--

DROP TABLE IF EXISTS `trophy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `trophy` (
  `trophyId` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `pictureURL` varchar(45) NOT NULL,
  PRIMARY KEY (`trophyId`),
  UNIQUE KEY `TrophyID_UNIQUE` (`trophyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userhastrophy`
--

DROP TABLE IF EXISTS `userhastrophy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `userhastrophy` (
  `userId` int(11) NOT NULL,
  `trophyId` int(11) NOT NULL,
  PRIMARY KEY (`userId`,`trophyId`),
  KEY `TrophyIDzzz_idx` (`trophyId`),
  CONSTRAINT `TrophyIDzzz` FOREIGN KEY (`trophyId`) REFERENCES `trophy` (`trophyId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserIDqwe` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userlikespost`
--

DROP TABLE IF EXISTS `userlikespost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `userlikespost` (
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  PRIMARY KEY (`userId`,`postId`),
  KEY `postidddddd_idx` (`postId`),
  CONSTRAINT `postidddddd` FOREIGN KEY (`postId`) REFERENCES `socialpostscreatedbyuser` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `useridasdfajj` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `loginName` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `log` int(11) NOT NULL,
  `birthday` date NOT NULL,
  `baseId` int(11) NOT NULL,
  `created` date NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `UserID_UNIQUE` (`userId`),
  UNIQUE KEY `LoginName_UNIQUE` (`loginName`),
  KEY `Base_idx` (`baseId`),
  CONSTRAINT `BaseID` FOREIGN KEY (`baseId`) REFERENCES `base` (`baseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usersparticipatechat`
--

DROP TABLE IF EXISTS `usersparticipatechat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usersparticipatechat` (
  `userId1` int(11) NOT NULL,
  `sessionId` int(11) NOT NULL,
  `userId2` int(11) NOT NULL,
  PRIMARY KEY (`userId1`,`sessionId`,`userId2`),
  KEY `SessionID_idx` (`sessionId`),
  KEY `UserIDdfsd12_idx` (`userId2`),
  CONSTRAINT `SessionIDsdflgkj` FOREIGN KEY (`sessionId`) REFERENCES `chatsession` (`chatSessionId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserIDdfsd12` FOREIGN KEY (`userId2`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserIDqwerrr` FOREIGN KEY (`userId1`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-19 23:48:41
