import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COUNTER_ENDPOINT =
  "https://api.visitorbadge.io/api/visitors?path=anubhav-pandey-portfolio-live&label=VISITORS";

export async function POST() {
  try {
    const response = await fetch(COUNTER_ENDPOINT, {
      cache: "no-store",
      headers: {
        Accept: "image/svg+xml",
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent":
          "Mozilla/5.0 (compatible; AnubhavPortfolio/1.0; +https://portfolio.local)",
      },
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(
        `Visitor counter request failed (${response.status}): ${message}`
      );
    }

    const badge = await response.text();
    const match = badge.match(/aria-label="VISITORS: ([\d,]+)"/);
    const count = match ? Number(match[1].replaceAll(",", "")) : Number.NaN;

    if (!Number.isFinite(count)) {
      throw new Error("Visitor counter response was invalid");
    }

    return NextResponse.json(
      { count },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Visitor counter error:", error);
    return NextResponse.json(
      { error: "Visitor counter unavailable" },
      { status: 503 }
    );
  }
}
