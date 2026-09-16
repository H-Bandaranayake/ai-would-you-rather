import { NextResponse } from "next/server";
import { callDeepSeek, extractJSON } from "@/lib/deepseek";
import { FALLBACK_QUESTIONS, shuffle } from "@/lib/fallbackQuestions";
import { Question } from "@/lib/types";

export const dynamic = "force-dynamic";

const SYSTEM = `You write "Would You Rather" questions for a university festival booth game. Both options in every question must be absurd, weird, or tempting -- never a clear good-vs-bad pair. Keep each option under 12 words. No gore, no NSFW, no sensitive identity topics, nothing mean-spirited. You must tag each option with 1-2 traits from this exact list: chaos, comfort, social, solitary, power, peace, logic, vibes, shortterm, longterm. Respond with ONLY a raw JSON object, no markdown fences, no commentary, no preamble.`;

const USER = `Generate exactly 10 "Would You Rather" questions. Vary the categories across: absurd daily life, superpowers with a downside, social embarrassment, food chaos, tech chaos, time travel, money with weird rules, animal sidekicks. Do not repeat a category more than twice. Return this exact JSON object shape:
{"questions": [{"category":"...", "optionA":{"text":"...","traits":["..."]}, "optionB":{"text":"...","traits":["..."]}}]}`;

export async function POST() {
  try {
    const text = await callDeepSeek(SYSTEM, USER);
    const parsed = extractJSON(text);
    const questions: Question[] = Array.isArray(parsed)
      ? parsed
      : parsed?.questions;
    if (!Array.isArray(questions) || questions.length < 8) {
      throw new Error("Model returned an unexpected shape");
    }
    return NextResponse.json({
      questions: questions.slice(0, 10),
      usingFallback: false,
    });
  } catch (err) {
    return NextResponse.json({
      questions: shuffle(FALLBACK_QUESTIONS).slice(0, 10),
      usingFallback: true,
    });
  }
}
