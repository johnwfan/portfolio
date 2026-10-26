import { cookies } from "next/headers";
import { addVisit, getVisits } from "@/lib/store";

const COOKIE = "visitor";

// GET: total visits. POST: counts this browser once (cookie) and returns its
// visitor number; later POSTs from the same browser return the same number.
export async function GET() {
  return Response.json({ count: await getVisits() });
}

export async function POST() {
  const jar = await cookies();
  const known = Number(jar.get(COOKIE)?.value);
  if (Number.isInteger(known) && known > 0) return Response.json({ number: known });

  const number = await addVisit();
  jar.set(COOKIE, String(number), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365 * 5,
    path: "/",
  });
  return Response.json({ number });
}
