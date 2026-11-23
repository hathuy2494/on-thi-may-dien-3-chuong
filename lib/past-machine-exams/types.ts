export const answerLetters = ["A", "B", "C", "D"] as const;
export type AnswerLetter = (typeof answerLetters)[number];

export type ExamFigure = {
  file: string;
  alt: string;
  caption: string;
};

export type PastExamQuestion = {
  number: number;
  prompt: string;
  choices: readonly [string, string, string, string];
  answer: AnswerLetter;
  topic: string;
  steps: string[];
  figure?: ExamFigure;
  solutionFigure?: ExamFigure;
  note?: string;
};

export type PastMachineExam = {
  code: string;
  title: string;
  course: string;
  minutes: number;
  questions: PastExamQuestion[];
};

export type ExamAnswers = Partial<Record<number, AnswerLetter>>;

export function countScore(questions: PastExamQuestion[], answers: ExamAnswers) {
  const graded = questions.filter((item) => !item.note);
  return { correct: graded.filter((item) => answers[item.number] === item.answer).length, total: graded.length };
}
