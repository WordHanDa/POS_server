-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2026 年 05 月 09 日 16:12
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `POS_server`
--

-- --------------------------------------------------------

--
-- 資料表結構 `EVENT`
--

CREATE TABLE `EVENT` (
  `EVENT_ID` int(11) NOT NULL,
  `EVENT_START_DATE` date DEFAULT NULL,
  `EVENT_END_DATE` varchar(255) DEFAULT NULL,
  `EVENT_CONTANT` varchar(255) DEFAULT NULL,
  `EVENT_NOTE` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `EVENT`
--

INSERT INTO `EVENT` (`EVENT_ID`, `EVENT_START_DATE`, `EVENT_END_DATE`, `EVENT_CONTANT`, `EVENT_NOTE`) VALUES
(1, '2026-05-06', '2026-05-10', '測試活動內容1', '這是一筆測試資料');

-- --------------------------------------------------------

--
-- 資料表結構 `ITEM`
--

CREATE TABLE `ITEM` (
  `ITEM_ID` int(11) NOT NULL,
  `ITEM_NAME` varchar(128) NOT NULL,
  `ITEM_PRICE` decimal(10,2) NOT NULL DEFAULT 0.00,
  `Description` varchar(1024) DEFAULT NULL,
  `PICTURE_URL` varchar(512) DEFAULT NULL,
  `Type` varchar(256) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `ITEM`
--

INSERT INTO `ITEM` (`ITEM_ID`, `ITEM_NAME`, `ITEM_PRICE`, `Description`, `PICTURE_URL`, `Type`, `is_active`) VALUES
(1, 'High Ball', 200.00, 'Japanese whisky with soda and citrus peel', '', 'SPARKLING', 1),
(2, 'Whisky Coke', 200.00, 'Whisky with cola', NULL, 'SPARKLING', 1),
(3, 'One Spirits Shot', 70.00, 'Vodka / Whisky / Tequila / Rum/ Gin', '', 'SHOTS', 1),
(4, 'Sakura-bare 櫻晴', 100.00, '以特選日本酒為基底，融合橙香與櫻花芬芳，綻放出如春日晴空般柔和雅緻的風味。<br />\nKubota Senju sake with Cointreau, and cherry blossoms', '', 'SIGNATURE', 1),
(5, 'KI NO BI (15ml)', 200.00, '以日本純米製成的清酒作為烈酒原料，再用半年時間去挑選日本最優質的原料。採用11種來自日本不同季節草本植物及辛香料如京都老舖的玉露、柚子、檜木、山椒、檸檬皮等材料，蒸餾出六種不同風味的原酒，再按「伏見之水」調配出季之美。abv:45%', 'img/kinobi.png', 'TASTING_GIN', 1),
(6, 'KI NO BI (30ml)', 300.00, '', '/img/kinobi.png', 'TASTING_GIN', 1),
(7, 'Gin Tonic', 200.00, 'Gin with tonic water', '', 'SPARKLING', 1),
(8, 'Cuba Libre 自由古巴', 200.00, 'Rum with cola', '', 'SPARKLING', 1),
(9, 'Old Fashioned', 250.00, 'Whisky with sugar, bitter and citrus peel', '', 'CLASSIC', 1),
(10, 'God Father 教父', 250.00, 'Scotch Whisky and Amaretto', '', 'CLASSIC', 1),
(11, 'Jash', 10.00, '皮炎好養', 'img/kinotou.png', 'TASTING_WHISKEY', 1),
(12, 'Jash', 100.00, '', '', 'TASTING_WHISKEY', 1),
(13, '瘋狂鑽石', 350.00, '屁眼', '', 'SIGNATURE', 1),
(14, '瘋狂鑽石-2', 350.00, '屁眼', '', 'SIGNATURE', 0),
(16, 'Gin Fizz', 250.00, 'Gin with lemon juice, syrup and soda', '', 'SPARKLING', 1),
(17, 'El Diablo', 250.00, 'Tequila with cassis liqueur, lemon juice and Ginger Soda', '', 'SPARKLING', 1),
(18, 'Screwdriver 螺絲起子', 200.00, 'Vodka with orange juice', '', 'CLASSIC', 1),
(19, 'Sidecar 側車', 250.00, 'Brandy with Cointreau and lemon juice', '', 'CLASSIC', 1),
(20, 'Gimlet 琴蕾', 250.00, 'Gin with lemon juice and syrup', '', 'CLASSIC', 1),
(21, 'White Lady 白色佳人', 250.00, 'Gin with Cointreau and lemon juice', '', 'CLASSIC', 1),
(22, 'Whisky Sour', 250.00, 'Whisky with syrup and lemon juice', '', 'CLASSIC', 1),
(23, 'Silent Third 沉默第三者', 250.00, 'Whisky with Cointreau and lemon juice', '', 'CLASSIC', 1),
(24, 'Daiquiri 黛綺莉', 250.00, 'Rum with lemon juice and syrup', '', 'CLASSIC', 1),
(25, 'X.Y.Z', 250.00, 'Rum with Cointreau, lemon juice and syrup', '', 'CLASSIC', 1),
(26, 'Margarita 瑪格麗特', 250.00, 'Tequila with Cointreau and lemon juice', '', 'CLASSIC', 1),
(27, 'Kamikaze 神風特攻隊', 250.00, 'Vodka with Cointreau and lemon juice', '', 'CLASSIC', 1),
(28, 'Jasmine 茉莉', 250.00, 'Gin with Cointreau, Campari and lemon juice ', '', 'CLASSIC', 1),
(29, 'Hanatsubaki 山茶花', 300.00, 'Brandy with Raspberry liqueur, Cassis liqueur and lemon juice', '', 'CLASSIC', 1),
(30, 'Paper Plane 紙飛機', 300.00, 'Bitter sweet with flavorful citrus & herbal taste.\nBourbon Whiskey with Amaro and Aperol', '', 'CLASSIC', 1),
(31, 'Amaretto Sour 杏仁酸', 300.00, 'Amaretto liqueur, Lemon juice and Bitters', '', 'CLASSIC', 1),
(32, 'Bee’s Knees 蜂之膝', 300.00, 'Gin with lemon and honey syrup', '', 'CLASSIC', 1),
(33, 'Canchanchara', 300.00, 'Rum with Honey and Lemon juice ', '', 'CLASSIC', 1),
(34, 'Aviation ', 350.00, 'Gin with Maraschino liqueur, Lemon juice and Violette liqueur ', '', 'CLASSIC', 1),
(35, 'Applejack Rabbit', 350.00, 'Taste like biting an Golden apple.\nCalvados with Orange juice, Lemon juice and Maple syrup', '', 'CLASSIC', 1),
(36, 'Holunder  gin fizz', 250.00, 'Gin with Holunder syrup, Lime juice, Soda water.', '', 'SPARKLING', 1),
(37, 'Broken Thron', 350.00, '波本桶威士忌帶來的奶油香氣加上莓果利口酒帶來酸甜滋味。\nOmar 波本桶、Cinzano Rosso Vermouth、liquer、lime juice', '', 'SIGNATURE', 1),
(38, 'Envy', 350.00, '臺灣琴酒加上百香果、西瓜和蜂蜜，再加上氣泡，清爽風味一試便知。\n獅誠綠琴酒、A&H百香果利口酒、冷凍濃縮小玉西瓜汁、蜂蜜&氣泡水', '', 'SIGNATURE', 1),
(39, 'Sloth', 350.00, '芒果被鮮奶油與巧克力所包覆，宛如具有酒精的奶昔一般。\n愛文芒果、鮮奶油、巧克力利口酒、白蘭地', '', 'SIGNATURE', 1),
(40, 'Dry Daiquiri', 350.00, 'Rum ,Campari meet passionfruit.', '', 'CLASSIC', 1),
(41, 'Manhattan', 300.00, 'Woodford Rye Whiskey, 1757 Rosso Vermouth, Angustura Citrus Bitter.', '', 'CLASSIC', 1),
(42, 'Greed', 350.00, 'Coffee, Passionfruit Cordial, Lime juice, Honey', '', 'SIGNATURE', 1),
(43, 'Division Bell', 350.00, 'Mezcal帶來的煙燻乳酸感和Aperol的柑橘調性美妙相合，再加上Maraschino微妙的藥草、花香調性；相當適合點來一試\nMezcal,Aperol,Maraschino & lime juice', '', 'CLASSIC', 1),
(44, 'Mosquito', 350.00, 'Mezcal帶來的煙燻乳酸感和Campari的柑橘苦味，以及薑汁糖漿的辛香料調性巧妙結合；若對薑的辛辣味並不排斥，或許可以點來一試\nMezcal,Campari,Ginger Syrup & lime juice', '', 'CLASSIC', 1),
(45, 'Pimm\'s Cup皮姆之杯', 350.00, '英國最知名的調酒，清爽的風味、沁涼的氣泡，最適合夏天來上一杯\nPimm\'s No.1, Lime juice, Ginger ale, Ginger syrup(optional)', '', 'CLASSIC', 1),
(46, 'Tea Tonic', 250.00, '在經典的Gin Tonic中，品味迷人茶香\n(備註選茶：1. 芭樂芯茶   2. 台東紅烏龍)', '', 'SIGNATURE', 1),
(47, 'Tea Soda', 250.00, '在經典的Gin Soda中，品味迷人茶香\n(備註選茶：1. 芭樂芯茶   2. 台東紅烏龍)', '', 'SIGNATURE', 1),
(48, 'Penicillin盤尼西林', 350.00, '泥煤威士忌淡淡的煙燻與蜂蜜的甜美及薑汁的辛辣揉合在一起，適合喜歡煙燻味的你/妳(薑味、煙燻味可再做調整)\nPeated Whiskey, Ginger syruo, Honey & Sour', '', 'CLASSIC', 1),
(53, 'Blood & Sand 血與沙', 300.00, '取名自1922年同名小說改編默劇電影《碧血黃沙》，講述一名鬥牛士走向輝煌和悲劇的人生。\n材料中的櫻桃白蘭地代表著血，而柳橙汁則代表著沙；整體的風味較為濃郁。\nScotch Whiskey, Cherry Heering, Rosso Vermouth & Orange juice', '', 'CLASSIC', 1),
(54, 'Garibaldi', 250.00, 'Campari的柑橘苦調和柳橙汁的香甜，巧妙融合；\n口味簡單清爽，酒感低，適合做為晚上的第一杯調酒。\nCampari & Orange Juice', '', 'CLASSIC', 1),
(55, 'Coffee Martini', 300.00, '\"Wake me up, Then fuck me up.\"\n使用手沖濃縮，相較外面的Espresso Martini的咖啡糖、醇厚感，\n更注重於表現咖啡本味的花果調性。\n本次選豆:衣索比亞  希達馬 Mirriga處理站 奇蹟批次 日曬\nCoffee, Sugar, Vodka', '', 'CLASSIC', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `ORDER`
--

CREATE TABLE `ORDER` (
  `ORDER_ID` int(11) NOT NULL,
  `SEAT_ID` int(11) NOT NULL,
  `ORDER_MOUNT` decimal(10,2) NOT NULL DEFAULT 0.00,
  `ORDER_DATE` timestamp NOT NULL DEFAULT current_timestamp(),
  `NOTE` varchar(256) DEFAULT NULL,
  `SEND` tinyint(4) NOT NULL DEFAULT 0,
  `settle` tinyint(4) DEFAULT 0,
  `DISCOUNT` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `ORDER`
--

INSERT INTO `ORDER` (`ORDER_ID`, `SEAT_ID`, `ORDER_MOUNT`, `ORDER_DATE`, `NOTE`, `SEND`, `settle`, `DISCOUNT`) VALUES
(1, 1, 100.00, '2026-01-04 06:39:45', 's', 1, 1, 0.00),
(2, 1, 200.00, '2026-01-04 09:44:40', '', 1, 1, 0.00),
(3, 1, 100.00, '2026-01-04 09:57:01', '', 1, 1, 0.00),
(4, 1, 100.00, '2026-01-04 09:58:54', '', 1, 1, 0.00),
(5, 1, 200.00, '2026-01-04 10:07:21', '', 1, 1, 0.00),
(6, 1, 100.00, '2026-01-04 10:07:35', '', 1, 1, 0.00),
(7, 1, 100.00, '2026-01-04 09:57:01', '', 1, 1, 0.00),
(8, 1, 100.00, '2026-01-04 16:16:17', '', 1, 1, 0.00),
(9, 1, 100.00, '2026-01-04 16:16:48', '', 1, 1, 0.00),
(10, 1, 100.00, '2026-01-04 16:27:49', '', 1, 1, 0.00),
(11, 1, 100.00, '2026-01-04 16:30:05', '', 1, 1, 0.00),
(12, 1, 200.00, '2026-01-04 16:30:21', '', 1, 1, 0.00),
(14, 2, 0.00, '2026-01-04 16:36:34', '', 1, 1, 0.00),
(15, 1, 200.00, '2026-01-05 12:43:57', '掃碼自助手機點餐', 1, 1, 0.00),
(16, 1, 200.00, '2026-01-05 12:44:21', '掃碼自助手機點餐', 1, 1, 0.00),
(17, 1, 200.00, '2026-01-05 12:51:04', '手機點餐', 1, 1, 0.00),
(18, 1, 400.00, '2026-01-05 12:54:18', '掃碼點餐', 1, 1, 0.00),
(19, 1, 400.00, '2026-01-05 13:03:05', '手機點餐', 1, 1, 0.00),
(20, 1, 400.00, '2026-01-05 13:03:49', '手機點餐', 1, 1, 0.00),
(21, 1, 200.00, '2026-01-05 13:08:16', '手機點餐', 1, 1, 0.00),
(22, 1, 200.00, '2026-01-05 13:11:26', '手機點餐', 1, 1, 0.00),
(23, 1, 200.00, '2026-01-05 13:13:51', '手機點餐', 1, 1, 0.00),
(24, 1, 200.00, '2026-01-05 13:17:50', '手機點餐undefined', 1, 1, 0.00),
(25, 1, 200.00, '2026-01-05 13:17:59', '手機點餐aaa', 1, 1, 0.00),
(26, 1, 200.00, '2026-01-05 13:19:11', '手機下單', 1, 1, 0.00),
(29, 1, 200.00, '2026-01-05 13:34:36', '手機點餐', 1, 1, 0.00),
(30, 2, 200.00, '2026-01-05 13:46:02', '手機自助點餐', 1, 1, 0.00),
(31, 1, 200.00, '2026-01-05 14:04:11', '手機自助點餐', 1, 1, 0.00),
(33, 1, 200.00, '2026-01-06 09:22:15', '手機自助點餐', 1, 1, 0.00),
(34, 1, 200.00, '2026-01-06 09:23:21', '手機自助點餐', 1, 1, 0.00),
(35, 1, 300.00, '2026-01-06 09:30:55', '手機自助點餐', 1, 1, 0.00),
(36, 1, 70.00, '2026-01-06 09:31:27', '手機自助點餐', 1, 1, 0.00),
(37, 1, 70.00, '2026-01-06 09:32:29', '手機自助點餐', 1, 1, 0.00),
(38, 1, 200.00, '2026-01-06 09:34:01', '手機自助點餐', 1, 1, 0.00),
(39, 1, 200.00, '2026-01-06 09:50:43', '手機自助點餐', 1, 1, 0.00),
(40, 1, 200.00, '2026-01-06 09:51:02', '手機自助點餐', 1, 1, 0.00),
(41, 1, 200.00, '2026-01-06 09:59:45', '手機自助點餐', 1, 1, 0.00),
(42, 1, 200.00, '2026-01-06 10:00:58', '手機自助點餐', 1, 1, 0.00),
(43, 1, 200.00, '2026-01-06 10:05:06', '手機自助點餐', 1, 1, 0.00),
(44, 1, 70.00, '2026-01-06 10:07:23', 'aaaaaaaa', 1, 1, 0.00),
(45, 1, 200.00, '2026-01-06 10:09:28', '皮炎', 1, 1, 0.00),
(46, 1, 200.00, '2026-01-06 10:17:47', '手機自助點餐', 1, 1, 0.00),
(47, 1, 200.00, '2026-01-06 10:18:51', '手機自助點餐', 1, 1, 0.00),
(48, 1, 200.00, '2026-01-06 10:25:09', 'PY', 1, 1, 0.00),
(49, 1, 200.00, '2026-01-06 10:26:42', 'PY', 1, 1, 0.00),
(50, 1, 400.00, '2026-01-06 10:27:21', 'PY', 1, 1, 0.00),
(51, 1, 200.00, '2026-01-06 10:41:05', 'qqqedgre', 1, 1, 0.00),
(52, 1, 200.00, '2026-01-06 10:55:01', '手機自助點餐', 1, 1, 0.00),
(53, 1, 200.00, '2026-01-06 11:15:36', '123', 1, 1, 0.00),
(55, 1, 190.00, '2026-01-06 13:44:59', NULL, 1, 1, 10.00),
(56, 1, 180.00, '2026-01-06 14:44:36', '', 1, 1, 0.00),
(57, 1, 390.00, '2026-01-06 15:00:59', NULL, 1, 1, 10.00),
(59, 0, 70.00, '2026-01-06 15:06:44', '', 1, 1, 0.00),
(60, 1, 200.00, '2026-01-07 09:19:37', '手機自助點餐', 1, 1, 0.00),
(61, 1, 200.00, '2026-01-07 11:23:43', '手機自助點餐', 1, 1, 0.00),
(62, 1, 200.00, '2026-01-07 11:27:35', '皮炎', 1, 1, 0.00),
(63, 1, 200.00, '2026-01-07 14:19:50', '皮炎', 1, 1, 0.00),
(64, 1, 900.00, '2026-01-07 15:22:03', '手機自助點餐', 1, 1, 0.00),
(65, 1, 70.00, '2026-01-07 15:28:07', '手機自助點餐', 1, 1, 0.00),
(66, 1, 200.00, '2026-01-07 17:08:30', '手機自助點餐', 1, 1, 0.00),
(67, 1, 200.00, '2026-01-07 18:04:29', '手機自助點餐', 1, 1, 0.00),
(68, 1, 1000.00, '2026-01-07 18:35:33', '手機自助點餐', 1, 1, 0.00),
(69, 1, 200.00, '2026-01-07 18:42:17', '手機自助點餐', 1, 1, 0.00),
(70, 1, 400.00, '2026-01-07 18:57:49', '手機自助點餐', 1, 1, 0.00),
(71, 1, 340.00, '2026-01-07 19:01:14', '手機自助點餐', 1, 1, 0.00),
(73, 1, 9000.00, '2026-01-08 17:39:39', '手機自助點餐', 1, 1, 0.00),
(74, 1, 200.00, '2026-01-16 17:10:57', '手機自助點餐', 1, 1, 0.00),
(75, 1, 200.00, '2026-01-16 17:11:38', '手機自助點餐', 1, 1, 0.00),
(76, 1, 100.00, '2026-03-02 13:30:46', '手機自助點餐', 1, 1, 0.00),
(77, 1, 200.00, '2026-03-02 13:38:45', '手機自助點餐', 1, 1, 0.00),
(78, 1, 1000.00, '2026-03-02 13:45:51', '手機自助點餐', 1, 1, 0.00),
(79, 1, 1120.00, '2026-03-02 13:47:25', '手機自助點餐', 1, 1, 0.00),
(80, 1, 100.00, '2026-03-02 13:52:55', '手機自助點餐', 1, 1, 0.00),
(81, 1, 200.00, '2026-04-15 18:46:23', '皮炎', 1, 1, 0.00),
(82, 1, 100.00, '2026-05-05 13:37:58', '手機自助點餐', 1, 1, 0.00),
(83, 1, 50.00, '2026-05-05 13:41:06', NULL, 1, 1, 50.00),
(84, 1, 90.00, '2026-05-05 13:43:54', NULL, 1, 1, 10.00),
(85, 1, 100.00, '2026-05-05 13:45:50', '手機自助點餐', 1, 1, 0.00),
(86, 1, 400.00, '2026-05-05 13:50:44', '手機自助點餐', 1, 1, 0.00),
(87, 1, 350.00, '2026-05-05 14:18:19', '手機自助點餐', 1, 1, 0.00),
(88, 1, 100.00, '2026-05-05 14:18:28', '手機自助點餐', 1, 1, 0.00),
(89, 1, 200.00, '2026-05-07 12:45:55', '手機自助點餐', 0, 0, 0.00);

-- --------------------------------------------------------

--
-- 資料表結構 `ORDER_DETAIL`
--

CREATE TABLE `ORDER_DETAIL` (
  `DETAIL_ID` int(11) NOT NULL,
  `ORDER_ID` int(11) NOT NULL,
  `ITEM_ID` int(11) NOT NULL,
  `QUANTITY` int(11) NOT NULL DEFAULT 1,
  `PRICE_AT_SALE` decimal(10,2) NOT NULL,
  `SALE_IN_PERCENT` int(11) DEFAULT 100,
  `SEND` tinyint(4) NOT NULL DEFAULT 0,
  `NOTE` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `ORDER_DETAIL`
--

INSERT INTO `ORDER_DETAIL` (`DETAIL_ID`, `ORDER_ID`, `ITEM_ID`, `QUANTITY`, `PRICE_AT_SALE`, `SALE_IN_PERCENT`, `SEND`, `NOTE`) VALUES
(1, 1, 1, 1, 100.00, 100, 1, NULL),
(5, 2, 1, 1, 100.00, 100, 1, NULL),
(6, 2, 1, 1, 100.00, 100, 1, NULL),
(7, 3, 2, 1, 100.00, 100, 1, NULL),
(8, 4, 1, 1, 100.00, 100, 1, NULL),
(9, 5, 1, 1, 100.00, 100, 1, NULL),
(10, 6, 2, 1, 100.00, 100, 1, NULL),
(11, 5, 2, 1, 100.00, 100, 1, NULL),
(12, 8, 2, 1, 100.00, 100, 1, NULL),
(13, 9, 2, 1, 100.00, 100, 1, NULL),
(14, 10, 1, 1, 100.00, 100, 1, NULL),
(15, 11, 2, 1, 100.00, 100, 1, NULL),
(16, 12, 4, 1, 100.00, 100, 1, NULL),
(17, 12, 4, 1, 100.00, 100, 1, NULL),
(18, 14, 3, 3, 100.00, 0, 1, NULL),
(19, 15, 2, 1, 200.00, 100, 1, NULL),
(20, 16, 1, 1, 200.00, 100, 1, NULL),
(21, 17, 1, 1, 200.00, 100, 1, NULL),
(22, 18, 1, 1, 200.00, 100, 1, NULL),
(23, 18, 2, 1, 200.00, 100, 1, NULL),
(24, 19, 2, 1, 200.00, 100, 1, NULL),
(25, 19, 1, 1, 200.00, 100, 1, NULL),
(26, 20, 2, 1, 200.00, 100, 1, NULL),
(27, 20, 1, 1, 200.00, 100, 1, NULL),
(28, 21, 2, 1, 200.00, 100, 1, NULL),
(29, 22, 2, 1, 200.00, 100, 1, NULL),
(30, 23, 1, 1, 200.00, 100, 1, NULL),
(31, 24, 1, 1, 200.00, 100, 1, NULL),
(32, 25, 1, 1, 200.00, 100, 1, NULL),
(33, 26, 1, 1, 200.00, 100, 1, NULL),
(34, 29, 2, 1, 200.00, 100, 1, ''),
(35, 30, 1, 1, 200.00, 100, 1, ''),
(36, 31, 1, 1, 200.00, 100, 1, ''),
(38, 33, 2, 1, 200.00, 100, 1, '2222'),
(39, 34, 1, 1, 200.00, 100, 1, '哈哈皮炎'),
(40, 35, 6, 1, 300.00, 100, 1, '哈哈皮炎'),
(41, 36, 3, 1, 70.00, 100, 1, '皮炎'),
(42, 37, 3, 1, 70.00, 100, 1, '皮炎'),
(43, 38, 1, 1, 200.00, 100, 1, ''),
(44, 39, 1, 1, 200.00, 100, 1, 'aaaaa'),
(45, 40, 1, 1, 200.00, 100, 1, 'ssss'),
(46, 41, 1, 1, 200.00, 100, 1, 'aaaa'),
(47, 42, 1, 1, 200.00, 100, 1, 'aaa'),
(48, 43, 2, 1, 200.00, 100, 1, 'aaa'),
(49, 44, 3, 1, 70.00, 100, 1, 'aaa'),
(50, 45, 1, 1, 200.00, 100, 1, ''),
(51, 46, 1, 1, 200.00, 100, 1, 'sfegre'),
(52, 47, 2, 1, 200.00, 100, 1, 'arewaer'),
(53, 48, 1, 1, 200.00, 100, 1, 'aa'),
(54, 49, 2, 1, 200.00, 100, 1, 'aaaa'),
(55, 50, 2, 2, 200.00, 100, 1, 'qqqq'),
(56, 51, 2, 1, 200.00, 100, 1, 'qqqedgre'),
(57, 52, 1, 1, 200.00, 100, 1, ''),
(58, 53, 1, 1, 200.00, 100, 1, '123'),
(60, 55, 1, 1, 200.00, 100, 1, ''),
(61, 56, 1, 1, 200.00, 90, 1, NULL),
(62, 57, 2, 1, 200.00, 100, 1, '去冰'),
(63, 57, 4, 1, 100.00, 100, 1, ''),
(64, 57, 5, 1, 100.00, 100, 1, ''),
(65, 59, 3, 1, 70.00, 100, 1, NULL),
(67, 60, 1, 1, 200.00, 100, 1, ''),
(68, 61, 1, 1, 200.00, 100, 1, ''),
(69, 62, 8, 1, 200.00, 100, 1, '皮炎'),
(70, 63, 7, 1, 200.00, 100, 1, '皮炎'),
(71, 64, 4, 1, 100.00, 100, 1, ''),
(72, 64, 1, 2, 200.00, 100, 1, ''),
(73, 64, 2, 2, 200.00, 100, 1, ''),
(74, 65, 3, 1, 70.00, 100, 1, ''),
(75, 66, 1, 1, 200.00, 100, 1, ''),
(76, 67, 2, 1, 200.00, 100, 1, ''),
(77, 68, 1, 1, 200.00, 100, 1, ''),
(78, 68, 2, 4, 200.00, 100, 1, ''),
(79, 69, 1, 1, 200.00, 100, 1, ''),
(80, 70, 1, 2, 200.00, 100, 1, ''),
(81, 71, 1, 1, 200.00, 100, 1, ''),
(82, 71, 3, 2, 70.00, 100, 1, ''),
(83, 73, 1, 45, 200.00, 100, 1, ''),
(84, 74, 1, 1, 200.00, 100, 1, ''),
(85, 75, 1, 1, 200.00, 100, 1, ''),
(86, 76, 4, 1, 100.00, 100, 1, ''),
(87, 77, 1, 1, 200.00, 100, 1, ''),
(88, 78, 4, 10, 100.00, 100, 1, ''),
(89, 79, 1, 1, 200.00, 100, 1, ''),
(90, 79, 2, 1, 200.00, 100, 1, '多醣'),
(91, 79, 7, 1, 200.00, 100, 1, ''),
(92, 79, 8, 1, 200.00, 100, 1, ''),
(93, 79, 9, 1, 250.00, 100, 1, ''),
(94, 79, 3, 1, 70.00, 100, 1, ''),
(95, 80, 10, 1, 100.00, 100, 1, ''),
(96, 81, 1, 1, 200.00, 100, 1, '皮炎'),
(97, 82, 4, 1, 100.00, 100, 1, ''),
(98, 83, 4, 1, 100.00, 100, 1, '皮炎'),
(99, 84, 4, 1, 100.00, 100, 1, ''),
(100, 85, 10, 1, 100.00, 100, 1, ''),
(101, 86, 4, 1, 100.00, 100, 1, ''),
(102, 86, 8, 1, 200.00, 100, 1, ''),
(103, 86, 10, 1, 100.00, 100, 1, ''),
(104, 87, 13, 1, 350.00, 100, 1, ''),
(105, 88, 4, 1, 100.00, 100, 1, ''),
(106, 89, 2, 1, 200.00, 100, 0, '');

-- --------------------------------------------------------

--
-- 資料表結構 `SEAT`
--

CREATE TABLE `SEAT` (
  `SEAT_ID` int(11) NOT NULL,
  `SEAT_NAME` varchar(128) NOT NULL,
  `POSITION_X` int(255) DEFAULT 0,
  `POSITION_Y` int(255) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `SEAT`
--

INSERT INTO `SEAT` (`SEAT_ID`, `SEAT_NAME`, `POSITION_X`, `POSITION_Y`) VALUES
(0, 'T0(test)', 9, 2),
(1, 'sofa', 2, 1),
(2, '12', 3, 0),
(4, '11', 3, 2),
(5, '10', 3, 4),
(6, '9', 3, 6),
(7, '8', 5, 6),
(8, '7', 7, 6),
(9, '6', 9, 6),
(10, '5', 11, 6),
(11, '4', 13, 6),
(12, '3', 15, 6),
(13, '2', 17, 6),
(14, '1', 19, 6),
(15, 'table6', 2, 7),
(16, 'table5', 3, 8),
(17, 'table4', 5, 8),
(18, 'table3', 9, 8),
(19, 'table2', 11, 8),
(20, 'table1', 17, 8);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `EVENT`
--
ALTER TABLE `EVENT`
  ADD PRIMARY KEY (`EVENT_ID`);

--
-- 資料表索引 `ITEM`
--
ALTER TABLE `ITEM`
  ADD PRIMARY KEY (`ITEM_ID`);

--
-- 資料表索引 `ORDER`
--
ALTER TABLE `ORDER`
  ADD PRIMARY KEY (`ORDER_ID`),
  ADD KEY `FK_ORDER_SEAT` (`SEAT_ID`);

--
-- 資料表索引 `ORDER_DETAIL`
--
ALTER TABLE `ORDER_DETAIL`
  ADD PRIMARY KEY (`DETAIL_ID`),
  ADD KEY `FK_DETAIL_ORDER` (`ORDER_ID`),
  ADD KEY `FK_DETAIL_ITEM` (`ITEM_ID`);

--
-- 資料表索引 `SEAT`
--
ALTER TABLE `SEAT`
  ADD PRIMARY KEY (`SEAT_ID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `EVENT`
--
ALTER TABLE `EVENT`
  MODIFY `EVENT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `ITEM`
--
ALTER TABLE `ITEM`
  MODIFY `ITEM_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `ORDER`
--
ALTER TABLE `ORDER`
  MODIFY `ORDER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `ORDER_DETAIL`
--
ALTER TABLE `ORDER_DETAIL`
  MODIFY `DETAIL_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `SEAT`
--
ALTER TABLE `SEAT`
  MODIFY `SEAT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `ORDER`
--
ALTER TABLE `ORDER`
  ADD CONSTRAINT `FK_ORDER_SEAT` FOREIGN KEY (`SEAT_ID`) REFERENCES `SEAT` (`SEAT_ID`);

--
-- 資料表的限制式 `ORDER_DETAIL`
--
ALTER TABLE `ORDER_DETAIL`
  ADD CONSTRAINT `FK_DETAIL_ITEM` FOREIGN KEY (`ITEM_ID`) REFERENCES `ITEM` (`ITEM_ID`),
  ADD CONSTRAINT `FK_DETAIL_ORDER` FOREIGN KEY (`ORDER_ID`) REFERENCES `ORDER` (`ORDER_ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
