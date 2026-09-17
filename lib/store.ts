// This is process-memory state, not a database. It works well when the app
// runs as one long-lived Node process -- e.g. `npm run build && npm start`
// on a laptop at the booth, which the design doc lists as a valid hosting
// option. On serverless hosts (Vercel functions), separate invocations do
// not reliably share memory, so the mirror/leaderboard could drift out of
// sync across requests. For a serverless deploy, swap this module for a
// real shared store (Vercel KV, Upstash Redis, etc.) -- every function here
// is a natural drop-in point for that.

export type MirrorState = {
  category: string | null;
  optionA: string | null;
  optionB: string | null;
  votesA: number;
  votesB: number;
  roundIndex: number;
  totalRounds: number;
  playerName: string | null;
  updatedAt: number;
};

export type LeaderboardEntry = { title: string; count: number };

let mirror: MirrorState = {
  category: null,
  optionA: null,
  optionB: null,
  votesA: 0,
  votesB: 0,
  roundIndex: 0,
  totalRounds: 15,
  playerName: null,
  updatedAt: Date.now(),
};

const leaderboard = new Map<string, number>();

export function getMirror(): MirrorState {
  return mirror;
}

export function setMirrorQuestion(q: {
  category: string;
  optionA: string;
  optionB: string;
  roundIndex: number;
  totalRounds: number;
  playerName?: string;
}) {
  mirror = {
    ...mirror,
    ...q,
    playerName: q.playerName !== undefined ? q.playerName : mirror.playerName,
    votesA: 0,
    votesB: 0,
    updatedAt: Date.now(),
  };
}

export function castVote(side: "A" | "B") {
  if (side === "A") mirror.votesA += 1;
  else mirror.votesB += 1;
  mirror.updatedAt = Date.now();
}

export function recordTitle(title: string) {
  leaderboard.set(title, (leaderboard.get(title) || 0) + 1);
}

export function getLeaderboard(): LeaderboardEntry[] {
  return Array.from(leaderboard.entries())
    .map(([title, count]) => ({ title, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}
