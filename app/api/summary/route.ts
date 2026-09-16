import { NextResponse } from "next/server";
import { callDeepSeek, extractJSON } from "@/lib/deepseek";
import { computeSignals } from "@/lib/signals";
import { recordTitle, getLeaderboard } from "@/lib/store";
import { Pick, Summary } from "@/lib/types";

export const dynamic = "force-dynamic";

const SYSTEM = `You write short, funny, warm personality reads for a party game, like a friend who's known the player for years -- witty and a little roast-y, never mean, never commenting on protected traits (race, gender, religion, disability, etc). Respond with ONLY a raw JSON object, no markdown fences, no commentary.`;

function fallbackSummary(name: string): Summary {
  return {
    title: "The Unpredictable Wildcard",
    read: `You made it through ten impossible choices without flinching once, which honestly says more than any AI could, ${name}. Consistent chaos, chosen on purpose -- that's a personality type of its own.`,
    prediction: `${name}, you will probably make a decision this week that surprises exactly no one who knows you.`,
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

  const user = `The player's name is ${username}. Here are their ${picks.length} "Would You Rather" choices:
${list}

Detected tendencies:
${signals}

Write:
- title: a fake diagnosis, 2-5 words, starting with "The" (e.g. "The Chaotic Strategist")
- read: 2-3 playful sentences about them based on the pattern of choices. You may use their name once, naturally.
- prediction: one short funny sentence addressed directly to them by name, starting with "${username}, you will probably..."

Return this exact JSON object shape: {"title":"...", "read":"...", "prediction":"..."}`;

  let summary: Summary;
  try {
    const text = await callDeepSeek(SYSTEM, user);
    const parsed = extractJSON(text);
    summary = Array.isArray(parsed) ? parsed[0] : parsed;
    if (!summary?.title || !summary?.read || !summary?.prediction)
      throw new Error("incomplete summary");
  } catch (err) {
    summary = fallbackSummary(username);
  }

  recordTitle(summary.title);
  const timesSeenToday =
    getLeaderboard().find((e) => e.title === summary.title)?.count ?? 1;

  return NextResponse.json({ summary, username, timesSeenToday });
}
