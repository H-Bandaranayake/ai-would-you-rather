import { NextResponse } from "next/server";
import { OPENROUTER_MODEL } from "@/lib/openrouter";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;

function headers(apiKey: string): HeadersInit {
  return {
    Authorization: `Bearer ${apiKey}`,
    "HTTP-Referer":
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://ousl-open-day-2026.vercel.app",
    "X-Title": "OUSL Open Day 2026 Would You Rather",
  };
}

export async function GET(req: Request) {
  const startedAt = Date.now();
  const apiKey = process.env.OPENROUTER_API_KEY;
  const url = new URL(req.url);
  const completionProbe = url.searchParams.get("completion") === "1";

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        keyConfigured: false,
        model: OPENROUTER_MODEL,
        message: "OPENROUTER_API_KEY is missing in this deployment.",
      },
      { status: 503 },
    );
  }

  try {
    if (!completionProbe) {
      const response = await fetch("https://openrouter.ai/api/v1/models", {
        headers: headers(apiKey),
        cache: "no-store",
      });
      const data = await response.json().catch(() => null);
      const modelAvailable =
        Array.isArray(data?.data) &&
        data.data.some(
          (model: { id?: string }) => model.id === OPENROUTER_MODEL,
        );
      return NextResponse.json(
        {
          ok: response.ok && modelAvailable,
          keyConfigured: true,
          openRouterStatus: response.status,
          model: OPENROUTER_MODEL,
          modelAvailable,
          latencyMs: Date.now() - startedAt,
          message: response.ok
            ? modelAvailable
              ? "OpenRouter and the configured model are reachable."
              : "OpenRouter is reachable, but the configured model was not listed."
            : "OpenRouter rejected the request. Check the Vercel key and permissions.",
        },
        { status: response.ok && modelAvailable ? 200 : 502 },
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: { ...headers(apiKey), "Content-Type": "application/json" },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages: [{ role: "user", content: "Reply with only: OK" }],
          max_tokens: 8,
          temperature: 0,
          stream: false,
        }),
        signal: controller.signal,
      },
    );
    clearTimeout(timeout);
    const data = await response.json().catch(() => null);
    const content = data?.choices?.[0]?.message?.content;
    return NextResponse.json(
      {
        ok: response.ok && typeof content === "string",
        keyConfigured: true,
        openRouterStatus: response.status,
        model: OPENROUTER_MODEL,
        latencyMs: Date.now() - startedAt,
        responseContentType: typeof content,
        message: response.ok
          ? "The configured model completed a test generation."
          : "The model completion request failed.",
      },
      { status: response.ok && typeof content === "string" ? 200 : 502 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        keyConfigured: true,
        model: OPENROUTER_MODEL,
        latencyMs: Date.now() - startedAt,
        message:
          error instanceof Error ? error.message : "Unknown deployment error.",
      },
      { status: 502 },
    );
  }
}
