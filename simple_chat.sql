-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 25 oct. 2018 à 21:36
-- Version du serveur :  5.7.19
-- Version de PHP :  5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `simple_chat`
--

-- --------------------------------------------------------

--
-- Structure de la table `lobby`
--

DROP TABLE IF EXISTS `lobby`;
CREATE TABLE IF NOT EXISTS `lobby` (
  `Id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `lobby`
--

INSERT INTO `lobby` (`Id`, `name`) VALUES
(1, 'Test'),
(2, 'Cool'),
(3, 'Lobby 2'),
(4, 'yollo');

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `Id` smallint(6) NOT NULL AUTO_INCREMENT,
  `Id_lobby` smallint(6) NOT NULL,
  `Id_user` smallint(6) NOT NULL,
  `Message` text NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`Id`, `Id_lobby`, `Id_user`, `Message`) VALUES
(34, 3, 30, 'Wow!'),
(35, 3, 30, 'dfg'),
(36, 3, 31, 'k'),
(37, 3, 30, 'k'),
(38, 3, 31, 'lol'),
(39, 3, 30, 'biy'),
(40, 3, 30, 'sdf'),
(41, 3, 30, 'sdfsdf'),
(42, 4, 30, 'YOOOOOO!'),
(43, 4, 31, 'Heyyyyy!');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `Id` smallint(6) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`Id`, `nickname`, `password`) VALUES
(29, 'Jean', 'sha1$f140338e$1$7ed4509562b2273bda0db1dc171ded7638eaafdb'),
(30, 'Dave', 'sha1$e1fdd702$1$a061781a65d489932ee571452ce29085c9d4b02a'),
(31, 'Jacques', 'sha1$729e9387$1$cadbe3da8367af33f6897acb450a082cb775ed83');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
