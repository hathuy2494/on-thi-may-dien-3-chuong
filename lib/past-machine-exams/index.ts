import { firstQuestions } from "./exam-252132-first";
import { lastQuestions } from "./exam-252132-last";
import type { PastMachineExam } from "./types";

export const pastMachineExams: PastMachineExam[] = [
  {
    code: "252132",
    title: "Đề giữa kỳ Máy điện 1",
    course: "EE3140",
    minutes: 75,
    questions: [...firstQuestions, ...lastQuestions],
  },
];
