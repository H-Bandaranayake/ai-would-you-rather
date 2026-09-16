import { Pick } from "./types";

export const TRAIT_AXES = [
  { key: "chaos_comfort", left: "chaos", right: "comfort" },
  { key: "social_solitary", left: "social", right: "solitary" },
  { key: "power_peace", left: "power", right: "peace" },
  { key: "logic_vibes", left: "logic", right: "vibes" },
  { key: "short_long", left: "shortterm", right: "longterm" },
] as const;

/**
 * Tallies how often the player leaned toward each side of each trait axis,
 * across the 10 rounds, and renders it as short text for the AI prompt.
 * This is the deterministic "Layer 1" signal from the design doc -- the AI
 * only writes the prose on top of numbers we already computed in code.
 */
export function computeSignals(picks: Pick[]): string {
  const tally: Record<string, Record<string, number>> = {};
  TRAIT_AXES.forEach((ax) => (tally[ax.key] = { [ax.left]: 0, [ax.right]: 0 }));

  picks.forEach((p) => {
    (p.traits || []).forEach((t) => {
      TRAIT_AXES.forEach((ax) => {
        if (ax.left === t) tally[ax.key][ax.left]++;
        if (ax.right === t) tally[ax.key][ax.right]++;
      });
    });
  });

  return TRAIT_AXES.map((ax) => {
    const l = tally[ax.key][ax.left];
    const r = tally[ax.key][ax.right];
    if (l === 0 && r === 0) return `${ax.left} vs ${ax.right}: not enough signal`;
    if (l === r) return `${ax.left} vs ${ax.right}: evenly split`;
    const winner = l > r ? ax.left : ax.right;
    return `${ax.left} vs ${ax.right}: leans ${winner} (${Math.max(l, r)}/${l + r})`;
  }).join("\n");
}
