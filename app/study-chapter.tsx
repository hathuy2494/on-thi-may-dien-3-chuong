"use client";

import { BookOpen, ClipboardList, Lightbulb, Sigma } from "lucide-react";
import type { Chapter, Option, Question } from "@/lib/course/types";
import { chapterProgress, type Progress } from "@/lib/progress";
import { ChapterQuiz } from "./study-quiz";
import { ChapterIcon, chapterLink, ProgressBar, type ChapterSection } from "./study-ui";

const tabs = [
  { id: "ly-thuyet", name: "Lý thuyết", Icon: BookOpen },
  { id: "cong-thuc", name: "Công thức", Icon: Sigma },
  { id: "on-thi", name: "Ôn thi", Icon: ClipboardList },
] as const;

export function ChapterScreen({ chapter, section, progress, ready, record }: {
  chapter: Chapter;
  section: ChapterSection;
  progress: Progress;
  ready: boolean;
  record: (question: Question, option: Option) => void;
}) {
  const { answered } = chapterProgress(chapter, progress);
  return (
    <>
      <div className={`chapter-cover chapter-${chapter.id}`}>
        <div>
          <p className="chapter-kicker">CHƯƠNG {chapter.id}</p>
          <h1>{chapter.title}</h1>
          <p className="cover-description">{chapter.description}</p>
        </div>
        <div className="cover-icon"><ChapterIcon id={chapter.id} /></div>
      </div>
      <div className="chapter-toolbar">
        <nav className="chapter-tabs" aria-label="Mục trong chương">
          {tabs.map(({ id, name, Icon }) => (
            <a key={id} className={id === section ? "active" : ""} href={chapterLink(chapter.id, id)}
              aria-current={id === section ? "page" : undefined}>
              <Icon aria-hidden="true" /> {name}
            </a>
          ))}
        </nav>
        <div className={`toolbar-progress chapter-${chapter.id}`}>
          <ProgressBar value={answered} total={chapter.questions.length} label={`Tiến độ chương ${chapter.id}`} />
          <span>{answered}/{chapter.questions.length} đã làm</span>
        </div>
      </div>

      {section === "ly-thuyet" && (
        <section aria-labelledby="theory-title" className="chapter-content">
          <div className="section-heading"><h2 id="theory-title">Tóm tắt lý thuyết</h2></div>
          <div className="theory-grid">
            {chapter.theory.map((item) => (
              <article key={item.title} className="theory-card">
                <h3>{item.title}</h3>
                <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </article>
            ))}
          </div>
          <aside className="reminders">
            <span className="stat-icon tone-3"><Lightbulb aria-hidden="true" /></span>
            <div><h3>Chú ý khi làm bài</h3>
              <ul>{chapter.reminders.map((note) => <li key={note}>{note}</li>)}</ul></div>
          </aside>
          <ChapterEnd chapter={chapter} next="cong-thuc" label="Xem công thức" />
        </section>
      )}
      {section === "cong-thuc" && (
        <section aria-labelledby="formula-title" className="chapter-content">
          <div className="section-heading"><h2 id="formula-title">Bảng công thức</h2></div>
          {chapter.formulas.map((group) => (
            <div className="formula-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="formula-grid">
                {group.items.map((item) => (
                  <article className="formula-card" key={item.name}>
                    <h4>{item.name}</h4>
                    <p className="equation">{item.equation}</p>
                    <p>{item.note}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
          <ChapterEnd chapter={chapter} next="on-thi" label="Làm câu hỏi ôn thi" />
        </section>
      )}
      {section === "on-thi" && (ready ?
        <ChapterQuiz key={chapter.id} chapter={chapter} progress={progress} record={record} /> :
        <p className="loading" role="status">Đang tải tiến độ…</p>)}
    </>
  );
}

function ChapterEnd({ chapter, next, label }: { chapter: Chapter; next: ChapterSection; label: string }) {
  return <div className="chapter-end">
    <a className="text-link" href={chapter.reference.url} target="_blank" rel="noreferrer">{chapter.reference.title}</a>
    <a className="button button-primary" href={chapterLink(chapter.id, next)}>{label}</a>
  </div>;
}
