import { getChatGPTUser } from "@/app/chatgpt-auth";
import { getProgress, saveAttempt } from "@/db/progress";
import { questionById } from "@/lib/course";
import type { Attempt } from "@/lib/progress";

export const dynamic = "force-dynamic";

const privateHeaders = { "Cache-Control": "private, no-store" };

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Cần đăng nhập." }, { status: 401, headers: privateHeaders });
  try {
    return Response.json({ progress: await getProgress(user.userId) }, { headers: privateHeaders });
  } catch (error) {
    console.error("Reading progress failed", error);
    return Response.json({ error: "Tạm thời chưa đọc được tiến độ." }, { status: 503, headers: privateHeaders });
  }
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Cần đăng nhập." }, { status: 401, headers: privateHeaders });

  const site = request.headers.get("sec-fetch-site");
  const origin = request.headers.get("origin");
  if (site === "cross-site" || (origin && origin !== new URL(request.url).origin)) {
    return Response.json({ error: "Yêu cầu không hợp lệ." }, { status: 403, headers: privateHeaders });
  }
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json") {
    return Response.json({ error: "Cần dữ liệu JSON." }, { status: 415, headers: privateHeaders });
  }

  const raw: unknown = await request.json().catch(() => null);
  const body = raw && typeof raw === "object" ? raw as Partial<Attempt> : null;
  const question = typeof body?.questionId === "string" ? questionById.get(body.questionId) : undefined;
  if (!body || !question || typeof body.eventId !== "string" ||
      !/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(body.eventId) ||
      typeof body.option !== "number" || !Number.isInteger(body.option) ||
      body.option < 0 || body.option > 3) {
    return Response.json({ error: "Câu trả lời không hợp lệ." }, { status: 400, headers: privateHeaders });
  }

  try {
    const attempt: Attempt = { eventId: body.eventId, questionId: question.id, option: body.option };
    return Response.json({ progress: await saveAttempt(user.userId, attempt, attempt.option === question.correct) }, {
      headers: privateHeaders,
    });
  } catch (error) {
    console.error("Saving progress failed", error);
    return Response.json({ error: "Tạm thời chưa lưu được tiến độ." }, { status: 503, headers: privateHeaders });
  }
}
