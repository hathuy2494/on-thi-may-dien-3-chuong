import { induction } from "./induction";
import { transformers } from "./transformers";
import type { Chapter, ChapterId } from "./types";
import { windings } from "./windings";

export const chapters = [transformers, windings, induction];
export const chapterById = Object.fromEntries(chapters.map((chapter) => [chapter.id, chapter])) as Record<ChapterId, Chapter>;
export const questionEntries = new Map(chapters.flatMap((chapter) => chapter.questions.map((question, index) => [
  question.id, { chapter, question, index },
] as const)));
export const questionById = new Map([...questionEntries].map(([id, { question }]) => [id, question]));
export const courseQuestionCount = questionEntries.size;
