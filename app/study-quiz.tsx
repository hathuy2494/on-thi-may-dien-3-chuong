"use client";

import { useRef, useState } from "react";
import {
  Check, CircleCheck, ClipboardList, RotateCcw, X,
} from "lucide-react";
import { chapterById, chapters, questionEntries } from "@/lib/course";
import type { Chapter, ChapterId, Option, Question } from "@/lib/course/types";
import { chapterProgress, resumeIndex, type Progress } from "@/lib/progress";
import { chapterLink, ProgressBar } from "./study-ui";

type RecordAnswer = (question: Question, option: Option) => void;
const letters = ["A", "B", "C", "D"];

function QuestionCard({ question, position, initialAnswer, wrongCount, record }: {
  question: Question;
  position: string;
  initialAnswer: Option | null;
  wrongCount: number;
  record: RecordAnswer;
}) {
  const [selected, setSelected] = useState<Option | null>(initialAnswer);
  const locked = useRef(initialAnswer !== null);

  function pick(option: Option) {
    if (locked.current) return;
    locked.current = true;
    setSelected(option);
    record(question, option);
  }

  function retry() {
    locked.current = false;
    setSelected(null);
    requestAnimationFrame(() => document.getElementById("quiz-first-option")?.focus());
  }

  const revealed = selected !== null;
  const correct = selected === question.correct;

  return (
    <article className="question-card">
      <div className="question-meta"><span>{position}</span><span className="topic">{question.topic}</span></div>
      <h2 id="question-heading" tabIndex={-1}>{question.stem}</h2>
      {question.image && <figure className="question-figure">
        <a href={question.image.src} target="_blank" rel="noreferrer" aria-label="Mở hình đề bài trong thẻ mới">
          <img src={question.image.src} alt={question.image.alt} />
        </a>
      </figure>}
      <div className="options" role="group" aria-labelledby="question-heading">
        {question.options.map((option, index) => {
          const state = revealed && index === question.correct ? "option-correct" :
            revealed && index === selected ? "option-wrong" : "";
          return (
            <button key={index} id={index === 0 ? "quiz-first-option" : undefined}
              type="button" className={`option ${state}`} disabled={revealed}
              onClick={() => pick(index as Option)}>
              <span className="option-letter">{letters[index]}</span>
              <span>{option}</span>
              {state === "option-correct" && <Check aria-label="Đáp án đúng" className="option-symbol" />}
              {state === "option-wrong" && <X aria-label="Bạn chọn sai" className="option-symbol" />}
            </button>
          );
        })}
      </div>
      <div className="feedback-announcement" aria-live="polite">
        {revealed && (
          <div className={`answer-status ${correct ? "right" : "wrong"}`}>
            {correct ? <CircleCheck aria-hidden="true" /> : <X aria-hidden="true" />}
            <strong>{correct ? "Chính xác" : "Chưa đúng"}</strong>
            <span>Đáp án đúng là {letters[question.correct]}.</span>
          </div>
        )}
      </div>
      {revealed && (
        <div className="solution">
          <h3>Giải chi tiết</h3>
          <ol>{question.steps.map((step, index) => <li key={index}>{step}</li>)}</ol>
          <button type="button" className="text-link" onClick={retry}><RotateCcw aria-hidden="true" /> Làm lại câu này</button>
        </div>
      )}
      <div className="question-source">
        <span>Nguồn · {question.source}</span>
        {wrongCount > 0 && <span className="wrong-count">Đã sai {wrongCount} lần</span>}
      </div>
    </article>
  );
}

function focusQuestion() {
  requestAnimationFrame(() => document.getElementById("question-heading")?.focus());
}

export function ChapterQuiz({ chapter, progress, record }: {
  chapter: Chapter; progress: Progress; record: RecordAnswer;
}) {
  const [index, setIndex] = useState(() => resumeIndex(chapter, progress));
  const [showResult, setShowResult] = useState(false);
  const question = chapter.questions[index];
  const total = chapter.questions.length;
  const { answered, correct, needsReview } = chapterProgress(chapter, progress);
  if (!question) return <p>Chưa có câu hỏi trong chương này.</p>;
  const stats = progress[question.id];

  function goTo(next: number) {
    setShowResult(false);
    setIndex(next);
    focusQuestion();
  }

  return (
    <div className="quiz-layout">
      <section className="quiz-main" aria-label="Ôn thi">
        {showResult ? (
          <div className="empty-card chapter-result">
            <span className="empty-icon tone-1"><ClipboardList aria-hidden="true" /></span>
            <h2>Kết quả Chương {chapter.id}</h2>
            <p>Bạn đã làm {answered}/{total} câu. Lần trả lời gần nhất có {correct} câu đúng và {needsReview} câu sai.</p>
            <div className="button-group">
              <button className="button button-outline" type="button" onClick={() => goTo(resumeIndex(chapter, progress))}>
                {answered < total ? "Tiếp tục làm bài" : "Xem lại bài"}
              </button>
              <a href="#cau-sai" className="button button-primary">Ôn câu sai</a>
            </div>
          </div>
        ) : (
          <>
            <QuestionCard key={question.id} question={question} position={`Câu ${index + 1} / ${total}`}
              initialAnswer={stats?.lastAnswer ?? null} wrongCount={stats?.wrongCount ?? 0} record={record} />
            <div className="quiz-controls">
              <button type="button" className="button button-outline" disabled={index === 0} onClick={() => goTo(index - 1)}>Câu trước</button>
              <button type="button" className="button button-primary" onClick={() => {
                if (index + 1 === total) {
                  setShowResult(true);
                } else {
                  goTo(index + 1);
                }
              }}>{index + 1 === total ? "Xem kết quả" : "Câu tiếp theo"}</button>
            </div>
          </>
        )}
      </section>
      <aside className={`question-map chapter-${chapter.id}`} aria-label="Danh sách câu hỏi">
        <div className="map-heading"><h2>Danh sách câu</h2><span>{answered}/{total}</span></div>
        <ProgressBar value={answered} total={total} label="Số câu đã làm" />
        <div className="map-grid">
          {chapter.questions.map((item, number) => {
            const itemStats = progress[item.id];
            const state = itemStats ? itemStats.lastCorrect ? "right" : "wrong" : "unanswered";
            const label = state === "right" ? "đúng" : state === "wrong" ? "sai" : "chưa làm";
            const current = !showResult && number === index;
            return (
              <button key={item.id} type="button" aria-label={`Câu ${number + 1}, ${label}`}
                aria-current={current ? "step" : undefined}
                className={`map-item ${state}${current ? " current" : ""}`} onClick={() => goTo(number)}>
                {number + 1}
              </button>
            );
          })}
        </div>
        <div className="map-legend"><span><i className="unanswered" /> Chưa làm</span><span><i className="right" /> Đúng</span><span><i className="wrong" /> Sai</span></div>
      </aside>
    </div>
  );
}

export function MistakesScreen({ progress, ready, record }: {
  progress: Progress; ready: boolean; record: RecordAnswer;
}) {
  const [filter, setFilter] = useState<"due" | "all">("due");
  const [chapterFilter, setChapterFilter] = useState<ChapterId | 0>(0);
  const [session, setSession] = useState<string[] | null>(null);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [sessionAnswers, setSessionAnswers] = useState<Record<string, boolean>>({});

  const history = [...questionEntries.values()].filter(({ question }) => (progress[question.id]?.wrongCount ?? 0) > 0);
  const due = history.filter(({ question }) => !progress[question.id]?.lastCorrect);
  const displayed = (filter === "due" ? due : history).filter(({ chapter }) => !chapterFilter || chapter.id === chapterFilter);
  const current = session ? questionEntries.get(session[sessionIndex]) : undefined;
  const isFinished = session !== null && sessionIndex >= session.length;

  function start(ids: string[]) {
    setSession(ids);
    setSessionIndex(0);
    setSessionAnswers({});
    focusQuestion();
  }

  return (
    <>
      <div className="chapter-cover chapter-3 review-cover">
        <div>
          <h1>Ôn câu sai</h1>
          <p className="cover-description">Xem số lần sai và kiểm tra lại những câu bạn đã làm.</p>
        </div>
        <div className="cover-icon"><RotateCcw aria-hidden="true" /></div>
      </div>

      {session && current && (
        <div className="review-session">
          <div className="review-session-top">
            <strong>Chương {current.chapter.id} · {current.chapter.shortTitle}</strong>
            <button className="text-link" type="button" onClick={() => setSession(null)}>Về sổ câu sai</button>
          </div>
          <QuestionCard key={current.question.id} question={current.question}
            position={`Câu ôn lại ${sessionIndex + 1} / ${session.length}`}
            initialAnswer={null} wrongCount={progress[current.question.id]?.wrongCount ?? 0}
            record={(question, option) => {
              record(question, option);
              setSessionAnswers((previous) => ({ ...previous, [question.id]: option === question.correct }));
            }} />
          <div className="quiz-controls">
            <button type="button" className="button button-outline" onClick={() => setSession(null)}>Về danh sách</button>
            <button type="button" className="button button-primary" disabled={!(current.question.id in sessionAnswers)}
              onClick={() => { setSessionIndex(sessionIndex + 1); focusQuestion(); }}>
              {sessionIndex + 1 === session.length ? "Kết thúc lượt ôn" : "Câu tiếp theo"}
            </button>
          </div>
        </div>
      )}

      {isFinished && (
        <div className="empty-card review-session">
          <span className="empty-icon tone-1"><CircleCheck aria-hidden="true" /></span>
          <h2>Hoàn thành lượt ôn</h2>
          <p>Bạn trả lời đúng {Object.values(sessionAnswers).filter(Boolean).length}/{session.length} câu trong lượt này.</p>
          <button type="button" className="button button-primary" onClick={() => setSession(null)}>Về sổ câu sai</button>
        </div>
      )}

      {!session && (
        <section className="mistakes-content" aria-label="Lịch sử câu sai">
          <div className="filter-bar">
            <div className="filter-buttons" aria-label="Trạng thái câu sai">
              <button type="button" aria-pressed={filter === "due"} onClick={() => setFilter("due")}>Cần ôn · {due.length}</button>
              <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>Tất cả đã sai · {history.length}</button>
            </div>
            <label className="select-label">
              <span className="sr-only">Lọc theo chương</span>
              <select value={chapterFilter} onChange={(event) => setChapterFilter(Number(event.target.value) as ChapterId | 0)}>
                <option value={0}>Tất cả chương</option>
                {chapters.map((chapter) => <option key={chapter.id} value={chapter.id}>Chương {chapter.id} · {chapter.shortTitle}</option>)}
              </select>
            </label>
            {displayed.length > 0 && <button type="button" className="button button-primary"
              onClick={() => start(displayed.map(({ question }) => question.id))}>Ôn {displayed.length} câu</button>}
          </div>
          {!ready ? <p className="loading" role="status">Đang tải lịch sử…</p> : displayed.length ? (
            <ul className="mistake-list">
              {displayed.map(({ chapter, question, index }) => {
                const stats = progress[question.id]!;
                return (
                  <li className="mistake-item" key={question.id}>
                    <div>
                      <div className="mistake-item-meta">
                        <span>Chương {chapter.id} · Câu {index + 1}</span>
                        <span className="wrong-count">Sai {stats.wrongCount} lần</span>
                        {stats.lastCorrect && <span className="correct-count">Đã sửa đúng</span>}
                      </div>
                      <h3>{question.stem}</h3>
                    </div>
                    <button type="button" className="button button-outline" onClick={() => start([question.id])}>Làm lại</button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="empty-card">
              <span className="empty-icon tone-1"><RotateCcw aria-hidden="true" /></span>
              <h2>{history.length ? "Chưa có câu trong bộ lọc này" : "Bạn chưa có câu sai"}</h2>
              <p>{history.length ? "Đổi bộ lọc để xem những câu bạn đã trả lời sai trước đây." : "Câu bạn trả lời sai khi ôn thi sẽ tự xuất hiện ở đây."}</p>
              {history.length ? (
                <button type="button" className="button button-outline" onClick={() => {
                  setFilter("all");
                  setChapterFilter(0);
                }}>Xem tất cả câu đã sai</button>
              ) : <a href={chapterLink(chapterFilter ? chapterById[chapterFilter].id : 1, "on-thi")} className="button button-primary">Làm câu hỏi ôn thi</a>}
            </div>
          )}
        </section>
      )}
    </>
  );
}
