import type { Option, Question } from "./types";

const sources = {
  k64: "Đề kiểm tra K64S",
  k60: "Đề thi Máy điện K60",
  gk20202: "Đề giữa kỳ 20202",
  tonghop: "Tổng hợp câu hỏi trắc nghiệm",
  lythuyet: "Tổng hợp lý thuyết",
  de20191: "Đề 20191-2",
  gk1112: "Giữa kỳ 2 · 2011–2012 · Chuyển thể trắc nghiệm",
  gk1213: "Giữa kỳ 2 · 2012–2013 · Chuyển thể trắc nghiệm",
  baitap7: "Bài tập và đáp án Chương 7 · Chuyển thể trắc nghiệm",
} as const;

export function exam(key: keyof typeof sources) {
  return (
    number: number | string,
    topic: string,
    stem: string,
    options: Question["options"],
    correct: Option,
    ...steps: string[]
  ): Question => ({
    id: `${key}-${number}`,
    source: `${sources[key]} · Câu ${number}`,
    topic, stem, options, correct, steps,
  });
}
