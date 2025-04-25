-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: arcadiadb
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `animal`
--

DROP TABLE IF EXISTS `animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prenom` varchar(100) NOT NULL,
  `habitat_id` int NOT NULL,
  `race_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `habitat_id` (`habitat_id`),
  KEY `race_id` (`race_id`),
  CONSTRAINT `animal_ibfk_1` FOREIGN KEY (`habitat_id`) REFERENCES `habitat` (`id`),
  CONSTRAINT `animal_ibfk_2` FOREIGN KEY (`race_id`) REFERENCES `race` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal`
--

LOCK TABLES `animal` WRITE;
/*!40000 ALTER TABLE `animal` DISABLE KEYS */;
INSERT INTO `animal` VALUES (3,'Simba',3,1),(12,'Zawadi',3,7),(13,'Paco',2,8),(14,'Niko',2,9),(15,'Rafiki',3,10),(16,'Tambo',3,11),(18,'Maya',2,12),(19,'Kiko',2,8);
/*!40000 ALTER TABLE `animal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animal_image`
--

DROP TABLE IF EXISTS `animal_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `animal_id` int NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `animal_image_ibfk_1` (`animal_id`),
  CONSTRAINT `animal_image_ibfk_1` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal_image`
--

LOCK TABLES `animal_image` WRITE;
/*!40000 ALTER TABLE `animal_image` DISABLE KEYS */;
INSERT INTO `animal_image` VALUES (6,3,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743621128/zoo-arcadia/animals/vclqjpezf4ydagfawnq5.avif'),(7,3,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743621128/zoo-arcadia/animals/xwbsddg74w1xj4onxzcd.jpg'),(8,3,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743621129/zoo-arcadia/animals/bwuffjyxbf1ssnpykbmt.jpg'),(11,12,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743683672/zoo-arcadia/animals/w26drkds4rtabzdlpu1n.webp'),(14,12,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743683673/zoo-arcadia/animals/f219zhvxxcoch3pd2fng.webp'),(16,12,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743683674/zoo-arcadia/animals/kw3otdcnbnvbsxxgomlj.jpg'),(17,13,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743685769/zoo-arcadia/animals/x95hep3nk07holjovkve.jpg'),(18,13,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743685771/zoo-arcadia/animals/ylkkd1azad3dpe3xqqcf.jpg'),(19,13,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743685771/zoo-arcadia/animals/buhpzsojxmy070mdkwkq.jpg'),(20,14,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743686342/zoo-arcadia/animals/c0pdr6fzws7oaa8kf1of.jpg'),(21,14,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743686342/zoo-arcadia/animals/iswjjpkdzneil0vkg3rk.webp'),(22,14,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743686343/zoo-arcadia/animals/qtdkjudltuukj9n9ysby.jpg'),(23,15,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743687132/zoo-arcadia/animals/jjxq7rp8gug5ju5xoqw1.jpg'),(24,16,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743954643/zoo-arcadia/animals/xjxy0arbtxpewf0pnhur.jpg'),(25,16,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743954644/zoo-arcadia/animals/vwxsuinbaaz42tujlaez.jpg'),(26,16,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743954646/zoo-arcadia/animals/xezrcdiz9tq0afuif0nm.jpg'),(30,18,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743956776/zoo-arcadia/animals/vjxgiobgey1dz4xhqiqk.jpg'),(31,18,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743956777/zoo-arcadia/animals/z2nn13k6fjs3bwxk8rwy.jpg'),(32,18,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743956777/zoo-arcadia/animals/ojlkx0qi6qlfv1ewfq2c.webp'),(33,19,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743960111/zoo-arcadia/animals/dgx45dtjtizefhkjwb2n.jpg'),(34,19,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743960112/zoo-arcadia/animals/w0wlt9vzqmw6jyjnbxsi.jpg'),(35,19,'https://res.cloudinary.com/dxuxu6oig/image/upload/v1743960113/zoo-arcadia/animals/djhw1krnkkfhd85o1vc0.jpg');
/*!40000 ALTER TABLE `animal_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avis`
--

DROP TABLE IF EXISTS `avis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `avis_text` text NOT NULL,
  `est_valide` tinyint(1) DEFAULT '0',
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP,
  `valide_par` int DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `valide_par` (`valide_par`),
  CONSTRAINT `avis_ibfk_1` FOREIGN KEY (`valide_par`) REFERENCES `utilisateur` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avis`
--

LOCK TABLES `avis` WRITE;
/*!40000 ALTER TABLE `avis` DISABLE KEYS */;
INSERT INTO `avis` VALUES (3,'Kouadio','Brice','Un endroit paisible et respectueux de la nature, bravo !',1,'2025-04-07 05:00:27',NULL,'https://ui-avatars.com/api/?name=Brice+Kouadio&background=random&size=128'),(4,'Ouattara','Nanwokan','Meilleure visite de ma vie !',1,'2025-04-07 06:01:16',NULL,'https://ui-avatars.com/api/?name=Nanwokan+Ouattara&background=random&size=128'),(6,'Traore','Lamine','Très propre et bien organisé. Je recommande vivement.',1,'2025-04-07 06:20:27',NULL,'https://ui-avatars.com/api/?name=Lamine+Traore&background=random&size=128'),(7,'Moreau','Julie ','Magnifique expérience au milieu des animaux exotiques !',1,'2025-04-07 06:20:46',NULL,'https://ui-avatars.com/api/?name=Julie%20+Moreau&background=random&size=128'),(15,'Garnier','Fatou','Belle diversité d’animaux, on sent que tout est bien entretenu.',0,'2025-04-07 17:55:24',NULL,'https://ui-avatars.com/api/?name=Fatou+Garnier&background=random&size=128');
/*!40000 ALTER TABLE `avis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentaire_habitat`
--

DROP TABLE IF EXISTS `commentaire_habitat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentaire_habitat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `habitat_id` int NOT NULL,
  `veterinaire_id` int NOT NULL,
  `commentaire` text NOT NULL,
  `date_commentaire` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `habitat_id` (`habitat_id`),
  KEY `veterinaire_id` (`veterinaire_id`),
  CONSTRAINT `commentaire_habitat_ibfk_1` FOREIGN KEY (`habitat_id`) REFERENCES `habitat` (`id`),
  CONSTRAINT `commentaire_habitat_ibfk_2` FOREIGN KEY (`veterinaire_id`) REFERENCES `utilisateur` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentaire_habitat`
--

LOCK TABLES `commentaire_habitat` WRITE;
/*!40000 ALTER TABLE `commentaire_habitat` DISABLE KEYS */;
INSERT INTO `commentaire_habitat` VALUES (2,3,2,'Bien entretenu','2025-04-07 01:52:20'),(3,2,2,'Parfait !','2025-04-07 02:12:20');
/*!40000 ALTER TABLE `commentaire_habitat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_log`
--

DROP TABLE IF EXISTS `food_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `animal_id` int NOT NULL,
  `employe_id` int NOT NULL,
  `nourriture` varchar(255) NOT NULL,
  `quantite` decimal(6,2) NOT NULL,
  `date_don` date NOT NULL,
  `heure_don` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `animal_id` (`animal_id`),
  KEY `employe_id` (`employe_id`),
  CONSTRAINT `food_log_ibfk_1` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`id`),
  CONSTRAINT `food_log_ibfk_2` FOREIGN KEY (`employe_id`) REFERENCES `utilisateur` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_log`
--

LOCK TABLES `food_log` WRITE;
/*!40000 ALTER TABLE `food_log` DISABLE KEYS */;
INSERT INTO `food_log` VALUES (1,3,3,'Poulet',2.00,'2025-03-28','11:00:00'),(2,3,3,'Viande fraîche',3.50,'2025-04-07','12:00:00'),(3,13,3,'Banane',0.90,'2025-04-07','19:50:00');
/*!40000 ALTER TABLE `food_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitat`
--

DROP TABLE IF EXISTS `habitat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nom` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitat`
--

LOCK TABLES `habitat` WRITE;
/*!40000 ALTER TABLE `habitat` DISABLE KEYS */;
INSERT INTO `habitat` VALUES (2,'Jungle tropicale','Plongez au cœur d’une végétation luxuriante dans notre habitat jungle, inspiré des forêts tropicales d’Amérique du Sud. Lianes, feuillages denses, chants d’oiseaux exotiques et humidité maîtrisée forment un écrin de verdure où cohabitent singes, panthères et perroquets multicolores dans un écosystème vivant et respecté.','https://res.cloudinary.com/dxuxu6oig/image/upload/v1743611986/zoo-arcadia/habitats/sdnkguscw3gzbudykraf.avif'),(3,'Savane Africaine','Étendue vaste et lumineuse, la savane d’Arcadia reproduit fidèlement l’environnement des grandes plaines africaines. Avec ses herbes hautes dorées par le soleil et ses points d’eau stratégiquement placés, elle offre à nos animaux un cadre spacieux et naturel. Vous y trouverez des girafes majestueuses, des éléphants puissants, ainsi que des lions, rois de cette étendue dorée.','https://res.cloudinary.com/dxuxu6oig/image/upload/v1743612755/zoo-arcadia/habitats/asj8bfwojvleb7t2ercg.jpg');
/*!40000 ALTER TABLE `habitat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `race`
--

DROP TABLE IF EXISTS `race`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `race` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `race`
--

LOCK TABLES `race` WRITE;
/*!40000 ALTER TABLE `race` DISABLE KEYS */;
INSERT INTO `race` VALUES (3,'Anaconda vert'),(10,'Babouin olive'),(6,'Cheval'),(11,'Éléphant'),(7,'Girafe réticulée'),(1,'Lion'),(2,'Metazoa'),(4,'Reptile'),(9,'Serpent boa constricteur'),(8,'Singe capucin'),(12,'Tigre du Bengale');
/*!40000 ALTER TABLE `race` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rapport_veterinaire`
--

DROP TABLE IF EXISTS `rapport_veterinaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rapport_veterinaire` (
  `id` int NOT NULL AUTO_INCREMENT,
  `animal_id` int NOT NULL,
  `veterinaire_id` int NOT NULL,
  `etat` varchar(255) DEFAULT NULL,
  `nourriture` varchar(255) DEFAULT NULL,
  `grammage` decimal(6,2) DEFAULT NULL,
  `date_passage` datetime DEFAULT CURRENT_TIMESTAMP,
  `detail` text,
  PRIMARY KEY (`id`),
  KEY `animal_id` (`animal_id`),
  KEY `veterinaire_id` (`veterinaire_id`),
  CONSTRAINT `rapport_veterinaire_ibfk_1` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`id`),
  CONSTRAINT `rapport_veterinaire_ibfk_2` FOREIGN KEY (`veterinaire_id`) REFERENCES `utilisateur` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rapport_veterinaire`
--

LOCK TABLES `rapport_veterinaire` WRITE;
/*!40000 ALTER TABLE `rapport_veterinaire` DISABLE KEYS */;
INSERT INTO `rapport_veterinaire` VALUES (1,3,2,'Bonne santé','Viande crue',1.80,'2025-03-29 00:16:02','Poids stable, pas de blessure.'),(2,3,2,'Bonne santé','Viande',2.00,'2025-03-29 00:16:40','Poids stable, pas de blessure.'),(3,13,2,'Bonne sante','Banane',1.00,'2025-04-06 00:46:43','En pleine forme!'),(4,18,2,'Bonne sante','Viande',1.53,'2025-04-06 19:32:04','azertttttt ttttttttttttttttttt ttttttttttttttttttttttt tttttttttttttttttttttt  tttttttttttttttt tttttttttttttttttttt');
/*!40000 ALTER TABLE `rapport_veterinaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'administrateur'),(2,'employe'),(3,'veterinaire');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nom` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (3,'Restauration','Service de vente de snacks et boissons','https://res.cloudinary.com/dxuxu6oig/image/upload/v1743386048/zoo-arcadia/services/x9zfbwjz7wqcsjtriepm.webp'),(4,'Visite Guidée à Pied','Pour les plus curieux, rejoignez l’un de nos guides passionnés pour une visite immersive à pied. En petit groupe, découvrez les secrets du parc, des espèces rares, et apprenez-en davantage sur nos actions écologiques, la préservation animale et les soins apportés au quotidien.','https://res.cloudinary.com/dxuxu6oig/image/upload/v1743613644/zoo-arcadia/services/zmiaamkuv1ddx91so9w2.jpg'),(5,'Visite en Petit Train','Profitez d’une balade guidée en petit train électrique à travers tout le parc. Ce moyen de transport doux, silencieux et non polluant vous permet d’admirer les habitats et les animaux sans effort, tout en écoutant des anecdotes enrichissantes sur les pensionnaires du zoo.','https://res.cloudinary.com/dxuxu6oig/image/upload/v1743613832/zoo-arcadia/services/x5f5kn4a1cdauygtxzfg.jpg');
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `photo_profil_url` varchar(255) DEFAULT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES (1,'jose.durand@gmail.com','$2b$10$OYEOWNEl1d5c/20UXK7EKOKngICqNmxI4GBb8UDbrRF6cYaMwmMC.','Durand','Jose','https://res.cloudinary.com/dxuxu6oig/image/upload/v1743371402/zoo-arcadia/profils/zygypxnlu0xqtjmpapef.png',1),(2,'clairelydieouattara@gmail.com','$2b$10$mGHvgtfcyPqtkATZbQtUtuU3C8P1a2sn1Zu2iqlGNJJbpAyRXNIAC','Ouattara','Nanwokan','https://res.cloudinary.com/dxuxu6oig/image/upload/v1743682841/zoo-arcadia/profils/krk7wgzum4pbvxp8wrxr.png',3),(3,'christian.ehui@gmail.com','$2b$10$hLSGsXRmwjDtQ.X.dwm/6uGvFy5BadF/D1A7WdupG.AnOktaro6CW','Ehui','Christian','https://ui-avatars.com/api/?name=CE&background=random&bold=true&size=256',2),(9,'olyndavalerie@gmail.com','$2b$10$A0.R0e.qQ5lRqbpwDZOt1./ng5LAULTT/6/afXEmdApnbGzYtO8K2','Ouattara','Lynda','https://ui-avatars.com/api/?name=LO&background=random&bold=true&size=256',3);
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-25 22:37:45
