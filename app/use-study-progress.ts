"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { questionById } from "@/lib/course";
import type { Option, Question } from "@/lib/course/types";
import { addAttempt, type Attempt, type Progress } from "@/lib/progress";

const guestKey = "may-dien:guest:v1";
type SyncStatus = "saved" | "saving" | "error" | "expired";

function readLocal<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null") ?? fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key: string, data: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Practice still works in memory when browser storage is unavailable.
  }
}

export function useStudyProgress(accountKey: string | undefined, initial: Progress, readError: boolean) {
  const queueKey = accountKey ? `may-dien:pending:v1:${accountKey}` : undefined;
  const [confirmed, setConfirmed] = useState(initial);
  const [pending, setPending] = useState<Attempt[]>([]);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<SyncStatus>(readError ? "error" : "saved");

  const confirmedRef = useRef(initial);
  const queueRef = useRef<Attempt[]>([]);
  const flushing = useRef(false);

  const flush = useCallback(async (refresh = false) => {
    if (!queueKey || flushing.current) return;
    if (!queueRef.current.length && !refresh) return;
    flushing.current = true;
    setStatus("saving");
    try {
      do {
        const attempt = queueRef.current[0];
        const response = await fetch("/api/tien-do", attempt ? {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(attempt),
          cache: "no-store",
        } : { cache: "no-store" });
        if (response.status === 401) {
          setStatus("expired");
          return;
        }
        if (!response.ok) throw new Error("Progress sync failed");
        const result = await response.json() as { progress: Progress };
        confirmedRef.current = result.progress;
        setConfirmed(result.progress);
        if (attempt) {
          queueRef.current = queueRef.current.slice(1);
          writeLocal(queueKey, queueRef.current);
          setPending(queueRef.current);
        }
      } while (queueRef.current.length);
      setStatus("saved");
    } catch {
      setStatus("error");
    } finally {
      flushing.current = false;
    }
  }, [queueKey]);

  useEffect(() => {
    if (queueKey) {
      const stored = readLocal<Attempt[]>(queueKey, []);
      queueRef.current = Array.isArray(stored) ? stored.filter((event) =>
        event && typeof event.eventId === "string" && questionById.has(event.questionId) &&
        [0, 1, 2, 3].includes(event.option),
      ) : [];
      setPending(queueRef.current);
      void flush(readError);
    } else {
      const saved = readLocal<Progress>(guestKey, {});
      confirmedRef.current = saved;
      setConfirmed(saved);
    }
    setReady(true);
    const reconnect = () => void flush();
    window.addEventListener("online", reconnect);
    return () => window.removeEventListener("online", reconnect);
  }, [flush, queueKey, readError]);

  const record = useCallback((question: Question, option: Option) => {
    const attempt = { eventId: crypto.randomUUID(), questionId: question.id, option };
    if (!queueKey) {
      const progress = addAttempt(confirmedRef.current, attempt, option === question.correct);
      confirmedRef.current = progress;
      setConfirmed(progress);
      writeLocal(guestKey, progress);
      return;
    }
    queueRef.current = [...queueRef.current, attempt];
    writeLocal(queueKey, queueRef.current);
    setPending(queueRef.current);
    void flush();
  }, [flush, queueKey]);

  const progress = useMemo(() => pending.reduce((current, attempt) => {
    const question = questionById.get(attempt.questionId);
    return question ? addAttempt(current, attempt, attempt.option === question.correct) : current;
  }, confirmed), [confirmed, pending]);

  return { progress, ready, status, record, retry: () => void flush(true) };
}
