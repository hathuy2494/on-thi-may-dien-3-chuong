import { sql } from "drizzle-orm";
import { getDb } from "./index";
import { attempts } from "./schema";
import type { Attempt, Progress, QuestionProgress } from "@/lib/progress";

type Row = Omit<QuestionProgress, "lastCorrect"> & {
  questionId: string;
  lastCorrect: 0 | 1;
};

export async function getProgress(userId: string): Promise<Progress> {
  const rows = await getDb().all<Row>(sql`
    WITH totals AS (
      SELECT question_id, COUNT(*) AS attempts, SUM(1 - is_correct) AS wrong_count, MAX(id) AS last_id
      FROM attempts
      WHERE user_id = ${userId}
      GROUP BY question_id
    )
    SELECT t.question_id AS questionId, t.attempts AS attempts, t.wrong_count AS wrongCount,
      a.id AS lastOrder, a.event_id AS lastEventId, a.option_index AS lastAnswer,
      a.is_correct AS lastCorrect
    FROM totals AS t
    INNER JOIN attempts AS a ON a.id = t.last_id
  `);
  return Object.fromEntries(rows.map(({ questionId, lastCorrect, ...stats }) => [
    questionId, { ...stats, lastCorrect: lastCorrect === 1 },
  ]));
}

export async function saveAttempt(userId: string, attempt: Attempt, correct: boolean) {
  await getDb().insert(attempts).values({
    userId,
    eventId: attempt.eventId,
    questionId: attempt.questionId,
    optionIndex: attempt.option,
    correct,
  }).onConflictDoNothing({ target: [attempts.userId, attempts.eventId] });
  return getProgress(userId);
}
