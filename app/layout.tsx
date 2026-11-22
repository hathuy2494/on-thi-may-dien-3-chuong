import type { Metadata } from "next";
import "./study.css";

export const metadata: Metadata = {
  title: "Ôn tập Máy điện",
  description: "Lý thuyết, công thức và câu hỏi có lời giải của ba chương đầu Máy điện 1. Làm bài, lưu tiến độ và kiểm tra lại câu sai.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="vi"><body>{children}</body></html>;
}
