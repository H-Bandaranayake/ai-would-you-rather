import { NextResponse } from "next/server";
import { callOpenRouter, extractJSON } from "@/lib/openrouter";
import { computeSignals } from "@/lib/signals";
import { recordTitle, getLeaderboard } from "@/lib/store";
import { Pick, Summary } from "@/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 10;

const SYSTEM = `Write a short, warm, funny personality result for OUSL Open Day 2026. Use very simple English for a wide audience. Be playful, never rude, scary, adult, political, or personal. Never mention protected or sensitive traits. Return only raw JSON.`;

function fallbackSummary(name: string): Summary {
  return {
    title: "The Unpredictable Wildcard",
    read: `You made fifteen difficult choices with a clear style, ${name}. You enjoy fun ideas, but you also know what works for you.`,
    prediction: `${name}, you will probably turn one ordinary moment this week into a story worth sharing.`,
  };
}

export async function POST(req: Request) {
  let picks: Pick[];
  let username: string;
  try {
    const body = await req.json();
    picks = body.picks;
    username =
      typeof body.username === "string" && body.username.trim()
        ? body.username.trim().slice(0, 24)
        : "Player One";
    if (!Array.isArray(picks) || picks.length === 0)
      throw new Error("no picks");
  } catch (err) {
    return NextResponse.json(
      { error: "Expected a JSON body with a non-empty picks array" },
      { status: 400 },
    );
  }

  const list = picks.map((p, i) => `${i + 1}. ${p.text}`).join("\n");
  const signals = computeSignals(picks);

  const user = `Name: ${username}
Choices:
${list}

Detected tendencies:
${signals}

Write a result that feels specific to these choices, not a generic horoscope. Keep the total response short.
Use the strongest two or three detected tendencies and mention one or two concrete choice themes from the list.
Make it accurate to the evidence, funny in a kind way, and appealing to share with friends.
Use simple English that children, students, and adults can understand.
Keep everything safe for work: no insults, adult topics, fear, violence, politics, religion, medical claims, or comments about identity or protected traits.

Write:
- title: a catchy, playful label, 2-5 simple words, starting with "The". Do not use the words "diagnosis" or "personality disorder".
- read: 2-3 short, friendly sentences based on the detected tendencies and choices. Use the player's name once. Do not claim facts about their real life.
- prediction: one short, funny but positive sentence addressed to them by name, starting with "${username}, you will probably..."

Return this exact JSON object shape: {"title":"...", "read":"...", "prediction":"..."}`;

  let summary: Summary;
  let source: "ai" | "fallback" = "ai";
  try {
    const text = await callOpenRouter(SYSTEM, user, 8500, 500);
    const parsed = extractJSON(text);
    summary = Array.isArray(parsed) ? parsed[0] : parsed;
    if (
      typeof summary?.title !== "string" ||
      typeof summary?.read !== "string" ||
      typeof summary?.prediction !== "string" ||
      !summary.title.trim() ||
      !summary.read.trim() ||
      !summary.prediction.trim()
    )
      throw new Error("incomplete summary");
  } catch (err) {
    source = "fallback";
    console.error(
      "Summary AI generation failed:",
      err instanceof DOMException && err.name === "AbortError"
        ? "OpenRouter timed out before the Vercel-safe deadline"
        : err,
    );
    summary = fallbackSummary(username);
  }

  recordTitle(summary.title);
  const timesSeenToday =
    getLeaderboard().find((e) => e.title === summary.title)?.count ?? 1;

  return NextResponse.json({ summary, username, timesSeenToday, source });
}
