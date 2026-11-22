"use client";

import { useEffect, useState } from "react";
import {
  Activity, BookOpen, ChevronDown,
  ClipboardList, Clock3, GraduationCap, Layers, RefreshCw, Zap,
} from "lucide-react";
import {
  createMeasurementExam, exerciseCount, measurementParts, measurementTopics,
  restoreMeasurementExam, type ExamQuestion,
} from "@/lib/measurement";
import type { DiagramRef, MeasurementExercise, MeasurementPart, MeasurementTopic } from "@/lib/measurement/types";

const courseLink = "#ky-thuat-do-luong";
const examLink = `${courseLink}/luyen-de`;
const picturePath = "/do-luong";
const tabs = [
  { id: "ly-thuyet", label: "Lý thuyết" },
  { id: "cong-thuc", label: "Công thức" },
  { id: "bai-tap", label: "Bài tập theo dạng" },
] as const;
const partIcons = [GraduationCap, Layers, Zap, Activity];
type Tab = (typeof tabs)[number]["id"];

function topicLink(id: string, tab: Tab = "ly-thuyet") {
  const link = `${courseLink}/dang/${id}`;
  return tab === "ly-thuyet" ? link : `${link}/${tab}`;
}

function jumpTo(id: string) {
  const target = document.getElementById(id);
  target?.focus({ preventScroll: true });
  target?.scrollIntoView({ block: "start" });
}

export default function MeasurementCourse({ exam, topicId, tab }: { exam: boolean; topicId?: string; tab?: Tab }) {
  if (exam) return <PracticeExam />;
  if (!topicId) return <Catalog />;
  const part = measurementParts.find((group) => group.topics.some((topic) => topic.id === topicId));
  const topic = part?.topics.find((item) => item.id === topicId);
  if (topic && part) return <TopicScreen key={topic.id} part={part} topic={topic} tab={tab ?? "ly-thuyet"} />;
  return <section className="measure-heading">
    <h1>Dạng bài chưa có trong danh mục</h1>
    <a href={courseLink} className="button button-outline">Các dạng bài</a>
  </section>;
}

function Catalog() {
  return (
    <div className="measurement">
      <section className="measure-hero">
        <div className="measure-hero-copy">
          <p className="hero-kicker"><span /> HỌC PHẦN EE3110</p>
          <h1>Kỹ thuật đo lường</h1>
          <p>Hiểu sơ đồ mạch, nắm công thức và luyện từng dạng trước khi làm đề tự luận.</p>
          <div className="measure-actions">
            <a href={examLink} className="button button-amber"><ClipboardList /> Luyện đề 4 câu</a>
            <button type="button" className="button measure-hero-secondary" onClick={() => jumpTo("cac-phan-do-luong")}>
              Các dạng bài
            </button>
          </div>
        </div>
        <img src={`${picturePath}/anh-bia.webp`} alt="" className="measure-hero-art" />
      </section>

      <header className="measure-catalog-heading" id="cac-phan-do-luong" tabIndex={-1}>
        <div><h2>Ôn theo phần</h2><p>{measurementParts.length} phần · {measurementTopics.length} dạng · {exerciseCount} bài có lời giải</p></div>
        <nav aria-label="Các phần Kỹ thuật đo lường" className="part-shortcuts">
          {measurementParts.map((part, index) => (
            <button type="button" key={part.id} onClick={() => jumpTo(`phan-${part.id}`)} aria-label={`Đến phần ${index + 1} – ${part.title}`}>
              Phần {index + 1}
            </button>
          ))}
        </nav>
      </header>

      {measurementParts.map((part, index) => {
        const Icon = partIcons[index];
        return (
          <section className="measure-part" key={part.id} id={`phan-${part.id}`} tabIndex={-1} aria-labelledby={`tieu-de-${part.id}`}>
            <header className="measure-part-heading">
              <span className={`measure-part-icon part-tone-${index + 1}`}><Icon aria-hidden="true" /></span>
              <div>
                <p>Phần {index + 1} · {part.chapters}</p>
                <h2 id={`tieu-de-${part.id}`}>{part.title}</h2>
                <p>{part.description}</p>
              </div>
            </header>
            <ul className="measure-topics">
              {part.topics.map((topic) => <li key={topic.id}>
                <a href={topicLink(topic.id)}>
                  <span><strong>{topic.title}</strong><small>{topic.chapter} · {topic.exercises.length} bài</small></span>
                </a>
              </li>)}
            </ul>
          </section>
        );
      })}

      <details className="sources measure-sources">
        <summary>Tài liệu dùng để biên soạn</summary>
        <ul>
          <li>Bốn tập bài giảng EE3110 trong Sources của project KTĐL.</li>
          <li>Đề cương chi tiết Đo lường, tài liệu phân dạng GK + CK và tập PDF bài tập đo lường.</li>
          <li>Bốn ảnh đề mẫu để xác định dạng câu, cách trình bày và thời lượng.</li>
        </ul>
      </details>
    </div>
  );
}

function TopicScreen({ part, topic, tab }: { part: MeasurementPart; topic: MeasurementTopic; tab: Tab }) {
  return (
    <div className="measurement">
      <a href={courseLink} className="measure-back">Quay lại Kỹ thuật đo lường</a>
      <header className="measure-heading">
        <p className="measure-overline">{part.title} · {topic.chapter}</p>
        <h1>{topic.title}</h1>
      </header>
      <nav className="measure-tabs" aria-label="Nội dung dạng bài">
        {tabs.map((item) => <a key={item.id} href={topicLink(topic.id, item.id)}
          aria-current={tab === item.id ? "page" : undefined}>{item.label}</a>)}
      </nav>

      {tab === "ly-thuyet" && <>
        <div className="measure-concepts">
          <section><h2>Đo cái gì?</h2><p>{topic.measures}</p></section>
          <section><h2>Nguyên lý hoạt động</h2><p>{topic.principle}</p></section>
        </div>
        <Diagram picture={topic.diagram} notes={topic.notes} eager />
        <details className="measure-detail">
          <summary>Lý thuyết chi tiết <ChevronDown aria-hidden="true" /></summary>
          <div>{topic.theory.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </details>
        <a href={topicLink(topic.id, "cong-thuc")} className="button button-outline measure-next">Xem công thức</a>
      </>}

      {tab === "cong-thuc" && <>
        <section className="measure-formulas" aria-label="Công thức của dạng">
          {topic.formulas.map((formula) => (
            <article className="measure-formula" key={formula.title}>
              <h2>{formula.title}</h2>
              <p className="measure-equation">{formula.equation}</p>
              <p>{formula.note}</p>
            </article>
          ))}
        </section>
        <a href={topicLink(topic.id, "bai-tap")} className="button button-outline measure-next">Làm bài theo dạng</a>
      </>}

      {tab === "bai-tap" && <section className="measure-exercises" aria-label="Bài tập có lời giải">
        {topic.exercises.map((exercise, index) => (
          <article className="measure-exercise" key={exercise.id}>
            <h2>{index + 1}. {exercise.title}</h2>
            <QuestionBody exercise={exercise} />
            <details className="exercise-answer">
              <summary>Mở lời giải chi tiết <ChevronDown aria-hidden="true" /></summary>
              <div><AnswerBody topic={topic} exercise={exercise} /></div>
            </details>
          </article>
        ))}
      </section>}
    </div>
  );
}

function Diagram({ picture, notes, eager }: { picture: DiagramRef; notes?: string[]; eager?: boolean }) {
  return (
    <figure className={notes ? "measure-diagram diagram-with-notes" : "measure-diagram"}>
      <img src={`${picturePath}/${picture.asset}.webp`} alt={picture.alt} width={960} height={576} loading={eager ? "eager" : "lazy"} />
      {notes && <figcaption><ol>
        {notes.map((note) => <li key={note}>{note}</li>)}
      </ol></figcaption>}
    </figure>
  );
}

function QuestionBody({ exercise, points }: { exercise: MeasurementExercise; points?: number }) {
  return <>
    <p className="question-given">{exercise.given}</p>
    <ol className="exam-subparts">
      <li><span>{exercise.theoryQuestion}</span>{points && <small>(1 điểm)</small>}</li>
      <li><span>{exercise.calculationQuestion}</span>{points && <small>({points - 1} điểm)</small>}</li>
    </ol>
  </>;
}

function AnswerBody({ topic, exercise, points }: { topic: MeasurementTopic; exercise: MeasurementExercise; points?: number }) {
  return (
    <div className="answer-body">
      <h4>a) Lý thuyết {points && <span>· 1 điểm</span>}</h4>
      <p>{exercise.theoryAnswer}</p>
      {exercise.theoryDiagram && <Diagram picture={exercise.theoryDiagram} />}
      {exercise.showDiagram && <Diagram picture={topic.diagram} notes={topic.notes} />}
      <h4>b) Tính toán {points && <span>· {points - 1} điểm</span>}</h4>
      <ol className="answer-steps">{exercise.steps.map((step) => <li key={step}>{step}</li>)}</ol>
      {exercise.answerDiagram && <Diagram picture={exercise.answerDiagram} />}
      <p className="answer-result"><strong>Kết quả.</strong> {exercise.result}</p>
      <p className="answer-source">{exercise.source}</p>
    </div>
  );
}

type ExamSheet = { number: number; questions: ExamQuestion[] };
const storageKey = "ktdl-practice-exam-v1";

function readSheet(): ExamSheet {
  try {
    const stored = JSON.parse(sessionStorage.getItem(storageKey) || "null");
    const restored = restoreMeasurementExam(stored?.ids);
    if (restored && Number.isSafeInteger(stored.number) && stored.number >= 1) {
      return { number: stored.number, questions: restored };
    }
  } catch {
    // This session can still use the generator when storage is unavailable.
  }
  return { number: 1, questions: createMeasurementExam() };
}

function saveSheet(sheet: ExamSheet) {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify({
      number: sheet.number,
      ids: sheet.questions.map((question) => question.exercise.id),
    }));
  } catch {
    // The current sheet remains usable in memory.
  }
}

function PracticeExam() {
  const [sheet, setSheet] = useState(readSheet);

  useEffect(() => saveSheet(sheet), [sheet]);

  function generate() {
    setSheet({ number: sheet.number + 1, questions: createMeasurementExam(sheet.questions) });
  }

  return (
    <div className="measurement practice-exam">
      <a href={courseLink} className="measure-back">Quay lại Kỹ thuật đo lường</a>
      <header className="measure-heading exam-toolbar">
        <div><p className="measure-overline">Kỹ thuật đo lường</p><h1>Luyện đề tự luận</h1></div>
        <div className="measure-actions">
          <button type="button" className="button button-primary" onClick={generate}>
            <RefreshCw aria-hidden="true" /> Tạo đề mới
          </button>
          <button type="button" className="button button-outline" onClick={() => jumpTo("dap-an-de-luyen")}>
            Đến đáp án
          </button>
        </div>
      </header>
      <section className="exam-paper" aria-labelledby="exam-paper-title">
        <header className="exam-paper-heading">
          <div>
            <p className="measure-overline" aria-live="polite">Đề luyện số {String(sheet.number).padStart(2, "0")}</p>
            <h2 id="exam-paper-title">Kỹ thuật đo lường</h2>
          </div>
          <ul className="exam-paper-meta">
            <li><Clock3 aria-hidden="true" /> 90 phút</li>
            <li>{sheet.questions.length} câu · {sheet.questions.reduce((sum, item) => sum + item.points, 0)} điểm</li>
          </ul>
        </header>
        <p className="exam-instructions">Trình bày lý thuyết ở ý a, kèm sơ đồ khi đề yêu cầu. Ở ý b, ghi công thức, các bước tính và đơn vị.</p>
        <ol className="exam-questions">
          {sheet.questions.map(({ exercise, points }, index) => (
            <li key={exercise.id}>
              <h3><span>Câu {index + 1}. {exercise.title}</span><span className="question-points">{points} điểm</span></h3>
              <QuestionBody exercise={exercise} points={points} />
            </li>
          ))}
        </ol>
      </section>

      <section className="exam-answers" id="dap-an-de-luyen" tabIndex={-1} aria-labelledby="exam-answers-title">
        <header className="exam-answers-heading"><BookOpen aria-hidden="true" /><h2 id="exam-answers-title">Đáp án và lời giải chi tiết</h2></header>
        {sheet.questions.map(({ topic, exercise, points }, index) => (
          <article key={exercise.id}>
            <h3>Câu {index + 1}. {exercise.title}</h3>
            <AnswerBody topic={topic} exercise={exercise} points={points} />
            <a href={topicLink(topic.id)} className="measure-answer-link">Ôn dạng này</a>
          </article>
        ))}
      </section>
    </div>
  );
}
