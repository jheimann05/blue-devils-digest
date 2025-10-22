/* Milestone 5/6 — real OpenAI call using Chat Completions (JSON-only) */
import OpenAI from "openai";
import type { Row } from "./data";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export type M5Result = {
  recap: string;          // ~80 words
  tweet: string;          // <= 280 chars
  tags: string[];         // exactly 3 hashtags (e.g., ["#DukeMBB", "#GoDuke", "#ACC"])
};

/**
 * Generates recap, tweet, and tags for one row.
 * Returns { json, raw } where `json` has {recap,tweet,tags}.
 * This matches the usage in your M6 script: `const { json } = await generateCopy(...)`.
 */
export async function generateCopy(row: Row): Promise<{ json: M5Result; raw: string }> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY missing in .env");
  }

  const system = `You are a precise content generator for a Duke basketball digest.
Return ONLY strict JSON with keys {"recap": string, "tweet": string, "tags": string[] }. 
No markdown, no extra keys, no commentary.`;

  const user = `
Game:
- Date: ${row.date}
- Opponent: ${row.opponent}
- Score: Duke ${row.duke_score} - ${row.opp_score}
- Top performers: ${row.top_performers}
- Angle: ${row.angle}

Requirements:
- recap: ~80 words, energetic but factual.
- tweet: <= 280 characters, include exactly one hashtag: allow 0–2 tasteful emojis.
- tags: array of EXACTLY 3 hashtags (strings), relevant.

Output:
Return ONLY valid JSON with keys: recap (string), tweet (string), tags (string[]).
`;

  const resp = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.6,
    response_format: { type: "json_object" }, // force pure JSON
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });

  const raw = resp.choices[0]?.message?.content ?? "";

  let parsed: M5Result;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Model did not return valid JSON. Raw:\n" + raw);
  }

  // Minimal shape checks + guardrails
  if (
    !parsed ||
    typeof parsed.recap !== "string" ||
    typeof parsed.tweet !== "string" ||
    !Array.isArray(parsed.tags) ||
    parsed.tags.length !== 3 ||
    !parsed.tags.every(t => typeof t === "string" && t.startsWith("#"))
  ) {
    throw new Error("JSON shape invalid. Raw:\n" + raw);
  }

  parsed.tweet = parsed.tweet.slice(0, 280);

  return { json: parsed, raw };
}
export const mockGenerate = generateCopy; 
