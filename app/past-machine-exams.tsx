"use client";

import { useEffect, useState } from "react";
import { BookOpen, ClipboardList, Clock3, RotateCcw } from "lucide-react";
import { pastMachineExams } from "@/lib/past-machine-exams";
import {
  answerLetters, countScore, type AnswerLetter, type ExamAnswers, type ExamFigure, type PastExamQuestion, type PastMachineExam,
} from "@/lib/past-machine-exams/types";

const catalogLink = "#may-dien/luyen-de";
const assetPath = "/may-dien/luyen-de";
type Draft = { answers: ExamAnswers; graded: boolean };

function moveTo(id: string) {
  const target = document.getElementById(id);
  if (target instanceof HTMLDetailsElement) target.open = true;
  target?.focus({ preventScroll: true });
  target?.scrollIntoView({ block: "start" });
}

function readDraft(exam: PastMachineExam, key: string): Draft {
  try {
    const saved = JSON.parse(sessionStorage.getItem(key) ?? "null");
    const answers: ExamAnswers = {};
    for (const { number } of exam.questions) {
      const answer = answerLetters.find((letter) => letter === saved?.answers?.[number]);
      if (answer) answers[number] = answer;
    }
    return { answers, graded: saved?.graded === true && Object.keys(answers).length > 0 };
  } catch {
    return { answers: {}, graded: false };
  }
}

export default function PastMachineExams({ code }: { code?: string }) {
  const exam = pastMachineExams.find((item) => item.code === code);
  if (exam) return <PracticePaper key={exam.code} exam={exam} />;

  return (
    <section className="past-machine">
      <a href="#may-dien" className="measure-back">Quay lại Máy điện</a>
      <header className="measure-heading">
        <p className="measure-overline">MÁY ĐIỆN 1 · EE3140</p>
        <h1>Luyện đề Máy điện</h1>
        <p className="past-description">{code ? "Mã đề này chưa có trong danh sách." : "Làm đề các kỳ trước và xem lời giải chi tiết."}</p>
      </header>
      <div className="past-exams-list">
        {pastMachineExams.map((item) => (
          <a href={`${catalogLink}/${item.code}`} className="past-exam-card" key={item.code}>
            <span className="stat-icon tone-2"><ClipboardList aria-hidden="true" /></span>
            <div>
              <p className="measure-overline">Mã đề {item.code}</p>
              <h2>{item.title}</h2>
              <p>{item.questions.length} câu trắc nghiệm · {item.minutes} phút · Có lời giải</p>
            </div>
            <span className="past-exam-open">Mở đề</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function PracticePaper({ exam }: { exam: PastMachineExam }) {
  const storageKey = `may-dien/luot-lam-de/${exam.code}/v1`;
  const [draft, setDraft] = useState(() => readDraft(exam, storageKey));
  const { answers, graded } = draft;
  const answered = Object.keys(answers).length;
  const score = countScore(exam.questions, answers);
  const withNotes = exam.questions.filter((item) => item.note);

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(draft));
    } catch {
      // The paper remains usable when session storage is unavailable.
    }
  }, [draft, storageKey]);

  function select(number: number, letter: AnswerLetter) {
    setDraft((previous) => ({ ...previous, answers: { ...previous.answers, [number]: letter } }));
  }

  function grade() {
    setDraft((previous) => ({ ...previous, graded: true }));
    moveTo("dap-an-may-dien");
  }

  function reset() {
    setDraft({ answers: {}, graded: false });
    moveTo("de-may-dien-title");
  }

  return (
    <div className="past-machine">
      <a href={catalogLink} className="measure-back">Danh sách đề Máy điện</a>
      <header className="measure-heading exam-toolbar">
        <div><p className="measure-overline">MÁY ĐIỆN 1 · {exam.course}</p><h1>Luyện đề Máy điện</h1></div>
        <button type="button" className="button button-outline" onClick={() => moveTo("dap-an-may-dien")}>Đến đáp án</button>
      </header>

      <section className="exam-paper past-exam-paper" aria-labelledby="de-may-dien-title">
        <header className="exam-paper-heading">
          <div>
            <p className="measure-overline">Mã đề {exam.code}</p>
            <h2 id="de-may-dien-title" tabIndex={-1}>{exam.title}</h2>
          </div>
          <ul className="exam-paper-meta">
            <li><Clock3 aria-hidden="true" /> {exam.minutes} phút</li>
            <li>{exam.questions.length} câu trắc nghiệm</li>
          </ul>
        </header>
        <div className="past-answer-sheet">
          <div className="past-sheet-toolbar">
            <h3>Phiếu trả lời</h3>
            <span aria-live="polite">Đã chọn {answered}/{exam.questions.length} câu</span>
          </div>
          <nav className="past-number-grid" aria-label="Chuyển đến câu trong đề">
            {exam.questions.map((question) => (
              <button type="button" key={question.number} onClick={() => moveTo(`cau-may-dien-${question.number}`)}
                className={answers[question.number] ? "has-answer" : ""}
                aria-label={`Đến câu ${question.number}${answers[question.number] ? `, đã chọn ${answers[question.number]}` : ""}`}>
                <strong>{question.number}</strong><small>{answers[question.number] ?? "·"}</small>
              </button>
            ))}
          </nav>
          <p>Bấm số để chuyển đến câu. Lượt làm được giữ trong tab này.</p>
        </div>

        <ol className="exam-questions past-questions">
          {exam.questions.map((question) => (
            <li key={question.number} id={`cau-may-dien-${question.number}`} tabIndex={-1}>
              <h3>Câu {question.number}</h3>
              <p className="question-given">{question.prompt}</p>
              {question.figure && <PaperFigure figure={question.figure} />}
              <fieldset className="past-choices">
                <legend className="sr-only">Chọn đáp án cho câu {question.number}</legend>
                {answerLetters.map((letter, index) => (
                  <label className="past-choice" key={letter}>
                    <input type="radio" name={`de-${exam.code}-cau-${question.number}`} value={letter}
                      checked={answers[question.number] === letter} onChange={() => select(question.number, letter)} />
                    <span className="past-choice-letter">{letter}.</span>
                    <span>{question.choices[index]}</span>
                  </label>
                ))}
              </fieldset>
              <button type="button" className="past-details-link" onClick={() => moveTo(`loi-giai-may-dien-${question.number}`)}>
                Xem lời giải câu {question.number}
              </button>
            </li>
          ))}
        </ol>
        <div className="past-exam-actions">
          <button className="button button-primary" type="button" disabled={!answered} onClick={grade}>Chấm bài</button>
          <span>Đã chọn {answered}/{exam.questions.length} câu</span>
        </div>
      </section>

      <section className="exam-answers past-solutions" id="dap-an-may-dien" tabIndex={-1} aria-labelledby="machine-answer-title">
        <header className="exam-answers-heading"><BookOpen aria-hidden="true" />
          <h2 id="machine-answer-title">Đáp án và lời giải chi tiết</h2>
        </header>
        <div className="past-score-box">
          <div>
            <p><strong>Đáp án tham khảo</strong></p>
            {graded && <p className="past-result" role="status"><strong>{score.correct}/{score.total} câu đúng</strong> · {answered}/{exam.questions.length} đã chọn</p>}
            {withNotes.length > 0 && (
              <p>Câu {withNotes.map(({ number }) => number).join(", ")} có lưu ý về dữ kiện hoặc cách hiểu. Các câu này để đối chiếu riêng khi chấm thử.</p>
            )}
          </div>
          {graded && <button className="button button-outline" type="button" onClick={reset}><RotateCcw aria-hidden="true" /> Làm lại đề</button>}
        </div>
        <nav className="past-number-grid past-key-grid" aria-label="Đáp án theo số câu">
          {exam.questions.map((question) => {
            const chosen = answers[question.number];
            const status = question.note ? "key-note" : graded && chosen ? (chosen === question.answer ? "key-correct" : "key-wrong") : "";
            const comparison = graded && !question.note && chosen ? (chosen === question.answer ? ", đúng" : ", sai") : "";
            return <button type="button" key={question.number} className={status}
              aria-label={`Lời giải câu ${question.number}, phương án ${question.answer}${comparison}${question.note ? ", có lưu ý" : ""}`}
              onClick={() => moveTo(`loi-giai-may-dien-${question.number}`)}>
              <strong>{question.number}</strong><small>{question.answer}{question.note && "*"}</small>
            </button>;
          })}
        </nav>
        <div className="past-solutions-list">
          {exam.questions.map((question) => <Solution key={question.number} question={question} chosen={graded ? answers[question.number] : undefined} />)}
        </div>
        <details className="sources">
          <summary>Nguồn và cách đối chiếu</summary>
          <p>Đề giữa kỳ Máy điện 1, mã {exam.code}, từ 4 trang ảnh đề. Lời giải được biên soạn theo dữ kiện và thứ tự lựa chọn của mã này.</p>
          <ul>
            <li><a href="https://archive.nptel.ac.in/content/storage2/courses/108103009/module6/lec18/6.html" target="_blank" rel="noreferrer">NPTEL · Độ trượt và tần số rôto</a></li>
            <li><a href="https://library.e.abb.com/public/6b4e1a3530814df0c12579bb0030e58b/1SFC132060M0201.pdf" target="_blank" rel="noreferrer">ABB · Sổ tay khởi động mềm</a></li>
            <li><a href="https://download.se.com/files?p_Doc_Ref=NHA71460-01" target="_blank" rel="noreferrer">Schneider Electric · Hướng dẫn về máy biến dòng</a></li>
          </ul>
        </details>
      </section>
    </div>
  );
}

function PaperFigure({ figure }: { figure: ExamFigure }) {
  return (
    <figure className="past-figure">
      <img src={`${assetPath}/${figure.file}`} alt={figure.alt} width={960} height={576} loading="lazy" />
      <figcaption>{figure.caption}</figcaption>
    </figure>
  );
}

function Solution({ question, chosen }: { question: PastExamQuestion; chosen?: AnswerLetter }) {
  return (
    <details className="past-solution" id={`loi-giai-may-dien-${question.number}`} tabIndex={-1}>
      <summary>
        <span><strong>Câu {question.number}</strong><span className="past-solution-topic"> · {question.topic}</span></span>
        <span className={`past-answer-badge ${question.note ? "is-note" : ""}`}>{question.answer}{question.note && "*"}</span>
      </summary>
      <div className="past-solution-body">
        <p className="past-answer-line"><strong>{question.note ? "Đối chiếu phương án" : "Đáp án"} {question.answer}.</strong> {question.choices[answerLetters.indexOf(question.answer)]}</p>
        {chosen && <p className="past-chosen">Bạn đã chọn {chosen}{!question.note && (chosen === question.answer ? " · Đúng" : " · Sai")}.</p>}
        <ol>{question.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        {question.solutionFigure && <PaperFigure figure={question.solutionFigure} />}
        {question.note && <p className="past-note"><strong>Lưu ý khi đối chiếu.</strong> {question.note}</p>}
        <button type="button" className="past-details-link" onClick={() => moveTo(`cau-may-dien-${question.number}`)}>Về câu {question.number} trong đề</button>
      </div>
    </details>
  );
}
