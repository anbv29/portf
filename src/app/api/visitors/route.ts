import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COUNTER_KEY = "portfolio:total-visits";
const VISIT_COOKIE = "portfolio-visit";

type RedisResponse<T> = {
  result?: T;
  error?: string;
};

async function runRedisCommand<T>(command: Array<string | number>) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("Visitor storage is not configured");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  const data = (await response.json()) as RedisResponse<T>;

  if (!response.ok || data.error || data.result === undefined) {
    throw new Error(data.error ?? "Visitor storage request failed");
  }

  return data.result;
}

function parseCount(value: number | string | null) {
  const count = Number(value ?? 0);
  return Number.isFinite(count) ? count : 0;
}

export async function GET() {
  try {
    const count = await runRedisCommand<string | null>(["GET", COUNTER_KEY]);

    return NextResponse.json(
      { count: parseCount(count) },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch {
    return NextResponse.json(
      { error: "Visitor counter unavailable" },
      { status: 503 }
    );
  }
}

export async function POST() {
  try {
    const cookieStore = cookies();
    const hasRecentVisit = cookieStore.has(VISIT_COOKIE);
    const value = hasRecentVisit
      ? await runRedisCommand<string | null>(["GET", COUNTER_KEY])
      : await runRedisCommand<number>(["INCR", COUNTER_KEY]);

    const response = NextResponse.json(
      { count: parseCount(value) },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );

    if (!hasRecentVisit) {
      response.cookies.set(VISIT_COOKIE, "1", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 30,
        path: "/",
      });
    }

    return response;
  } catch {
    return NextResponse.json(
      { error: "Visitor counter unavailable" },
      { status: 503 }
    );
  }
}
