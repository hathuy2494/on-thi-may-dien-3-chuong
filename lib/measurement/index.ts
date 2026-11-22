import { foundations } from "./foundations";
import { instruments } from "./instruments";
import { meters } from "./meters";
import { sensors } from "./sensors";
import { signals } from "./signals";
import type { MeasurementExercise, MeasurementPart, MeasurementTopic } from "./types";

const electrical: MeasurementPart = {
  id: "do-dien",
  title: "Đo đại lượng điện",
  chapters: "Chương 8–13",
  description: "Đo dòng, áp, điện trở, công suất, tần số và đọc dao động ký.",
  points: 3,
  topics: [...meters, ...signals],
};

export const measurementParts = [foundations, instruments, electrical, sensors];
export const measurementTopics = measurementParts.flatMap((part) => part.topics);
export const exerciseCount = measurementTopics.reduce((sum, topic) => sum + topic.exercises.length, 0);

export type ExamQuestion = { topic: MeasurementTopic; exercise: MeasurementExercise; points: number };

const examBank = measurementParts.map((part) => part.topics.flatMap((topic) =>
  topic.exercises.filter((exercise) => !exercise.original).map((exercise) => ({ topic, exercise, points: part.points })),
));

export function createMeasurementExam(previous: ExamQuestion[] = [], random = Math.random): ExamQuestion[] {
  return examBank.map((bank, index) => {
    const old = previous[index];
    const otherTypes = bank.filter((item) => item.topic.id !== old?.topic.id);
    const pool = otherTypes.length ? otherTypes : bank;
    return pool[Math.floor(random() * pool.length)];
  });
}

export function restoreMeasurementExam(ids: unknown): ExamQuestion[] | null {
  if (!Array.isArray(ids) || ids.length !== examBank.length) return null;
  const questions = examBank.map((bank, index) => bank.find((question) => question.exercise.id === ids[index]));
  return questions.every((question) => question !== undefined) ? questions : null;
}
