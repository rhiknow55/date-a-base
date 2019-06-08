CREATE DATABASE  IF NOT EXISTS `date-a-base` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `date-a-base`;
-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: 35.233.237.72    Database: date-a-base
-- ------------------------------------------------------
-- Server version	5.7.14-google

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
-- Table structure for table `Base`
--

DROP TABLE IF EXISTS `Base`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Base` (
  `baseId` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `pictureURL` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`baseId`),
  UNIQUE KEY `BaseID_UNIQUE` (`baseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Base`
--

LOCK TABLES `Base` WRITE;
/*!40000 ALTER TABLE `Base` DISABLE KEYS */;
INSERT INTO `Base` VALUES (1,'base1','asdf','base1'),(2,'base2','asdfsdf','base2'),(3,'base3','asdf','base3'),(4,'base4','gfgf','base4'),(5,'base5','sdfsdf','base5');
/*!40000 ALTER TABLE `Base` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ChatMessageHasSessionCreatedBy`
--

DROP TABLE IF EXISTS `ChatMessageHasSessionCreatedBy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ChatMessageHasSessionCreatedBy` (
  `chatMessageId` int(11) NOT NULL,
  `message` varchar(45) NOT NULL,
  `timeStamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `chatSessionId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`chatMessageId`,`chatSessionId`,`userId`),
  UNIQUE KEY `chatMessageID_UNIQUE` (`chatMessageId`),
  KEY `USERIDdfglkdjg_idx` (`userId`),
  KEY `chatsessionidsdafsdfj_idx` (`chatSessionId`),
  CONSTRAINT `chatsessionidsdafsdfj` FOREIGN KEY (`chatSessionId`) REFERENCES `ChatSession` (`chatSessionId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `useridasdfjjj` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ChatMessageHasSessionCreatedBy`
--

LOCK TABLES `ChatMessageHasSessionCreatedBy` WRITE;
/*!40000 ALTER TABLE `ChatMessageHasSessionCreatedBy` DISABLE KEYS */;
INSERT INTO `ChatMessageHasSessionCreatedBy` VALUES (1,'hello','2019-02-23 20:02:21.550000',1,1),(2,'hello','2019-06-07 23:26:33.614396',1,1),(3,'hello','2019-06-07 23:26:33.642993',1,1),(4,'hello','2019-06-07 23:26:33.670932',1,1),(5,'hello','2019-06-07 23:26:33.698169',1,1);
/*!40000 ALTER TABLE `ChatMessageHasSessionCreatedBy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ChatSession`
--

DROP TABLE IF EXISTS `ChatSession`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ChatSession` (
  `creationTimeStamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `chatSessionId` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `isReported` int(11) NOT NULL,
  PRIMARY KEY (`chatSessionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ChatSession`
--

LOCK TABLES `ChatSession` WRITE;
/*!40000 ALTER TABLE `ChatSession` DISABLE KEYS */;
INSERT INTO `ChatSession` VALUES ('2019-02-23 20:02:21.550000',1,'t1',1),('2019-02-23 20:02:21.550000',2,'t2',0),('2019-02-23 20:02:21.550000',3,'t3',0),('2019-02-23 20:02:21.550000',4,'t4',1),('2019-06-07 23:22:02.385142',5,'title5',1);
/*!40000 ALTER TABLE `ChatSession` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CommentsFromPostByUser`
--

DROP TABLE IF EXISTS `CommentsFromPostByUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `CommentsFromPostByUser` (
  `commentId` int(11) NOT NULL,
  `message` varchar(45) NOT NULL,
  `timeStamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`commentId`),
  UNIQUE KEY `CommentID_UNIQUE` (`commentId`),
  KEY `PostID_idx` (`postId`),
  KEY `UsreIDzzz_idx` (`userId`),
  CONSTRAINT `PostIDzz` FOREIGN KEY (`postId`) REFERENCES `SocialPostsCreatedByUser` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UsreIDzzz` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CommentsFromPostByUser`
--

LOCK TABLES `CommentsFromPostByUser` WRITE;
/*!40000 ALTER TABLE `CommentsFromPostByUser` DISABLE KEYS */;
INSERT INTO `CommentsFromPostByUser` VALUES (1,'nice','2019-06-07 23:27:28.597853',2,1),(2,'nice','2019-06-07 23:27:28.569382',2,1),(3,'nice','2019-06-07 23:27:28.626793',2,1),(4,'nice','2019-06-07 23:27:28.658175',2,1),(5,'nice','2019-06-07 23:27:28.685723',2,1);
/*!40000 ALTER TABLE `CommentsFromPostByUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Friendwith`
--

DROP TABLE IF EXISTS `Friendwith`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Friendwith` (
  `userId1` int(11) NOT NULL,
  `userId2` int(11) NOT NULL,
  `pH` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`userId1`,`userId2`),
  KEY `Userid2_idx` (`userId2`),
  CONSTRAINT `Userid1` FOREIGN KEY (`userId1`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Userid2` FOREIGN KEY (`userId2`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Friendwith`
--

LOCK TABLES `Friendwith` WRITE;
/*!40000 ALTER TABLE `Friendwith` DISABLE KEYS */;
INSERT INTO `Friendwith` VALUES (1,2,0),(1,3,0),(1,4,0),(1,5,0),(2,3,0);
/*!40000 ALTER TABLE `Friendwith` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReportsFromPostByUser`
--

DROP TABLE IF EXISTS `ReportsFromPostByUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ReportsFromPostByUser` (
  `reportId` int(11) NOT NULL,
  `timeStamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`reportId`),
  KEY `PostID_idx` (`postId`),
  KEY `UserIDbvnvbn_idx` (`userId`),
  CONSTRAINT `PostIDfk` FOREIGN KEY (`postId`) REFERENCES `SocialPostsCreatedByUser` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserIDtyutyutyu` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReportsFromPostByUser`
--

LOCK TABLES `ReportsFromPostByUser` WRITE;
/*!40000 ALTER TABLE `ReportsFromPostByUser` DISABLE KEYS */;
INSERT INTO `ReportsFromPostByUser` VALUES (1,'2019-06-07 23:04:04.194227',1,2),(2,'2019-06-07 23:04:04.226163',1,3),(3,'2019-06-07 23:04:04.253229',1,4),(4,'2019-06-07 23:04:04.287915',1,5),(5,'2019-06-07 23:04:04.319103',1,1);
/*!40000 ALTER TABLE `ReportsFromPostByUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SocialPostsCreatedByUser`
--

DROP TABLE IF EXISTS `SocialPostsCreatedByUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `SocialPostsCreatedByUser` (
  `postId` int(11) NOT NULL,
  `message` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `timeStamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`postId`),
  UNIQUE KEY `PostID_UNIQUE` (`postId`),
  KEY `UserID_idx` (`userId`),
  CONSTRAINT `UserID` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SocialPostsCreatedByUser`
--

LOCK TABLES `SocialPostsCreatedByUser` WRITE;
/*!40000 ALTER TABLE `SocialPostsCreatedByUser` DISABLE KEYS */;
INSERT INTO `SocialPostsCreatedByUser` VALUES (1,'hi',NULL,'2019-06-07 22:49:16.921087',1),(2,'o',NULL,'2019-06-07 23:01:05.497652',2),(3,'yo',NULL,'2019-06-07 23:01:05.523510',3),(4,'ah',NULL,'2019-06-07 23:01:05.550472',4),(5,'ello',NULL,'2019-06-07 23:01:05.576355',5);
/*!40000 ALTER TABLE `SocialPostsCreatedByUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SortingHatQuestions`
--

DROP TABLE IF EXISTS `SortingHatQuestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `SortingHatQuestions` (
  `questionId` int(11) NOT NULL,
  `question` varchar(45) NOT NULL,
  `answers` varchar(45) NOT NULL,
  PRIMARY KEY (`questionId`),
  UNIQUE KEY `QuestionID_UNIQUE` (`questionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SortingHatQuestions`
--

LOCK TABLES `SortingHatQuestions` WRITE;
/*!40000 ALTER TABLE `SortingHatQuestions` DISABLE KEYS */;
INSERT INTO `SortingHatQuestions` VALUES (1,'yes?1','yes'),(2,'yes?2','yes'),(3,'yes?3','yes'),(4,'yes?4','yes'),(5,'yes?5','yes');
/*!40000 ALTER TABLE `SortingHatQuestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SystemAdmins`
--

DROP TABLE IF EXISTS `SystemAdmins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `SystemAdmins` (
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
-- Dumping data for table `SystemAdmins`
--

LOCK TABLES `SystemAdmins` WRITE;
/*!40000 ALTER TABLE `SystemAdmins` DISABLE KEYS */;
INSERT INTO `SystemAdmins` VALUES (100,'master','123','sysadmin',NULL),(200,'master2','123','sysadmin2',NULL),(300,'master3','123','sysadmin3',NULL),(400,'master4','123','sysadmin4',NULL),(500,'master5','123','sysadmin5',NULL);
/*!40000 ALTER TABLE `SystemAdmins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Trophy`
--

DROP TABLE IF EXISTS `Trophy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Trophy` (
  `trophyId` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `pictureURL` varchar(45) NOT NULL,
  PRIMARY KEY (`trophyId`),
  UNIQUE KEY `TrophyID_UNIQUE` (`trophyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Trophy`
--

LOCK TABLES `Trophy` WRITE;
/*!40000 ALTER TABLE `Trophy` DISABLE KEYS */;
INSERT INTO `Trophy` VALUES (1,'t1','1'),(2,'t2','2'),(3,'t3','3'),(4,'t4','4'),(5,'t5','5');
/*!40000 ALTER TABLE `Trophy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserHasTrophy`
--

DROP TABLE IF EXISTS `UserHasTrophy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `UserHasTrophy` (
  `userId` int(11) NOT NULL,
  `trophyId` int(11) NOT NULL,
  PRIMARY KEY (`userId`,`trophyId`),
  KEY `TrophyIDzzz_idx` (`trophyId`),
  CONSTRAINT `TrophyIDzzz` FOREIGN KEY (`trophyId`) REFERENCES `Trophy` (`trophyId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserIDqwe` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserHasTrophy`
--

LOCK TABLES `UserHasTrophy` WRITE;
/*!40000 ALTER TABLE `UserHasTrophy` DISABLE KEYS */;
INSERT INTO `UserHasTrophy` VALUES (1,1),(1,2),(1,3),(1,4),(1,5);
/*!40000 ALTER TABLE `UserHasTrophy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserLikesPost`
--

DROP TABLE IF EXISTS `UserLikesPost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `UserLikesPost` (
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  PRIMARY KEY (`userId`,`postId`),
  KEY `postidddddd_idx` (`postId`),
  CONSTRAINT `postidddddd` FOREIGN KEY (`postId`) REFERENCES `SocialPostsCreatedByUser` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `useridasdfajj` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserLikesPost`
--

LOCK TABLES `UserLikesPost` WRITE;
/*!40000 ALTER TABLE `UserLikesPost` DISABLE KEYS */;
INSERT INTO `UserLikesPost` VALUES (1,1),(1,2),(1,3),(1,4),(1,5);
/*!40000 ALTER TABLE `UserLikesPost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Users` (
  `userId` int(11) NOT NULL,
  `loginName` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `horoscope` enum('aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces') NOT NULL,
  `log` int(11) NOT NULL,
  `birthday` date NOT NULL,
  `baseId` int(11) NOT NULL,
  `created` date NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `UserID_UNIQUE` (`userId`),
  UNIQUE KEY `LoginName_UNIQUE` (`loginName`),
  KEY `Base_idx` (`baseId`),
  CONSTRAINT `BaseID` FOREIGN KEY (`baseId`) REFERENCES `Base` (`baseId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'user1','123','user1','aries',1,'2010-01-13',1,'2010-01-13'),(2,'user2','123','user2','aries',1,'2010-01-13',1,'2010-01-13'),(3,'user3','123','user3','aries',1,'2010-01-13',1,'2010-01-13'),(4,'user4','123','user4','aries',1,'2010-01-13',1,'2010-01-13'),(5,'user5','123','user5','aries',1,'2010-01-13',1,'2010-01-13'),(6,'user6','123','user6','aries',1,'2010-01-13',1,'2010-01-13');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UsersParticipateChat`
--

DROP TABLE IF EXISTS `UsersParticipateChat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `UsersParticipateChat` (
  `userId1` int(11) NOT NULL,
  `sessionId` int(11) NOT NULL,
  `userId2` int(11) NOT NULL,
  PRIMARY KEY (`userId1`,`sessionId`,`userId2`),
  KEY `SessionID_idx` (`sessionId`),
  KEY `UserIDdfsd12_idx` (`userId2`),
  CONSTRAINT `SessionIDsdflgkj` FOREIGN KEY (`sessionId`) REFERENCES `ChatSession` (`chatSessionId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserIDdfsd12` FOREIGN KEY (`userId2`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserIDqwerrr` FOREIGN KEY (`userId1`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UsersParticipateChat`
--

LOCK TABLES `UsersParticipateChat` WRITE;
/*!40000 ALTER TABLE `UsersParticipateChat` DISABLE KEYS */;
INSERT INTO `UsersParticipateChat` VALUES (1,1,2),(2,2,3),(1,3,3),(1,4,4),(1,5,5);
/*!40000 ALTER TABLE `UsersParticipateChat` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-07 17:21:47
