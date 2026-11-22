export type ChapterId = 1 | 2 | 3;
export type Option = 0 | 1 | 2 | 3;

export type TheoryDiagram = {
  title: string;
  image: string;
  alt: string;
  notes: readonly { title: string; text: string }[];
};

export type Question = {
  id: string;
  topic: string;
  stem: string;
  options: [string, string, string, string];
  correct: Option;
  steps: string[];
  source: string;
  image?: { src: string; alt: string };
};

export type Chapter = {
  id: ChapterId;
  title: string;
  shortTitle: string;
  description: string;
  theory: readonly TheoryDiagram[];
  formulas: {
    title: string;
    items: { name: string; equation: string; note: string }[];
  }[];
  questions: Question[];
  reference: { title: string; url: string };
};
