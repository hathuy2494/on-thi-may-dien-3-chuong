import { getProgress } from "@/db/progress";
import type { Progress } from "@/lib/progress";
import { chatGPTSignInPath, chatGPTSignOutPath, getChatGPTUser } from "./chatgpt-auth";
import { StudyLayout } from "./study-layout";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getChatGPTUser();
  let initial: Progress = {};
  let readError = false;
  let storageKey = "";
  if (user) {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(user.userId));
    storageKey = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
    try {
      initial = await getProgress(user.userId);
    } catch (error) {
      console.error("Loading saved progress failed", error);
      readError = true;
    }
  }

  return <StudyLayout
    initial={initial} readError={readError}
    account={user ? { displayName: user.displayName, storageKey } : null}
    signIn={chatGPTSignInPath("/")} signOut={chatGPTSignOutPath("/")}
  />;
}
