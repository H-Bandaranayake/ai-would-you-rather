import { NextResponse } from "next/server";
import { getLeaderboard } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ leaderboard: getLeaderboard() });
}
