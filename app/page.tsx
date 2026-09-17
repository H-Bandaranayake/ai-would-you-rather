"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarDays, Download, RotateCcw, Share2, Sparkles, UserRound, WifiOff } from "lucide-react";
import ProgressDots from "./components/ProgressDots";
import { pickFallbackQuestions } from "@/lib/fallbackQuestions";
import loadingGif from "@/lib/loading.gif";
import ouslLogo from "@/lib/logo.png";
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

function drawCanvasLines(
  context: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
) {
  lines.forEach((line, index) =>
    context.fillText(line, x, y + index * lineHeight),
  );
}

function drawContainedImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.min(
    width / image.naturalWidth,
    height / image.naturalHeight,
  );
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.drawImage(
    image,
    x + (width - drawWidth) / 2,
    y + (height - drawHeight) / 2,
    drawWidth,
    drawHeight,
  );
}

function createDownloadName(name: string) {
  const safeName = name
    .trim()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "");
  return `ousl-open-day-2026-${safeName || "player"}.png`;
}

async function createShareCard(name: string, summary: Summary): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1500;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is unavailable");

  const W = canvas.width;
  const H = canvas.height;

  // Full-bleed AI Playground background.
  const background = context.createLinearGradient(0, 0, W, H);
  background.addColorStop(0, "#020817");
  background.addColorStop(0.48, "#06142d");
  background.addColorStop(1, "#13072f");
  context.fillStyle = background;
  context.fillRect(0, 0, W, H);

  // Ambient cyan / violet glows.
  const cyanGlow = context.createRadialGradient(80, 690, 0, 80, 690, 520);
  cyanGlow.addColorStop(0, "rgba(34,211,238,.20)");
  cyanGlow.addColorStop(1, "rgba(34,211,238,0)");
  context.fillStyle = cyanGlow;
  context.fillRect(0, 0, W, H);

  const violetGlow = context.createRadialGradient(1120, 560, 0, 1120, 560, 560);
  violetGlow.addColorStop(0, "rgba(168,85,247,.22)");
  violetGlow.addColorStop(1, "rgba(168,85,247,0)");
  context.fillStyle = violetGlow;
  context.fillRect(0, 0, W, H);

  // Soft technical grid.
  context.save();
  context.strokeStyle = "rgba(125,211,252,.045)";
  context.lineWidth = 1;
  for (let x = 0; x <= W; x += 90) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, H);
    context.stroke();
  }
  for (let y = 0; y <= H; y += 90) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(W, y);
    context.stroke();
  }
  context.restore();

  // Main modern card — nearly full width by design.
  const cardX = 54;
  const cardY = 58;
  const cardW = W - 108;
  const cardH = H - 116;
  context.save();
  const cardGradient = context.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
  cardGradient.addColorStop(0, "rgba(8,28,58,.97)");
  cardGradient.addColorStop(1, "rgba(7,17,43,.97)");
  context.fillStyle = cardGradient;
  context.strokeStyle = "rgba(96,165,250,.34)";
  context.lineWidth = 2;
  context.beginPath();
  context.roundRect(cardX, cardY, cardW, cardH, 42);
  context.fill();
  context.stroke();
  context.restore();

  // Accent line at the top of the card.
  const accent = context.createLinearGradient(cardX + 38, 0, cardX + cardW - 38, 0);
  accent.addColorStop(0, "#22d3ee");
  accent.addColorStop(0.52, "#3b82f6");
  accent.addColorStop(1, "#a855f7");
  context.fillStyle = accent;
  context.beginPath();
  context.roundRect(cardX + 38, cardY + 28, cardW - 76, 6, 4);
  context.fill();

  // Load and draw the exact OUSL logo supplied for this project.
  try {
    const logoImage = new window.Image();
    logoImage.src = ouslLogo.src;
    await logoImage.decode();

    context.save();
    context.fillStyle = "rgba(2,8,23,.82)";
    context.strokeStyle = "rgba(245,158,11,.38)";
    context.lineWidth = 2;
    context.beginPath();
    context.roundRect(W - 300, 112, 176, 220, 28);
    context.fill();
    context.stroke();
    drawContainedImage(context, logoImage, W - 276, 128, 128, 188);
    context.restore();
  } catch {
    // Text branding below remains sufficient if decoding is blocked.
  }

  // Header brand block.
  context.fillStyle = "#67e8f9";
  context.font = "800 22px Arial";
  context.fillText("OUSL OPEN DAY 2026", 105, 145);
  context.fillStyle = "#94a3b8";
  context.font = "500 17px Arial";
  context.fillText("AI Playground · Would You Rather?", 105, 176);

  // Right-side category label.
  context.fillStyle = "#c4b5fd";
  context.font = "800 17px Arial";
  context.textAlign = "right";
  context.fillText("AI PERSONALITY BOOTH", W - 330, 145);
  context.textAlign = "left";

  // Player label pill.
  const playerLabel = `${name}'s AI personality read`;
  context.font = "700 18px Arial";
  const playerWidth = Math.min(510, context.measureText(playerLabel).width + 46);
  context.fillStyle = "rgba(34,211,238,.08)";
  context.strokeStyle = "rgba(34,211,238,.30)";
  context.lineWidth = 1.5;
  context.beginPath();
  context.roundRect(105, 245, playerWidth, 50, 25);
  context.fill();
  context.stroke();
  context.fillStyle = "#bae6fd";
  context.fillText(playerLabel, 128, 277);

  // Result title with the same cyan → blue → violet identity as the web UI.
  const titleGradient = context.createLinearGradient(105, 0, 960, 0);
  titleGradient.addColorStop(0, "#38bdf8");
  titleGradient.addColorStop(0.5, "#60a5fa");
  titleGradient.addColorStop(1, "#c026d3");
  context.fillStyle = titleGradient;
  context.font = "800 78px Arial";
  const titleLines = wrapCanvasText(context, summary.title, 860).slice(0, 3);
  drawCanvasLines(context, titleLines, 105, 405, 86);

  const titleBottom = 405 + Math.max(0, titleLines.length - 1) * 86;

  // Main interpretation panel.
  const panelY = titleBottom + 80;
  context.fillStyle = "rgba(2,8,23,.34)";
  context.strokeStyle = "rgba(148,163,184,.14)";
  context.lineWidth = 1.5;
  context.beginPath();
  context.roundRect(105, panelY, W - 210, 500, 30);
  context.fill();
  context.stroke();

  context.fillStyle = "#f8fafc";
  context.font = "600 30px Arial";
  const readLines = wrapCanvasText(context, summary.read, W - 300).slice(0, 6);
  drawCanvasLines(context, readLines, 150, panelY + 80, 48);

  const predictionY = panelY + 80 + readLines.length * 48 + 54;
  const predictionBoxH = 155;
  const predictionBg = context.createLinearGradient(145, 0, 1035, 0);
  predictionBg.addColorStop(0, "rgba(34,211,238,.10)");
  predictionBg.addColorStop(1, "rgba(139,92,246,.06)");
  context.fillStyle = predictionBg;
  context.beginPath();
  context.roundRect(145, predictionY - 42, W - 290, predictionBoxH, 22);
  context.fill();

  context.fillStyle = accent;
  context.fillRect(145, predictionY - 42, 6, predictionBoxH);
  context.fillStyle = "#cbd5e1";
  context.font = "500 25px Arial";
  const predictionLines = wrapCanvasText(context, summary.prediction, W - 370).slice(0, 4);
  drawCanvasLines(context, predictionLines, 182, predictionY, 38);

  // Footer section inside the card.
  const footerY = H - 300;
  context.strokeStyle = "rgba(148,163,184,.14)";
  context.beginPath();
  context.moveTo(105, footerY - 36);
  context.lineTo(W - 105, footerY - 36);
  context.stroke();

  context.fillStyle = "#f8fafc";
  context.font = "800 24px Arial";
  context.fillText("Thanks for playing!", 105, footerY);

  context.fillStyle = "#94a3b8";
  context.font = "500 18px Arial";
  context.fillText("Department of Computer Science · Faculty of Natural Sciences", 105, footerY + 36);
  context.fillText("The Open University of Sri Lanka", 105, footerY + 66);

  const footerGradient = context.createLinearGradient(105, 0, 650, 0);
  footerGradient.addColorStop(0, "#22d3ee");
  footerGradient.addColorStop(1, "#8b5cf6");
  context.fillStyle = footerGradient;
  context.font = "800 19px Arial";
  context.fillText("MAKE YOUR CHOICE · GET YOUR AI READ", 105, footerY + 116);

  context.fillStyle = "rgba(148,163,184,.62)";
  context.font = "500 15px Arial";
  context.fillText("*AI-generated personality result for entertainment at OUSL Open Day 2026", 105, footerY + 158);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error("Could not create card")),
      "image/png",
      0.96,
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
  const [aiQuestions, setAiQuestions] = useState<Question[] | null>(null);
  const [nameError, setNameError] = useState(false);
  const aiPrefetchStarted = useRef(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingMessages = [
    "Checking your choices...",
    "Finding your strongest patterns...",
    "Writing your simple result...",
  ];

  useEffect(() => {
    if (screen !== "scoring") {
      setLoadingStep(0);
      return;
    }
    const id = window.setInterval(() => {
      setLoadingStep((step) => (step + 1) % loadingMessages.length);
    }, 1200);
    return () => window.clearInterval(id);
  }, [screen, loadingMessages.length]);

  useEffect(() => {
    if (aiPrefetchStarted.current) return;
    aiPrefetchStarted.current = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 7500);

    fetch("/api/questions", {
      method: "POST",
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Question request failed: ${res.status}`);
        const data = await res.json();
        if (
          !data?.usingFallback &&
          Array.isArray(data.questions) &&
          data.questions.length >= 15
        ) {
          setAiQuestions(data.questions as Question[]);
        }
      })
      .catch(() => {})
      .finally(() => window.clearTimeout(timeout));

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

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
    const name = username.trim();
    if (!name) {
      setNameError(true);
      nameInputRef.current?.focus();
      return;
    }
    const recentKeys = JSON.parse(
      sessionStorage.getItem("ousl-recent-questions") || "[]",
    ) as string[];
    let qs = aiQuestions;
    if (!qs) {
      qs = pickFallbackQuestions(15, recentKeys);
      if (qs.length < 15) qs = pickFallbackQuestions(15);
    }
    const keys = qs.map((question) =>
      [question.optionA.text, question.optionB.text]
        .map((text) => text.trim().toLowerCase())
        .sort()
        .join("|"),
    );
    sessionStorage.setItem(
      "ousl-recent-questions",
      JSON.stringify([...keys, ...recentKeys].slice(0, 36)),
    );
    setQuestions(qs);
    setUsingFallback(!aiQuestions);
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
  }, [aiQuestions, pushMirror, username]);

  const finish = useCallback(
    async (finalPicks: Pick[]) => {
      const name = username.trim() || "Player One";
      setScreen("scoring");
      const localSummary: Summary = {
        title: "The Unpredictable Wildcard",
        read: `You made it through fifteen fun choices with a style that is completely your own, ${name}. You balance curiosity with a clear sense of what feels right for you.`,
        prediction: `${name}, you will probably turn one ordinary moment this week into a story worth sharing.`,
      };
      try {
        const res = await fetch("/api/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ picks: finalPicks, username: name }),
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`Summary request failed: ${res.status}`);
        const data = await res.json();
        if (
          !data?.summary ||
          typeof data.summary.title !== "string" ||
          typeof data.summary.read !== "string" ||
          typeof data.summary.prediction !== "string"
        ) {
          throw new Error("Summary response was incomplete");
        }
        setSummary(data.summary as Summary);
        setResolvedName(
          typeof data.username === "string" ? data.username : name,
        );
        setTimesSeenToday(data.timesSeenToday ?? null);
        if (data.source === "fallback") {
          console.warn("The summary API used its safe fallback result.");
        }
      } catch (err) {
        setSummary(localSummary);
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
      const name = username.trim() || "Player One";
      pushMirror({
        type: "question",
        category: nq.category,
        optionA: nq.optionA.text,
        optionB: nq.optionB.text,
        roundIndex: nextIndex + 1,
        totalRounds: questions.length,
        playerName: name,
      });
    },
    [index, picks, questions, pushMirror, finish, username],
  );

  const playAgain = () => {
    setSummary(null);
    setTimesSeenToday(null);
    setUsername("");
    setNameError(false);
    setScreen("welcome");
  };

  const handleShare = async () => {
    if (!summary) return;
    const shareText = `${resolvedName} is "${summary.title}"\n\n${summary.read}\n\n${summary.prediction}\n\nOUSL Open Day 2026`;
    try {
      const blob = await createShareCard(resolvedName, summary);
      const file = new File([blob], createDownloadName(resolvedName), {
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
    link.download = createDownloadName(resolvedName);
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="stage">
      <header className="game-shell-header">
        <div className="brand-lockup">
          <div>
            <div className="brand-title"><span>AI</span> Would You Rather?</div>
            <div className="brand-subtitle">Open Day Interactive Game</div>
          </div>
        </div>
        <div className="header-center">
          <span>THE OPEN UNIVERSITY OF SRI LANKA</span>
          <small>Open Day 2026 · AI Playground</small>
        </div>
        <div className="event-pill"><CalendarDays size={15} /> Open Day 2026</div>
      </header>
      {screen === "welcome" && (
        <div className="welcome">
          <div className="booth-kicker">
            <span /> Open University of Sri Lanka
            <span />
          </div>
          <div className="ousl-logo" aria-label="Open University of Sri Lanka">
            <Image
              className="ousl-logo-image"
              src={ouslLogo}
              alt="Open University of Sri Lanka crest"
              priority
            />
            <div className="ousl-logo-text">OPEN DAY 2026</div>
          </div>
          <div className="mark">
            WOULD YOU
            <br />
            <em>RATHER?</em>
          </div>
          <div className="mark-note">
            <Sparkles size={15} /> AI Personality Booth
          </div>
          <div className="sub">
            Fifteen fun choices. No wrong answers. Get a simple AI personality
            result at the end.
          </div>
          <div className={`name-field-wrap${nameError ? " error" : ""}`}>
            <UserRound size={18} />
          <input
            ref={nameInputRef}
            className="name-input"
            type="text"
            value={username}
            maxLength={24}
            placeholder="What should we call you?"
            required
            aria-invalid={nameError}
            aria-describedby={nameError ? "name-error" : undefined}
            onChange={(e) => {
              setUsername(e.target.value);
              if (nameError && e.target.value.trim()) setNameError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") startGame();
            }}
          />
          </div>
          {nameError && (
            <div className="name-error" id="name-error">
              Please enter your name to start.
            </div>
          )}
          <div className="rules">
            <span className="pill">15 rounds</span>
            <span className="pill">~2 min</span>
            <span className="pill">no login</span>
          </div>
          <button className="start-btn" onClick={startGame}>
            <Sparkles size={18} /> Start the game <ArrowRight size={18} />
          </button>
        </div>
      )}

      {screen === "loading" && (
        <div className="loading">
          <Image
            className="loading-gif"
            src={loadingGif}
            alt=""
            width={86}
            height={86}
            unoptimized
          />
          <div>Preparing your questions...</div>
        </div>
      )}

      {screen === "question" && questions[index] && (
        <>
          <div className="progress-row">
            <ProgressDots total={questions.length} done={index} />
          </div>
          <div className="question-copy">
            <div className="round-kicker">QUESTION {index + 1} OF {questions.length}</div>
            <h1>Would you <span>rather?</span></h1>
            <p>Choose the option that feels most like you. There are no wrong answers.</p>
          </div>
          <div className="split">
            <div className="category-label">{questions[index].category}</div>
            <button className="opt a" onClick={() => choose("A")}>
              <span className="choice-badge">A</span>
              <span className="choice-text">{questions[index].optionA.text}</span>
              <span className="choice-hint">Choose A <ArrowRight size={16} /></span>
            </button>
            <div className="or-divider">OR</div>
            <button className="opt b" onClick={() => choose("B")}>
              <span className="choice-badge">B</span>
              <span className="choice-text">{questions[index].optionB.text}</span>
              <span className="choice-hint">Choose B <ArrowRight size={16} /></span>
            </button>
          </div>
          {usingFallback && (
            <div className="offline-tag">
              <WifiOff size={13} />
              <span>Safe question deck ready instantly</span>
            </div>
          )}
        </>
      )}

      {screen === "scoring" && (
        <div className="loading">
          <Image
            className="loading-gif"
            src={loadingGif}
            alt=""
            width={86}
            height={86}
            unoptimized
          />
          <div className="loading-message" aria-live="polite">
            {loadingMessages[loadingStep]}
          </div>
          <div className="loading-dots" aria-hidden="true">
            {loadingMessages.map((_, step) => (
              <span
                key={step}
                className={step === loadingStep ? "active" : ""}
              />
            ))}
          </div>
        </div>
      )}

      {screen === "summary" && summary && (
        <div className="summary-wrap">
          <div className="card">
            <div className="summary-logo-badge" aria-hidden="true">
              <Image src={ouslLogo} alt="" fill sizes="86px" />
            </div>
            <div className="card-brand">
              <span className="card-brand-main">
                <Image className="mini-logo" src={ouslLogo} alt="OUSL crest" />{" "}
                OUSL OPEN DAY 2026
              </span>
              <span>AI ARCADE</span>
            </div>
            <div className="eyebrow">
              {resolvedName}&rsquo;s result
              {timesSeenToday
                ? ` - result seen ${timesSeenToday} times today`
                : ""}
            </div>
            <div className="title">{summary.title}</div>
            <div className="read">{summary.read}</div>
            <div className="prediction">{summary.prediction}</div>
            <div className="event-note">
              <strong>Thanks for playing!</strong>
              <span>Department of Computer Science</span>
              <span>Faculty of Natural Sciences</span>
              <span>OUSL Open Day 2026</span>
            </div>
            <div className="ai-disclosure">*Response is AI generated</div>
          </div>
          <div className="actions">
            <button className="action-btn share" onClick={handleShare}>
              <Share2 size={16} /> Share result
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
