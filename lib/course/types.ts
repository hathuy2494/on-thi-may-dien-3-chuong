export type ChapterId = 1 | 2 | 3;
export type Option = 0 | 1 | 2 | 3;

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
  theory: { title: string; points: string[] }[];
  formulas: {
    title: string;
    items: { name: string; equation: string; note: string }[];
  }[];
  reminders: string[];
  questions: Question[];
  reference: { title: string; url: string };
};
