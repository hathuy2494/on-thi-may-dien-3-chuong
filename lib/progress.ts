import type { Chapter, Option } from "./course/types";

export type Attempt = { eventId: string; questionId: string; option: Option };
export type QuestionProgress = {
  attempts: number;
  wrongCount: number;
  lastAnswer: Option;
  lastCorrect: boolean;
  lastOrder: number;
  lastEventId: string;
};
export type Progress = Partial<Record<string, QuestionProgress>>;

export function addAttempt(progress: Progress, attempt: Attempt, correct: boolean): Progress {
  const previous = progress[attempt.questionId];
  if (previous?.lastEventId === attempt.eventId) return progress;

  const lastOrder = Object.values(progress).reduce(
    (order, item) => Math.max(order, item?.lastOrder ?? 0), 0,
  );
  return {
    ...progress,
    [attempt.questionId]: {
      attempts: (previous?.attempts ?? 0) + 1,
      wrongCount: (previous?.wrongCount ?? 0) + (correct ? 0 : 1),
      lastAnswer: attempt.option,
      lastCorrect: correct,
      lastOrder: lastOrder + 1,
      lastEventId: attempt.eventId,
    },
  };
}

export function chapterProgress(chapter: Chapter, progress: Progress) {
  return chapter.questions.reduce((totals, question) => {
    const stats = progress[question.id];
    if (stats) {
      totals.answered += 1;
      totals.correct += stats.lastCorrect ? 1 : 0;
      totals.needsReview += stats.lastCorrect ? 0 : 1;
    }
    return totals;
  }, { answered: 0, correct: 0, needsReview: 0 });
}

export function resumeIndex(chapter: Chapter, progress: Progress) {
  let newestOrder = 0;
  let lastIndex = -1;
  chapter.questions.forEach((question, index) => {
    const order = progress[question.id]?.lastOrder ?? 0;
    if (order > newestOrder) {
      newestOrder = order;
      lastIndex = index;
    }
  });
  const following = chapter.questions.findIndex((item, index) => index > lastIndex && !progress[item.id]);
  if (following >= 0) return following;
  const firstUnanswered = chapter.questions.findIndex((item) => !progress[item.id]);
  return firstUnanswered >= 0 ? firstUnanswered : Math.max(0, lastIndex);
}
