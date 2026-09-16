"use client";

import { useCallback, useState } from "react";
import { Loader2, RotateCcw, Share2, WifiOff } from "lucide-react";
import ProgressDots from "./components/ProgressDots";
import { Pick, Question, Summary } from "@/lib/types";

type Screen = "welcome" | "loading" | "question" | "scoring" | "summary";

export default function GamePage() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [username, setUsername] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [usingFallback, setUsingFallback] = useState(false);
  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState<Pick[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [resolvedName, setResolvedName] = useState("");
  const [timesSeenToday, setTimesSeenToday] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // Fire-and-forget updates to the projector mirror view. If nobody is
  // watching /mirror, or the fetch fails, the game itself is unaffected.
  const pushMirror = useCallback((payload: Record<string, unknown>) => {
    fetch("/api/mirror", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }, []);

  const startGame = useCallback(async () => {
    const name = username.trim() || "Player One";
    setScreen("loading");
    try {
      const res = await fetch("/api/questions", { method: "POST" });
      const data = await res.json();
      const qs: Question[] = data.questions;
      setQuestions(qs);
      setUsingFallback(!!data.usingFallback);
      setIndex(0);
      setPicks([]);
      pushMirror({
        type: "question",
        category: qs[0].category,
        optionA: qs[0].optionA.text,
        optionB: qs[0].optionB.text,
        roundIndex: 1,
        totalRounds: qs.length,
        playerName: name,
      });
      setScreen("question");
    } catch (err) {
      setScreen("welcome");
    }
  }, [pushMirror, username]);

  const finish = useCallback(
    async (finalPicks: Pick[]) => {
      const name = username.trim() || "Player One";
      setScreen("scoring");
      try {
        const res = await fetch("/api/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ picks: finalPicks, username: name }),
        });
        const data = await res.json();
        setSummary(data.summary);
        setResolvedName(data.username || name);
        setTimesSeenToday(data.timesSeenToday ?? null);
      } catch (err) {
        setSummary({
          title: "The Unpredictable Wildcard",
          read: `You made it through ten impossible choices without flinching once, ${name}. Consistent chaos, chosen on purpose -- that's a personality type of its own.`,
          prediction: `${name}, you will probably surprise exactly no one who knows you this week.`,
        });
        setResolvedName(name);
        setTimesSeenToday(null);
      }
      setScreen("summary");
    },
    [username]
  );

  const choose = useCallback(
    (side: "A" | "B") => {
      const q = questions[index];
      const chosen = side === "A" ? q.optionA : q.optionB;
      const nextPicks = [...picks, { text: chosen.text, traits: chosen.traits || [], category: q.category, side }];
      setPicks(nextPicks);
      pushMirror({ type: "vote", side });

      const nextIndex = index + 1;
      if (nextIndex >= questions.length) {
        finish(nextPicks);
        return;
      }
      setIndex(nextIndex);
      const nq = questions[nextIndex];
      pushMirror({
        type: "question",
        category: nq.category,
        optionA: nq.optionA.text,
        optionB: nq.optionB.text,
        roundIndex: nextIndex + 1,
        totalRounds: questions.length,
      });
    },
    [index, picks, questions, pushMirror, finish]
  );

  const playAgain = () => {
    setSummary(null);
    setTimesSeenToday(null);
    setUsername("");
    setScreen("welcome");
  };

  const handleShare = async () => {
    if (!summary) return;
    const shareText = `${resolvedName} is "${summary.title}"\n\n${summary.read}\n\n${summary.prediction}`;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      // clipboard permissions can vary by browser/device; fail silently
    }
  };

  return (
    <div className="stage">
      {screen === "welcome" && (
        <div className="welcome">
          <div className="mark">
            would you
            <br />
            <em>rather?</em>
          </div>
          <div className="sub">Ten impossible choices. No wrong answers. Get your AI personality read at the end.</div>
          <input
            className="name-input"
            type="text"
            value={username}
            maxLength={24}
            placeholder="What should we call you?"
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") startGame();
            }}
          />
          <div className="rules">
            <span className="pill">10 rounds</span>
            <span className="pill">~90 sec</span>
            <span className="pill">no login</span>
          </div>
          <button className="start-btn" onClick={startGame}>
            Start
          </button>
        </div>
      )}

      {screen === "loading" && (
        <div className="loading">
          <Loader2 className="spin" size={30} />
          <div>Cooking up your questions…</div>
        </div>
      )}

      {screen === "question" && questions[index] && (
        <>
          <div className="progress-row">
            <ProgressDots total={questions.length} done={index} />
          </div>
          <div className="split">
            <div className="category-label">{questions[index].category}</div>
            <button className="opt a" onClick={() => choose("A")}>
              {questions[index].optionA.text}
            </button>
            <div className="or-divider">OR</div>
            <button className="opt b" onClick={() => choose("B")}>
              {questions[index].optionB.text}
            </button>
          </div>
          {usingFallback && (
            <div className="offline-tag">
              <WifiOff size={13} />
              <span>Playing from the local question set</span>
            </div>
          )}
        </>
      )}

      {screen === "scoring" && (
        <div className="loading">
          <Loader2 className="spin" size={30} />
          <div>Reading your pattern of choices…</div>
        </div>
      )}

      {screen === "summary" && summary && (
        <div className="summary-wrap">
          <div className="card">
            <div className="eyebrow">
              {resolvedName}&rsquo;s diagnosis{timesSeenToday ? ` — seen ${timesSeenToday}x today` : ""}
            </div>
            <div className="title">{summary.title}</div>
            <div className="read">{summary.read}</div>
            <div className="prediction">{summary.prediction}</div>
          </div>
          <div className="actions">
            <button className="action-btn share" onClick={handleShare}>
              <Share2 size={16} /> Copy share text
            </button>
            <button className="action-btn again" onClick={playAgain}>
              <RotateCcw size={16} /> Play again
            </button>
          </div>
          {copied && <div className="copied-note">Copied — paste it anywhere.</div>}
        </div>
      )}
    </div>
  );
}
