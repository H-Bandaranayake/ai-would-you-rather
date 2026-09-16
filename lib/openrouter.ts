const MODEL = "nvidia/nemotron-3.5-lightning:free";

/**
 * Calls the OpenRouter chat completions API from the server (API route), using
 * the OPENROUTER_API_KEY environment variable. Never call this from the
 * client -- it would expose the key.
 *
 * OpenRouter uses an OpenAI-compatible request/response shape: POST
 * https://openrouter.ai/api/v1/chat/completions with a `messages` array and a
 * Bearer token.
 */
export async function callOpenRouter(
  system: string,
  user: string,
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENROUTER_API_KEY environment variable");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.9,
      max_tokens: 1200,
      reasoning: { effort: "none" },
      stream: false,
    }),
    signal: controller.signal,
  });
  clearTimeout(timeout);

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenRouter API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new Error("OpenRouter response missing message content");
  }
  return content.trim();
}

/**
 * Guards against stray markdown fences or leading/trailing text.
 */
export function extractJSON(text: string): any {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const starts = [cleaned.indexOf("["), cleaned.indexOf("{")].filter(
    (i) => i !== -1,
  );
  const start = starts.length ? Math.min(...starts) : -1;
  const end = Math.max(cleaned.lastIndexOf("]"), cleaned.lastIndexOf("}"));
  const slice =
    start !== -1 && end !== -1 ? cleaned.slice(start, end + 1) : cleaned;
  return JSON.parse(slice);
}
