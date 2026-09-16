"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

type MirrorState = {
  category: string | null;
  optionA: string | null;
  optionB: string | null;
  votesA: number;
  votesB: number;
  roundIndex: number;
  totalRounds: number;
  playerName: string | null;
};

type LeaderboardEntry = { title: string; count: number };

export default function MirrorPage() {
  const [mirror, setMirror] = useState<MirrorState | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);

    const poll = async () => {
      try {
        const res = await fetch("/api/mirror", { cache: "no-store" });
        const data = await res.json();
        setMirror(data.mirror);
        setLeaderboard(data.leaderboard);
      } catch (err) {
        // booth wifi hiccup -- keep showing the last known state
      }
    };

    poll();
    const id = setInterval(poll, 1500);
    return () => clearInterval(id);
  }, []);

  const totalVotes = (mirror?.votesA || 0) + (mirror?.votesB || 0);
  const pctA = totalVotes ? Math.round(((mirror?.votesA || 0) / totalVotes) * 100) : 50;

  return (
    <div className="mirror-root">
      <div className="mirror-main">
        <div className="mirror-header">
          <div className="mirror-mark">
            would you <em>rather?</em>
          </div>
          {mirror?.roundIndex ? (
            <div className="mirror-round">
              {mirror.playerName ? `${mirror.playerName} — ` : ""}Round {mirror.roundIndex} / {mirror.totalRounds}
            </div>
          ) : null}
        </div>

        {mirror?.optionA ? (
          <div className="mirror-split">
            <div className="mirror-opt a">
              <div className="mirror-opt-text">{mirror.optionA}</div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill a" style={{ width: `${pctA}%` }} />
              </div>
              <div className="vote-count">{mirror.votesA} votes</div>
            </div>
            <div className="mirror-or">OR</div>
            <div className="mirror-opt b">
              <div className="mirror-opt-text">{mirror.optionB}</div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill b" style={{ width: `${100 - pctA}%` }} />
              </div>
              <div className="vote-count">{mirror.votesB} votes</div>
            </div>
          </div>
        ) : (
          <div className="mirror-idle">Waiting for the next round…</div>
        )}
      </div>

      <div className="mirror-side">
        {origin && (
          <div className="qr-box">
            <QRCodeSVG value={origin} size={148} bgColor="transparent" fgColor="#fbf3e7" />
            <div className="qr-label">Scan to play</div>
          </div>
        )}
        <div className="leaderboard">
          <div className="leaderboard-title">Top types today</div>
          {leaderboard.length === 0 && <div className="leaderboard-empty">No results yet</div>}
          {leaderboard.map((e, i) => (
            <div key={e.title} className="leaderboard-row">
              <span className="leaderboard-rank">{i + 1}</span>
              <span className="leaderboard-name">{e.title}</span>
              <span className="leaderboard-count">{e.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
