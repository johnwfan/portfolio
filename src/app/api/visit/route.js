import { addVisit, getVisits } from "@/lib/store";

// GET: total visits. POST: counts one visit and returns the new total.
export async function GET() {
  return Response.json({ count: await getVisits() });
}

export async function POST() {
  return Response.json({ count: await addVisit() });
}
