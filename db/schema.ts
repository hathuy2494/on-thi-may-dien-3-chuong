import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const attempts = sqliteTable("attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  eventId: text("event_id").notNull(),
  questionId: text("question_id").notNull(),
  optionIndex: integer("option_index").notNull(),
  correct: integer("is_correct", { mode: "boolean" }).notNull(),
}, (table) => [
  uniqueIndex("attempts_user_event").on(table.userId, table.eventId),
  index("attempts_user_question").on(table.userId, table.questionId),
]);
