import type { Metadata } from "next";
import "./study.css";
import "./measurement.css";

export const metadata: Metadata = {
  title: "Ôn thi kỹ thuật · Máy điện & Kỹ thuật đo lường",
  description: "Ôn thi Máy điện và Kỹ thuật đo lường. Xem lý thuyết có hình, tra công thức, làm bài theo dạng và luyện đề có đáp án chi tiết.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="vi"><body>{children}</body></html>;
}
