-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2020 at 12:08 PM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mytest`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE IF NOT EXISTS `chat` (
  `sno` int(11) NOT NULL AUTO_INCREMENT,
  `sender` varchar(50) NOT NULL,
  `reciever` varchar(50) NOT NULL,
  `message` mediumtext NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`sno`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`sno`, `sender`, `reciever`, `message`, `date`) VALUES
(1, 'shivikasingla67@gmail.com', 'jyotsna@chitkara.edu.in', 'Hello ma''am i have a doubt in CSA?', '2020-05-19 11:23:12'),
(2, 'shivikasingla67@gmail.com', 'jyotsna12@chitkara.edu.in', 'Hello', '2020-05-20 11:11:25'),
(3, 'shivikasingla67@gmail.com', 'aakansha@chitkara.edu.in', 'Hellm Ma''am i have doubt in ADBMS?', '2020-05-21 12:19:30'),
(4, 'shivikasingla67@gmail.com', 'jyotsna@chitkara.edu.in', 'Hello!!!!Whatsupp', '2020-05-22 07:24:04'),
(5, 'jyotsna@chitkara.edu.in', 'shivikasingla67@gmail.com', 'Yes!!!', '2020-05-21 05:20:10');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
