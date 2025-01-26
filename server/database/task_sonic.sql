-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 26, 2025 at 03:45 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_sonic`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `task_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `task_type` varchar(255) NOT NULL,
  `task_details` text DEFAULT NULL,
  `task_budget` decimal(10,2) DEFAULT NULL,
  `task_category` varchar(100) DEFAULT NULL,
  `task_date` varchar(100) NOT NULL,
  `task_status` enum('open','assigned','completed','cancelled') DEFAULT 'open',
  `task_location` varchar(255) DEFAULT NULL,
  `task_flexible_time` enum('Flexible','anytime','Morning Before 10am','Midday 10am - 2pm','Afternoon 2pm - 6pm','Evening After 6pm') NOT NULL DEFAULT 'anytime',
  `posted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`task_id`, `user_id`, `task_type`, `task_details`, `task_budget`, `task_category`, `task_date`, `task_status`, `task_location`, `task_flexible_time`, `posted_at`, `updated_at`) VALUES
('1c568332-b668-4b8b-a906-f840c41e4404', 'eec05585-bb31-48c7-8464-95cdc1e7b8d4', 'help me move my sofa to my house', 'We’re looking for a skilled landscape designer to create a low-maintenance, modern garden design for our acre block. The site currently has trees that are being cleaned up. The design should incorporate the following features:\n	•	Pool\n	•	Shed\n	•	Fire Pit\n	•	Chook Pen\n	•	Dog Pens\n	•	Veggie Patch\n	•	Grassed Area\n\nWe want a contemporary, functional layout that blends style with low upkeep. The design should consider space, flow, and how each feature can be easily maintained. We’re aiming for a design that works for both relaxation and everyday use.\n\nI can send through some ideas and a current layout of what I’m envisioning to help guide the design. If you have experience with large property designs and can create a modern, practical layout, please get in touch!', 500.00, '\'Alterations, Assembly, Accounting, Appliances,\'', 'Jan 27', 'open', '20 - california - sadney', 'Flexible', '2025-01-24 15:39:18', '2025-01-24 15:39:18'),
('6d092272-83a4-44f1-a511-ce498c1d2ab3', 'eec05585-bb31-48c7-8464-95cdc1e7b8d4', 'help me move my studio to california', 'I need to find a granny flat or apartment hoping for a private lease in the areas of st Clair Penrith Mount Druitt Kingswood I can pay up to 350 a week every week ', 200.00, '\'Assembly, Alterations, Admin, Audio Visual,\'', 'Feb 23', 'open', 'remote', 'Afternoon 2pm - 6pm', '2025-01-24 15:36:13', '2025-01-24 15:36:13'),
('77e04eaf-96bd-452c-a4c0-f6b853dd2a39', 'eec05585-bb31-48c7-8464-95cdc1e7b8d4', 'move my sofa to my home', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti\n            fugiat repellat consequuntur praesentium. Tempora debitis eveniet\n            provident consequatur enim corrupti exercitationem temporibus\n            quibusdam rerum, porro repellat nisi dignissimos, ducimus iste.', 100.00, '\'Assembly, Alterations, Admin,\'', 'Oct 13', 'cancelled', 'remote', 'Evening After 6pm', '2025-01-24 23:01:14', '2025-01-25 15:27:18'),
('8038e388-bf04-468b-866a-03ecb5e62c2b', 'eec05585-bb31-48c7-8464-95cdc1e7b8d4', 'help me move my sofa', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam laborum, dicta nobis voluptas tempora distinctio culpa deserunt, neque voluptatibus est numquam voluptatum tempore, id maxime. Eum tempore totam asperiores. Laudantium autem ipsum modi saepe deleniti voluptatem porro quas earum, provident blanditiis aperiam est ex animi? Amet, adipisci! Expedita magni odio tenetur voluptate, mollitia assumenda iste. Molestias eos, earum tempore tenetur vel optio illum pariatur qui alias similique itaque recusandae. Nemo, aliquid adipisci molestiae ullam itaque assumenda soluta sed autem quaerat fuga beatae porro quisquam quae labore minus aperiam eveniet maiores excepturi accusamus asperiores! Amet tenetur deserunt ratione possimus quam corrupti.', 32.00, '\'Alterations, Plumbing, Car Body Work,\'', 'Jan 15, 2025', 'open', 'remote', 'Midday 10am - 2pm', '2025-01-25 02:19:18', '2025-01-25 02:19:18'),
('92485264-4ff9-4156-8b41-c533fc1644fe', '3b31b527-741c-4fdc-908c-e620aeb00736', 'help me move my home accessories ', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, accusantium voluptatem maxime eaque corrupti inventore, dolorum sit fugiat fuga reprehenderit deserunt architecto ab saepe quam id quas eligendi, molestias officia sequi aspernatur ipsum perferendis. Dolorem iste eveniet aperiam, quas inventore repudiandae optio provident! Laboriosam corrupti cum explicabo, saepe eveniet itaque nam provident iusto magni natus id voluptatibus earum magnam sequi officiis amet vero, dignissimos deserunt repudiandae repellat obcaecati! Aperiam dolores, exercitationem blanditiis architecto cum eos quas. Corrupti tempora harum eos reiciendis voluptatibus quod, molestiae quos quasi modi at beatae obcaecati dolores vero veritatis asperiores explicabo ducimus deserunt, earum magni autem.', 100.00, '\'Assembly, Home & Lifestyle,\'', 'Jan 18, 2025', 'assigned', 'remote', 'Morning Before 10am', '2025-01-25 12:19:56', '2025-01-25 15:25:48'),
('a11169fd-632f-4d51-bc7e-30c112fb56fb', '3b31b527-741c-4fdc-908c-e620aeb00736', 'help me to purchasing my new laptop', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, provident vero? Consequuntur ratione id nam officiis sunt alias est dolores, blanditiis ipsam illum autem laboriosam deleniti nostrum numquam dolorem eos sed provident. Aliquam quo perferendis molestias atque reprehenderit nihil rerum consequuntur officia vel cum obcaecati maxime, tempora culpa neque. Alias, consectetur. Laboriosam, ipsa voluptates reprehenderit similique nobis distinctio ex illo dolore quos, quis quasi pariatur voluptatum nemo? Harum, eligendi vitae cumque ratione omnis atque ab corrupti, modi error quibusdam facilis provident dolore ducimus explicabo, consequatur eaque consequuntur minima id itaque sequi eos minus. Modi ut consequatur delectus quibusdam hic. Repudiandae.', 5000.00, '\'Takeaway & Delivery, Gift Delivery, Delivery, Admin,\'', 'Jan 31, 2025', 'open', 'California, los angels ', 'anytime', '2025-01-26 02:33:33', '2025-01-26 02:33:33'),
('af3a9683-1eca-4ee4-92d0-3892b734caf9', 'eec05585-bb31-48c7-8464-95cdc1e7b8d4', 'help me repair my house 🏡 pipeline', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat culpa possimus minima, atque eveniet quo soluta, molestias beatae laudantium perferendis blanditiis at placeat cupiditate optio voluptas, deleniti incidunt consectetur ipsum deserunt! Quis delectus repellat rerum perferendis ratione quia libero iusto, pariatur dolor omnis nobis autem eius tenetur nulla quod ipsam doloremque quos quas nihil esse suscipit modi fugit? Culpa modi quae atque itaque necessitatibus rem, ea repellendus explicabo aspernatur quaerat nulla vero vitae praesentium fuga ullam reiciendis maiores voluptatibus, quis dolorem consequatur sequi nobis id placeat enim. Soluta nostrum ut, eveniet doloribus eius, pariatur, unde accusamus quos quaerat perferendis hic!', 200.00, '\'Plumbing, Mechanic,\'', 'Jan 17, 2025', 'open', 'remote', 'Afternoon 2pm - 6pm', '2025-01-25 10:57:42', '2025-01-25 10:57:42'),
('dcd7464e-5e68-448a-81d6-ebd7056cab32', 'eec05585-bb31-48c7-8464-95cdc1e7b8d4', 'help me to build a wordpress website for my restaurant 🍴 ', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi repellat tempora similique ullam adipisci accusamus, dolorem fugit consequatur inventore at delectus molestiae numquam explicabo aliquid exercitationem itaque alias, soluta deserunt libero nostrum quos, quas veritatis? Asperiores vitae dolorem deserunt odio quae expedita eveniet, amet eos ipsam ipsum? Necessitatibus, excepturi nobis? Cupiditate beatae deleniti assumenda totam! Laboriosam, sit debitis. Quas necessitatibus doloremque, consequuntur officia et repellendus consequatur totam quidem fuga. Aliquid odit, ad dolore minus quas hic in sequi consequuntur maiores vitae labore molestiae libero itaque dicta omnis maxime rerum. Consequuntur accusantium necessitatibus velit! Odit quos laboriosam aperiam aspernatur veritatis maiores?', 200.00, '\'Assembly, Alterations, Audio Visual,\'', 'Jan 18, 2025', 'completed', 'remote', 'anytime', '2025-01-24 23:38:47', '2025-01-25 15:27:25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_phone` varchar(15) DEFAULT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_role` enum('user','tasker','admin') DEFAULT 'user',
  `user_status` enum('active','inactive','suspended') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_phone`, `user_password`, `user_role`, `user_status`, `created_at`, `updated_at`) VALUES
('3b31b527-741c-4fdc-908c-e620aeb00736', 'monabbir hasan', 'phpjsmonabbirhasan@gmail.com', '', '', 'user', 'active', '2025-01-25 11:37:51', '2025-01-25 11:37:51'),
('eec05585-bb31-48c7-8464-95cdc1e7b8d4', 'monabbirhasan', 'monabbirhasan@example.com', '9876543210', 'Password123', 'user', 'inactive', '2025-01-24 00:50:56', '2025-01-24 00:50:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
