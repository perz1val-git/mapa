CREATE TABLE IF NOT EXISTS `system_calendar_entries` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `datetime_add` datetime NOT NULL,
    `datetime_edit` datetime,
    `date` date NOT NULL,
    `name` text NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

ALTER TABLE `users`
    ADD `calendar_modify` tinyint(4) NOT NULL DEFAULT '0' AFTER `board_manage`;

-- 01/06/2021

ALTER TABLE `system_calendar_entries` MODIFY `name` VARCHAR(255);

-- 07/06/2021

DELETE FROM `projects` WHERE id=92;

INSERT INTO `system_calendar_entries` (`datetime_add`, `datetime_edit`, `date`, `name`)
VALUES (now(), NULL, '2021-06-03', 'Boże Ciało');

-- 16/06/2021

ALTER TABLE `system_calendar_entries`
    ADD UNIQUE `date_unique` (`date`);