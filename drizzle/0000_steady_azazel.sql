CREATE TABLE `attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`event_id` text NOT NULL,
	`question_id` text NOT NULL,
	`option_index` integer NOT NULL,
	`is_correct` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `attempts_user_event` ON `attempts` (`user_id`,`event_id`);--> statement-breakpoint
CREATE INDEX `attempts_user_question` ON `attempts` (`user_id`,`question_id`);