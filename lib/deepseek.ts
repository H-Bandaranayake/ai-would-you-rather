const MODEL = "deepseek-chat"; // DeepSeek-V3, the general-purpose chat model

/**
 * Calls the DeepSeek chat completions API from the server (API route), using
 * the DEEPSEEK_API_KEY environment variable. Never call this from the
 * client -- it would expose the key.
 *
 * DeepSeek uses an OpenAI-compatible request/response shape, not Anthropic's
 * /v1/messages format: POST https://api.deepseek.com/chat/completions with
 * a `messages` array (system + user roles) and a Bearer token.
 *
 * Note: despite "free" being a common way people describe DeepSeek because
 * it's inexpensive, the hosted API still requires an account with a topped
 * up balance at platform.deepseek.com -- there's no anonymous free tier.
 */
export async function callDeepSeek(system: string, user: string): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("Missing DEEPSEEK_API_KEY environment variable");
  }

  const res = await fetch("https://api.deepseek.com/chat/completions", {
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
      // DeepSeek's JSON mode requires a top-level JSON *object* in the
      // response (not a bare array) -- callers wrap array payloads in
      // {"items": [...]} to satisfy this. The word "json" must also appear
      // somewhere in the prompt, which every prompt here already does.
      response_format: { type: "json_object" },
      temperature: 0.9,
      max_tokens: 1200,
      stream: false,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`DeepSeek API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new Error("DeepSeek response missing message content");
  }
  return content.trim();
}

/**
 * DeepSeek's JSON mode is generally reliable, but this still guards against
 * stray markdown fences or leading/trailing text.
 */
export function extractJSON(text: string): any {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const starts = [cleaned.indexOf("["), cleaned.indexOf("{")].filter((i) => i !== -1);
  const start = starts.length ? Math.min(...starts) : -1;
  const end = Math.max(cleaned.lastIndexOf("]"), cleaned.lastIndexOf("}"));
  const slice = start !== -1 && end !== -1 ? cleaned.slice(start, end + 1) : cleaned;
  return JSON.parse(slice);
}
