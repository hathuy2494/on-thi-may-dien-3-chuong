export type DiagramRef = {
  asset: string;
  alt: string;
};

export type MeasurementExercise = {
  id: string;
  title: string;
  given: string;
  theoryQuestion: string;
  calculationQuestion: string;
  theoryAnswer: string;
  steps: string[];
  result: string;
  source: string;
  original?: boolean;
  showDiagram?: boolean;
  theoryDiagram?: DiagramRef;
  answerDiagram?: DiagramRef;
};

export type MeasurementTopic = {
  id: string;
  title: string;
  chapter: string;
  measures: string;
  principle: string;
  diagram: DiagramRef;
  notes: string[];
  theory: string[];
  formulas: { title: string; equation: string; note: string }[];
  exercises: MeasurementExercise[];
};

export type MeasurementPart = {
  id: string;
  title: string;
  chapters: string;
  description: string;
  points: number;
  topics: MeasurementTopic[];
};

export const outline = "Đề cương chi tiết Đo lường";
export const classification = "Bài tập phân dạng GK + CK";
export const sample = "Đề thi mẫu KTĐL";
export const projectSlides = "Bài giảng trong project KTĐL";
