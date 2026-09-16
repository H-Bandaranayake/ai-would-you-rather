"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Download, RotateCcw, Share2, WifiOff } from "lucide-react";
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
  canvas.width = 1080;
  canvas.height = 1350;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is unavailable");

  const background = context.createLinearGradient(0, 0, 1080, 1350);
  background.addColorStop(0, "#111a2e");
  background.addColorStop(1, "#24395b");
  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  try {
    const logoImage = new window.Image();
    logoImage.src = ouslLogo.src;
    await logoImage.decode();
    context.save();
    context.fillStyle = "#183f39";
    context.beginPath();
    context.arc(865, 150, 118, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.arc(865, 150, 92, 0, Math.PI * 2);
    context.clip();
    drawContainedImage(context, logoImage, 773, 58, 184, 184);
    context.restore();
  } catch {
    // Keep the text branding if a browser blocks image decoding.
  }

  context.fillStyle = "rgba(215, 241, 113, 0.14)";
  context.beginPath();
  context.arc(890, 155, 150, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "rgba(255, 107, 87, 0.18)";
  context.beginPath();
  context.arc(125, 1165, 105, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "#d7f171";
  context.font = "700 25px Arial";
  context.letterSpacing = "3px";
  context.fillText("OUSL OPEN DAY 2026", 80, 95);
  context.letterSpacing = "0px";

  context.fillStyle = "#fbf3e7";
  context.font = "600 68px Georgia";
  context.fillText("would you", 80, 200);
  context.fillStyle = "#ffc857";
  context.font = "italic 74px Georgia";
  context.fillText("rather?", 80, 275);

  context.fillStyle = "#192741";
  context.roundRect(60, 350, 960, 780, 36);
  context.fill();
  context.fillStyle = "#ff6b57";
  context.fillRect(105, 405, 70, 7);
  context.fillStyle = "#aab8d2";
  context.font = "500 28px Arial";
  context.fillText(`${name}'s AI personality read`, 105, 470);

  context.fillStyle = "#ffc857";
  context.font = "italic 600 56px Georgia";
  const titleLines = wrapCanvasText(context, summary.title, 790).slice(0, 2);
  drawCanvasLines(context, titleLines, 105, 575, 66);

  const titleHeight = titleLines.length * 68;
  context.fillStyle = "#fbf3e7";
  context.font = "400 29px Arial";
  const readLines = wrapCanvasText(context, summary.read, 820).slice(0, 4);
  const readY = 690 + titleHeight;
  drawCanvasLines(context, readLines, 105, readY, 43);

  const predictionY = readY + readLines.length * 43 + 46;
  context.fillStyle = "#ff6b57";
  context.fillRect(105, predictionY - 28, 6, 112);
  context.fillStyle = "#aab8d2";
  context.font = "500 27px Arial";
  const predictionLines = wrapCanvasText(
    context,
    summary.prediction,
    790,
  ).slice(0, 3);
  drawCanvasLines(context, predictionLines, 135, predictionY, 40);

  context.fillStyle = "#fbf3e7";
  context.font = "600 22px Arial";
  context.fillText("Thanks for playing!", 80, 1160);
  context.fillStyle = "#aab8d2";
  context.font = "400 19px Arial";
  context.fillText("Department of Computer Science", 80, 1190);
  context.fillText("Faculty of Natural Sciences", 80, 1217);
  context.fillStyle = "#3fbfad";
  context.font = "700 24px Arial";
  context.fillText("MAKE YOUR CHOICE. GET YOUR READ.", 80, 1260);
  context.fillStyle = "rgba(251, 243, 231, 0.52)";
  context.font = "400 16px Arial";
  context.fillText("*Response is AI generated", 80, 1320);

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
  const [aiQuestions, setAiQuestions] = useState<Question[] | null>(null);
  const aiPrefetchStarted = useRef(false);
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
    const name = username.trim() || "Player One";
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
            would you
            <br />
            <em>rather?</em>
          </div>
          <div className="mark-note">
            A tiny personality experiment with very big opinions.
          </div>
          <div className="sub">
            Fifteen fun choices. No wrong answers. Get a simple AI personality
            result at the end.
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
            <span className="pill">15 rounds</span>
            <span className="pill">~2 min</span>
            <span className="pill">no login</span>
          </div>
          <button className="start-btn" onClick={startGame}>
            Start the game <span aria-hidden="true">-&gt;</span>
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
