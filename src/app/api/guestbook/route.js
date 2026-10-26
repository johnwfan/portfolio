import { headers } from "next/headers";
import { addMessage, allowSign, getMessages } from "@/lib/store";
import { checkMessage } from "@/lib/guestbook";

// GET: latest 20 messages { text, at }. POST { text }: validated, rate limited
// (3 per IP per hour), stored in a capped list.
export async function GET() {
  return Response.json({ messages: await getMessages(20) });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const result = checkMessage(body?.text);
  if (result.error) return Response.json({ error: result.error }, { status: 400 });

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (!(await allowSign(ip))) return Response.json({ error: "rate" }, { status: 429 });

  const message = { text: result.text, at: Date.now() };
  await addMessage(message);
  return Response.json({ message }, { status: 201 });
}
