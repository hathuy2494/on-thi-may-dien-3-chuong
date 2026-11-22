"use client";

import { Activity, Layers, Orbit } from "lucide-react";
import type { ChapterId } from "@/lib/course/types";

export type ChapterSection = "ly-thuyet" | "cong-thuc" | "on-thi";

export function chapterLink(id: ChapterId, section: ChapterSection = "ly-thuyet") {
  return `#chuong-${id}${section === "ly-thuyet" ? "" : `/${section}`}`;
}

export function ChapterIcon({ id }: { id: ChapterId }) {
  const Icon = id === 1 ? Layers : id === 2 ? Orbit : Activity;
  return <Icon aria-hidden="true" />;
}

export function ProgressBar({ value, total, label }: { value: number; total: number; label: string }) {
  return <progress className="progress" max={Math.max(total, 1)} value={value} aria-label={label} />;
}
