import { NextResponse } from "next/server";
import { getMirror, setMirrorQuestion, castVote, getLeaderboard } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ mirror: getMirror(), leaderboard: getLeaderboard() });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (body.type === "question") {
    setMirrorQuestion({
      category: body.category,
      optionA: body.optionA,
      optionB: body.optionB,
      roundIndex: body.roundIndex,
      totalRounds: body.totalRounds,
      playerName: typeof body.playerName === "string" ? body.playerName : undefined,
    });
  } else if (body.type === "vote" && (body.side === "A" || body.side === "B")) {
    castVote(body.side);
  } else {
    return NextResponse.json({ error: "Unrecognized mirror update" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
