import { NextResponse } from "next/server";
import { callOpenRouter, extractJSON } from "@/lib/openrouter";
import { pickFallbackQuestions } from "@/lib/fallbackQuestions";
import { Question } from "@/lib/types";

export const dynamic = "force-dynamic";

const SYSTEM = `Write safe, funny "Would You Rather" questions for OUSL Open Day 2026. Use simple English that a wide audience can understand. Both choices should be interesting, with no clear winner. Keep each choice under 12 words. No violence, gore, adult content, insults, politics, religion, or sensitive personal topics. Tag each choice with 1-2 traits from this exact list: chaos, comfort, social, solitary, power, peace, logic, vibes, shortterm, longterm. Return only raw JSON.`;

const USER = `Generate exactly 15 different "Would You Rather" questions. Use simple words and spread them across these 13 categories: absurd daily life, animal sidekicks, campus life, entertainment, food chaos, future and technology, nature and science, social situations, superpowers, tech chaos, time travel, travel and adventure, and vibes. Use no more than two questions per category. Do not repeat any choice or question. Return this exact JSON object shape:
{"questions": [{"category":"...", "optionA":{"text":"...","traits":["..."]}, "optionB":{"text":"...","traits":["..."]}}]}`;

function cleanQuestions(value: unknown): Question[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const categories = new Map<string, number>();
  const result: Question[] = [];
  for (const item of value) {
    const question = item as Partial<Question>;
    const optionA = question.optionA as Question["optionA"] | undefined;
    const optionB = question.optionB as Question["optionB"] | undefined;
    if (
      typeof question.category !== "string" ||
      !optionA ||
      typeof optionA.text !== "string" ||
      !Array.isArray(optionA.traits) ||
      !optionB ||
      typeof optionB.text !== "string" ||
      !Array.isArray(optionB.traits)
    )
      continue;
    const key = [optionA.text, optionB.text]
      .map((text) => text.trim().toLowerCase())
      .sort()
      .join("|");
    const category = question.category.trim().toLowerCase();
    const optionAText = optionA.text.trim();
    const optionBText = optionB.text.trim();
    if (
      !key ||
      seen.has(key) ||
      (categories.get(category) || 0) >= 2 ||
      optionAText.split(/\s+/).length > 12 ||
      optionBText.split(/\s+/).length > 12
    )
      continue;
    seen.add(key);
    categories.set(category, (categories.get(category) || 0) + 1);
    result.push({
      category: question.category.trim(),
      optionA: {
        text: optionAText,
        traits: optionA.traits.slice(0, 2).map(String),
      },
      optionB: {
        text: optionBText,
        traits: optionB.traits.slice(0, 2).map(String),
      },
    });
  }
  return result;
}

export async function POST() {
  try {
    const text = await callOpenRouter(SYSTEM, USER);
    const parsed = extractJSON(text);
    const questions = cleanQuestions(
      Array.isArray(parsed) ? parsed : parsed?.questions,
    );
    if (questions.length < 15) {
      throw new Error("Model returned an unexpected shape");
    }
    return NextResponse.json({
      questions: questions.slice(0, 15),
      usingFallback: false,
    });
  } catch (err) {
    return NextResponse.json({
      questions: pickFallbackQuestions(15),
      usingFallback: true,
    });
  }
}
