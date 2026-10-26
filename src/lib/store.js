import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Upstash Redis when configured (Vercel integration env vars), otherwise an
// in-memory store so local dev works without credentials. Memory is per server
// process and resets on restart.

// The Vercel Marketplace integration may name these KV_REST_API_*; accept both.
const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

const VISITS = "visits";
const GUESTBOOK = "guestbook";
const KEEP = 200; // capped list: LPUSH + LTRIM 0 199

const ratelimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, "1 h"), prefix: "gb-rl" })
  : null;

// Survives dev hot reloads.
const memory = (globalThis.__jfStore ??= { visits: 0, messages: [], hits: new Map() });

export async function addVisit() {
  if (redis) return redis.incr(VISITS);
  memory.visits += 1;
  return memory.visits;
}

export async function getVisits() {
  if (redis) return Number((await redis.get(VISITS)) ?? 0);
  return memory.visits;
}

export async function getMessages(limit = 20) {
  if (redis) return redis.lrange(GUESTBOOK, 0, limit - 1);
  return memory.messages.slice(0, limit);
}

export async function addMessage(message) {
  if (redis) {
    await redis.lpush(GUESTBOOK, message);
    await redis.ltrim(GUESTBOOK, 0, KEEP - 1);
    return;
  }
  memory.messages.unshift(message);
  memory.messages.length = Math.min(memory.messages.length, KEEP);
}

// 3 messages per IP per hour.
export async function allowSign(ip) {
  if (ratelimit) return (await ratelimit.limit(ip)).success;
  const hour = 60 * 60 * 1000;
  const now = Date.now();
  const recent = (memory.hits.get(ip) ?? []).filter((t) => now - t < hour);
  if (recent.length >= 3) return false;
  memory.hits.set(ip, [...recent, now]);
  return true;
}
