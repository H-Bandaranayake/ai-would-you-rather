"use client";

import { useCallback, useState } from "react";
import { Download, Loader2, RotateCcw, Share2, WifiOff } from "lucide-react";
import ProgressDots from "./components/ProgressDots";
import { Pick, Question, Summary } from "@/lib/types";

type Screen = "welcome" | "loading" | "question" | "scoring" | "summary";

function wrapCanvasText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (context.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function createShareCard(name: string, summary: Summary): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is unavailable");

  const background = context.createLinearGradient(0, 0, 1080, 1350);
  background.addColorStop(0, "#111a2e");
  background.addColorStop(1, "#24395b");
  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "rgba(215, 241, 113, 0.18)";
  context.beginPath();
  context.arc(900, 155, 210, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "rgba(255, 107, 87, 0.18)";
  context.beginPath();
  context.arc(120, 1190, 170, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "#d7f171";
  context.font = "700 25px 'Arial'";
  context.letterSpacing = "3px";
  context.fillText("OUSL OPEN DAY 2026", 80, 100);
  context.letterSpacing = "0px";

  context.fillStyle = "#fbf3e7";
  context.font = "600 72px Georgia";
  context.fillText("would you", 80, 220);
  context.fillStyle = "#ffc857";
  context.font = "italic 78px Georgia";
  context.fillText("rather?", 80, 300);

  context.fillStyle = "#192741";
  context.roundRect(60, 385, 960, 790, 36);
  context.fill();
  context.fillStyle = "#aab8d2";
  context.font = "500 28px Arial";
  context.fillText(`${name}'s AI personality read`, 105, 465);

  context.fillStyle = "#ffc857";
  context.font = "italic 600 58px Georgia";
  const titleLines = wrapCanvasText(context, summary.title, 820);
  titleLines.forEach((line, index) =>
    context.fillText(line, 105, 570 + index * 68),
  );

  const titleHeight = titleLines.length * 68;
  context.fillStyle = "#fbf3e7";
  context.font = "400 30px Arial";
  const readLines = wrapCanvasText(context, summary.read, 820);
  readLines.forEach((line, index) =>
    context.fillText(line, 105, 665 + titleHeight + index * 44),
  );

  const predictionY = 665 + titleHeight + readLines.length * 44 + 42;
  context.fillStyle = "#ff6b57";
  context.fillRect(105, predictionY - 28, 6, 116);
  context.fillStyle = "#aab8d2";
  context.font = "500 27px Arial";
  const predictionLines = wrapCanvasText(context, summary.prediction, 790);
  predictionLines.forEach((line, index) =>
    context.fillText(line, 135, predictionY + index * 40),
  );

  context.fillStyle = "#3fbfad";
  context.font = "700 24px Arial";
  context.fillText("MAKE YOUR CHOICE. GET YOUR READ.", 80, 1270);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error("Could not create card")),
      "image/png",
    );
  });
}

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
    [username],
  );

  const choose = useCallback(
    (side: "A" | "B") => {
      const q = questions[index];
      const chosen = side === "A" ? q.optionA : q.optionB;
      const nextPicks = [
        ...picks,
        {
          text: chosen.text,
          traits: chosen.traits || [],
          category: q.category,
          side,
        },
      ];
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
    [index, picks, questions, pushMirror, finish],
  );

  const playAgain = () => {
    setSummary(null);
    setTimesSeenToday(null);
    setUsername("");
    setScreen("welcome");
  };

  const handleShare = async () => {
    if (!summary) return;
    const shareText = `${resolvedName} is "${summary.title}"\n\n${summary.read}\n\n${summary.prediction}\n\nOUSL Open Day 2026`;
    try {
      const blob = await createShareCard(resolvedName, summary);
      const file = new File([blob], "ousl-open-day-2026-personality.png", {
        type: "image/png",
      });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "OUSL Open Day 2026",
          text: shareText,
          files: [file],
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch (err) {
      // clipboard permissions can vary by browser/device; fail silently
    }
  };

  const handleDownload = async () => {
    if (!summary) return;
    const blob = await createShareCard(resolvedName, summary);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ousl-open-day-2026-personality.png";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="stage">
      {screen === "welcome" && (
        <div className="welcome">
          <div className="booth-kicker">
            <span /> Open University of Sri Lanka - Open Day 2026
            <span />
          </div>
          <div className="mark">
            would you
            <br />
            <em>rather?</em>
          </div>
          <div className="mark-note">
            A tiny personality experiment with very big opinions.
          </div>
          <div className="sub">
            Ten impossible choices. No wrong answers. Get your AI personality
            read at the end.
          </div>
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
            Enter the chaos <span aria-hidden="true">-&gt;</span>
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
            <div className="card-brand">
              OUSL OPEN DAY 2026 <span>AI ARCADE</span>
            </div>
            <div className="eyebrow">
              {resolvedName}&rsquo;s diagnosis
              {timesSeenToday ? ` — seen ${timesSeenToday}x today` : ""}
            </div>
            <div className="title">{summary.title}</div>
            <div className="read">{summary.read}</div>
            <div className="prediction">{summary.prediction}</div>
          </div>
          <div className="actions">
            <button className="action-btn share" onClick={handleShare}>
              <Share2 size={16} /> Share card
            </button>
            <button className="action-btn download" onClick={handleDownload}>
              <Download size={16} /> Download PNG
            </button>
            <button className="action-btn again" onClick={playAgain}>
              <RotateCcw size={16} /> Play again
            </button>
          </div>
          {copied && (
            <div className="copied-note">Copied — paste it anywhere.</div>
          )}
        </div>
      )}
    </div>
  );
}
