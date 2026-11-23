"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import {
  Activity, BookOpen, Check, ChevronRight, CircleHelp, ClipboardList, Cloud, CloudOff,
  GalleryHorizontalEnd, LayoutGrid, LogIn, LogOut, Menu, RotateCcw,
  Target, Zap,
} from "lucide-react";
import { chapters, chapterById, courseQuestionCount } from "@/lib/course";
import type { Chapter, ChapterId } from "@/lib/course/types";
import { chapterProgress, type Progress } from "@/lib/progress";
import { ChapterScreen } from "./study-chapter";
import { MistakesScreen } from "./study-quiz";
import { ChapterIcon, chapterLink, ProgressBar, type ChapterSection } from "./study-ui";
import { useStudyProgress } from "./use-study-progress";

type Account = { displayName: string; storageKey: string };
type MeasurementTab = "ly-thuyet" | "cong-thuc" | "bai-tap";
type View =
  | { kind: "library" | "home" | "mistakes" | "measurement" | "measurement-exam" }
  | { kind: "chapter"; id: ChapterId; section: ChapterSection }
  | { kind: "machine-exam"; code?: string }
  | { kind: "measurement-topic"; id: string; tab: MeasurementTab };

const MeasurementCourse = lazy(() => import("./measurement-course"));
const PastMachineExams = lazy(() => import("./past-machine-exams"));
const machineExamsLink = "#may-dien/luyen-de";
type StudyProps = {
  account: Account | null;
  initial: Progress;
  readError: boolean;
  signIn: string;
  signOut: string;
};

function readView(hash: string): View {
  const machineExam = /^#may-dien\/luyen-de(?:\/([0-9]+))?$/.exec(hash);
  if (machineExam) return { kind: "machine-exam", code: machineExam[1] };
  if (hash === "#ky-thuat-do-luong/luyen-de") return { kind: "measurement-exam" };
  const topic = /^#ky-thuat-do-luong\/dang\/([a-z0-9-]+)(?:\/(cong-thuc|bai-tap))?$/.exec(hash);
  if (topic) return { kind: "measurement-topic", id: topic[1], tab: (topic[2] || "ly-thuyet") as MeasurementTab };
  if (hash === "#ky-thuat-do-luong") return { kind: "measurement" };
  if (hash === "#cau-sai") return { kind: "mistakes" };
  const match = /^#chuong-([123])(?:\/(cong-thuc|on-thi))?$/.exec(hash);
  if (match) return { kind: "chapter", id: Number(match[1]) as ChapterId, section: (match[2] || "ly-thuyet") as ChapterSection };
  if (hash === "#may-dien" || hash === "#tong-quan") return { kind: "home" };
  return { kind: "library" };
}

export function StudyLayout({ account, initial, readError, signIn, signOut }: StudyProps) {
  const [view, setView] = useState<View>({ kind: "library" });
  const [menuOpen, setMenuOpen] = useState(false);
  const { progress, ready, status, record, retry } = useStudyProgress(account?.storageKey, initial, readError);

  useEffect(() => {
    const changeView = () => {
      setView(readView(window.location.hash));
      setMenuOpen(false);
      window.scrollTo(0, 0);
    };
    changeView();
    window.addEventListener("hashchange", changeView);
    return () => window.removeEventListener("hashchange", changeView);
  }, []);

  const summary = Object.values(progress).reduce((totals, item) => {
    if (!item) return totals;
    totals.answered += 1;
    totals.attempts += item.attempts;
    totals.wrong += item.wrongCount;
    totals.review += item.lastCorrect ? 0 : 1;
    return totals;
  }, { answered: 0, attempts: 0, wrong: 0, review: 0 });

  const currentChapter = view.kind === "chapter" ? chapterById[view.id] : null;
  const inMeasurement = view.kind === "measurement" || view.kind === "measurement-topic" || view.kind === "measurement-exam";
  const inMachineChapters = view.kind === "home" || view.kind === "chapter" || view.kind === "mistakes";
  const inMachines = inMachineChapters || view.kind === "machine-exam";
  const pageName = currentChapter ? `Chương ${currentChapter.id}`
    : view.kind === "mistakes" ? "Ôn câu sai"
    : view.kind === "measurement-topic" ? "Ôn theo dạng"
    : view.kind === "measurement-exam" || view.kind === "machine-exam" ? "Luyện đề"
    : "Tổng quan";

  const navigation = (
    <nav aria-label="Nội dung học">
      <a href="#mon-hoc" className={`nav-link ${view.kind === "library" ? "selected" : ""}`}
        aria-current={view.kind === "library" ? "page" : undefined}>
        <LayoutGrid aria-hidden="true" /> Tất cả môn học
      </a>
      <div className="nav-group">
        <p className="nav-label">Môn học</p>
        <a href="#may-dien" className={`nav-link ${inMachines ? "selected" : ""}`}
          aria-current={view.kind === "home" ? "page" : undefined}>
          <Zap aria-hidden="true" /> Máy điện
        </a>
        <a href="#ky-thuat-do-luong" className={`nav-link ${inMeasurement ? "selected" : ""}`}
          aria-current={view.kind === "measurement" ? "page" : undefined}>
          <Activity aria-hidden="true" /> Kỹ thuật đo lường
        </a>
      </div>
      {inMachines && <div className="nav-group">
        <p className="nav-label">Máy điện</p>
        {chapters.map((chapter) => (
          <a key={chapter.id} className={`nav-link ${view.kind === "chapter" && view.id === chapter.id ? "selected" : ""}`}
            href={chapterLink(chapter.id)} aria-current={view.kind === "chapter" && view.id === chapter.id ? "page" : undefined}>
            <span className={`nav-chapter-number tone-${chapter.id}`}>{chapter.id}</span>
            <span>{chapter.shortTitle}</span>
          </a>
        ))}
        <a href={machineExamsLink} className={`nav-link ${view.kind === "machine-exam" ? "selected" : ""}`}
          aria-current={view.kind === "machine-exam" ? "page" : undefined}>
          <ClipboardList aria-hidden="true" /> Luyện đề
        </a>
        <a href="#cau-sai" className={`nav-link ${view.kind === "mistakes" ? "selected" : ""}`}
          aria-current={view.kind === "mistakes" ? "page" : undefined}>
          <RotateCcw aria-hidden="true" /> Ôn câu sai
          {summary.review > 0 && <span className="nav-count">{summary.review}</span>}
        </a>
      </div>}
      {inMeasurement && <div className="nav-group">
        <p className="nav-label">Kỹ thuật đo lường</p>
        <a href="#ky-thuat-do-luong" className={`nav-link ${view.kind === "measurement-topic" ? "selected" : ""}`}>
          <BookOpen aria-hidden="true" /> Các dạng bài
        </a>
        <a href="#ky-thuat-do-luong/luyen-de" className={`nav-link ${view.kind === "measurement-exam" ? "selected" : ""}`}
          aria-current={view.kind === "measurement-exam" ? "page" : undefined}>
          <ClipboardList aria-hidden="true" /> Luyện đề
        </a>
      </div>}
    </nav>
  );

  return (
    <div className="shell">
      <a href="#noi-dung" className="skip-link" onClick={(event) => {
        event.preventDefault();
        document.getElementById("noi-dung")?.focus();
      }}>Đến nội dung chính</a>
      <aside className="sidebar">
        <Brand />
        {navigation}
        {inMachineChapters && <div className="sidebar-bottom">
          <div className="sidebar-icon">{account ? <Cloud aria-hidden="true" /> : <BookOpen aria-hidden="true" />}</div>
          <p className="sidebar-note-title">{account ? "Tiến độ của bạn" : "Lưu tiến độ học"}</p>
          <p>{account ? "Tiếp tục ôn tập trên thiết bị khác bằng cùng tài khoản." : "Đăng nhập để xem lại tiến độ và lịch sử câu sai trên các thiết bị."}</p>
          {!account && <a href={signIn} target="_top" className="text-link">Đăng nhập với ChatGPT</a>}
        </div>}
      </aside>
      <div className="workspace">
        <header className="topbar">
          <div className="topbar-inner">
            <div className="mobile-brand">
              <button type="button" className="icon-button" aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
                aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>
                <Menu aria-hidden="true" />
              </button>
              <Brand compact />
            </div>
            <div className="breadcrumb">
              {view.kind === "library" ? <span>Môn học</span> : <>
                <a href="#mon-hoc">Môn học</a>
                <ChevronRight aria-hidden="true" />
                <a href={inMeasurement ? "#ky-thuat-do-luong" : "#may-dien"}>{inMeasurement ? "Kỹ thuật đo lường" : "Máy điện"}</a>
                <ChevronRight aria-hidden="true" />
                <span>{pageName}</span>
              </>}
            </div>
            {!account ? (
              <a href={signIn} target="_top" className="button button-outline login">
                <LogIn aria-hidden="true" /> Đăng nhập
              </a>
            ) : (
              <details className="account">
                <summary><span className="avatar" aria-hidden="true">{account.displayName.slice(0, 1).toUpperCase()}</span>
                  <span className="account-name">{account.displayName}</span></summary>
                <div className="account-popover">
                  <p>{account.displayName}</p>
                  <a href={signOut} target="_top" className="button button-outline"><LogOut aria-hidden="true" /> Đăng xuất</a>
                </div>
              </details>
            )}
          </div>
          <div id="mobile-nav" className="mobile-nav" hidden={!menuOpen}>{navigation}</div>
        </header>

        <main id="noi-dung" className="main" tabIndex={-1}>
          {inMachineChapters && account && (status === "error" || status === "expired") && (
            <div className="sync-warning" role="status">
              <CloudOff aria-hidden="true" />
              <span>{status === "expired" ? "Phiên đăng nhập đã hết hạn." : "Tiến độ chưa đồng bộ."}</span>
              {status === "expired" ? <a href={signIn} target="_top" className="text-link">Đăng nhập lại</a>
                : <button className="text-link" onClick={retry} type="button">Thử lại</button>}
            </div>
          )}
          {view.kind === "library" && <CourseLibrary />}
          {view.kind === "home" && <Overview progress={progress} summary={summary} />}
          {view.kind === "chapter" && currentChapter && (
            <ChapterScreen chapter={currentChapter} section={view.section} progress={progress} ready={ready} record={record} />
          )}
          {view.kind === "mistakes" && <MistakesScreen progress={progress} ready={ready} record={record} />}
          {view.kind === "machine-exam" && (
            <Suspense fallback={<p className="load-measurement" role="status">Đang mở đề Máy điện…</p>}>
              <PastMachineExams code={view.code} />
            </Suspense>
          )}
          {inMeasurement && (
            <Suspense fallback={<p className="load-measurement" role="status">Đang mở Kỹ thuật đo lường…</p>}>
              <MeasurementCourse exam={view.kind === "measurement-exam"}
                topicId={view.kind === "measurement-topic" ? view.id : undefined}
                tab={view.kind === "measurement-topic" ? view.tab : undefined} />
            </Suspense>
          )}
          <footer className="footer">
            <span>Ôn thi kỹ thuật</span>
            {inMachineChapters && (account ? (
              <span className="footer-status" aria-live="polite">
                {status === "saved" && <><Check aria-hidden="true" /> Đã đồng bộ</>}
                {status === "saving" && <><Cloud aria-hidden="true" /> Đang đồng bộ</>}
              </span>
            ) : <span className="footer-status">Chế độ khách · Lưu trong trình duyệt</span>)}
          </footer>
        </main>
      </div>
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#mon-hoc" className="brand">
      <span className="brand-mark"><Zap aria-hidden="true" /></span>
      <span><strong>Ôn thi kỹ thuật</strong>{!compact && <small>Thư viện môn học</small>}</span>
    </a>
  );
}

function CourseLibrary() {
  return (
    <section className="course-library" aria-labelledby="library-title">
      <header className="library-header">
        <p className="hero-kicker"><span /> THƯ VIỆN MÔN HỌC</p>
        <h1 id="library-title">Ôn thi kỹ thuật</h1>
        <p>Chọn môn để xem lý thuyết, tra công thức và luyện bài có lời giải.</p>
      </header>
      <div className="library-grid">
        <a href="#may-dien" className="library-card library-machines">
          <div className="library-art"><img src="/may-bien-ap.webp" alt="" /></div>
          <div className="library-card-body">
            <span className="library-code">EE3140 · 3 chương</span>
            <h2>Máy điện</h2>
            <p>Máy biến áp, dây quấn và máy điện không đồng bộ. {courseQuestionCount} câu trắc nghiệm và sổ câu sai.</p>
          </div>
        </a>
        <a href="#ky-thuat-do-luong" className="library-card library-measurement">
          <div className="library-art"><img src="/do-luong/anh-bia.webp" alt="" /></div>
          <div className="library-card-body">
            <span className="library-code">EE3110 · 4 phần</span>
            <h2>Kỹ thuật đo lường</h2>
            <p>Sai số, thiết bị đo, đại lượng điện và cảm biến. Luyện đề tự luận 4 câu có đáp án chi tiết.</p>
          </div>
        </a>
      </div>
    </section>
  );
}

function Overview({ progress, summary }: {
  progress: Progress;
  summary: { answered: number; attempts: number; wrong: number; review: number };
}) {
  const recentChapter = chapters.flatMap((chapter) => chapter.questions.map((question) => ({
    chapter, order: progress[question.id]?.lastOrder ?? 0,
  }))).sort((a, b) => b.order - a.order)[0]?.chapter ?? chapters[0];
  const nextChapter = [recentChapter, ...chapters].find((chapter) =>
    chapterProgress(chapter, progress).answered < chapter.questions.length,
  );
  const accuracy = summary.attempts ? Math.round((summary.attempts - summary.wrong) * 100 / summary.attempts) : 0;
  const startLink = summary.answered === 0 ? chapterLink(1) : nextChapter ? chapterLink(nextChapter.id, "on-thi") : "#cau-sai";

  return (
    <>
      <section className="hero">
        <div className="hero-art" aria-hidden="true"><img src="/may-bien-ap.webp" alt="" fetchPriority="high" /></div>
        <div className="hero-copy">
          <p className="hero-kicker"><span /> HỌC PHẦN EE3140</p>
          <h1>Ôn tập Máy điện</h1>
          <p className="hero-description">Hệ thống lý thuyết, tra nhanh công thức và luyện câu hỏi từ đề Máy điện của ba chương đầu.</p>
          <a className="button button-amber" href={startLink}>
            {summary.answered === 0 ? "Bắt đầu học" : nextChapter ? "Tiếp tục ôn thi" : "Ôn lại câu sai"}
          </a>
        </div>
      </section>

      <section className="summary-grid" aria-label="Tiến độ ôn tập">
        <div className="stat">
          <span className="stat-icon tone-1"><ClipboardList aria-hidden="true" /></span>
          <div><p>Đã làm</p><strong>{summary.answered}<small> / {courseQuestionCount} câu</small></strong></div>
        </div>
        <div className="stat">
          <span className="stat-icon tone-2"><Target aria-hidden="true" /></span>
          <div><p>Tỉ lệ đúng</p><strong>{summary.attempts ? `${accuracy}%` : "—"} <small>· {summary.attempts} lượt</small></strong></div>
        </div>
        <a href="#cau-sai" className="stat stat-link">
          <span className="stat-icon tone-3"><RotateCcw aria-hidden="true" /></span>
          <div><p>Cần ôn lại</p><strong>{summary.review}<small> câu</small></strong></div>
        </a>
      </section>

      <section className="chapter-section" aria-labelledby="chapter-list-title">
        <div className="section-heading">
          <div><h2 id="chapter-list-title">Các chương ôn tập</h2>
            <p>Chọn một chương để xem lý thuyết, công thức và làm bài.</p></div>
        </div>
        <div className="chapter-grid">
          {chapters.map((chapter) => <ChapterCard key={chapter.id} chapter={chapter} progress={progress} />)}
        </div>
      </section>

      <section className="review-banner" aria-labelledby="machine-exams-banner-title">
        <span className="stat-icon tone-2"><ClipboardList aria-hidden="true" /></span>
        <div><h2 id="machine-exams-banner-title">Luyện đề Máy điện</h2>
          <p>Làm đề giữa kỳ theo thứ tự gốc và xem lời giải từng câu.</p></div>
        <a href={machineExamsLink} className="button button-outline">Mở danh sách đề</a>
      </section>

      <section className="review-banner" aria-labelledby="review-banner-title">
        <span className="stat-icon tone-3"><CircleHelp aria-hidden="true" /></span>
        <div><h2 id="review-banner-title">Ôn lại câu đã sai</h2>
          <p>Kiểm tra lại từng câu và xem số lần bạn trả lời sai.</p></div>
        <a href="#cau-sai" className="button button-outline">Mở sổ câu sai</a>
      </section>
      <details className="sources">
        <summary>Tài liệu tham khảo</summary>
        <p>Bố cục theo <a href="https://www.hust.edu.vn/uploads/sys/quality-assurance/2019/05/cea-5-2-2-detail-ouline-of-the-module1.410148.21772.pdf#page=32" target="_blank" rel="noreferrer">đề cương EE3140 của Bách khoa Hà Nội</a>. Nguồn đề được ghi dưới từng câu hỏi.</p>
      </details>
    </>
  );
}

function ChapterCard({ chapter, progress }: { chapter: Chapter; progress: Progress }) {
  const { answered } = chapterProgress(chapter, progress);
  return (
    <article className={`chapter-card chapter-${chapter.id}`}>
      <div className="chapter-card-top">
        <span className={`stat-icon tone-${chapter.id}`}><ChapterIcon id={chapter.id} /></span>
        <span>Chương {chapter.id}</span>
      </div>
      <h3><a href={chapterLink(chapter.id)}>{chapter.title}</a></h3>
      <p>{chapter.description}</p>
      <div className="chapter-card-progress">
        <div><span><GalleryHorizontalEnd aria-hidden="true" /> {chapter.questions.length} câu</span>
          <span>{answered}/{chapter.questions.length} đã làm</span></div>
        <ProgressBar value={answered} total={chapter.questions.length} label={`Tiến độ chương ${chapter.id}`} />
      </div>
    </article>
  );
}
