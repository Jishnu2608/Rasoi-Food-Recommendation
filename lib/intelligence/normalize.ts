import { FUZZY_MATCH_THRESHOLD } from "@/lib/utils/constants";
import type { IngredientAlias, IngredientRef } from "@/lib/utils/types";
import { similarity } from "./fuzzy";

export function preprocessIngredientInput(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ");
}

export interface AliasIndexEntry {
  ingredient_id: string;
  alias: string;
  ingredient: IngredientRef;
}

export function buildAliasIndex(
  aliases: (IngredientAlias & { ingredient: IngredientRef })[],
): Map<string, AliasIndexEntry> {
  const map = new Map<string, AliasIndexEntry>();
  for (const row of aliases) {
    if (map.has(row.alias)) continue;
    map.set(row.alias, {
      ingredient_id: row.ingredient_id,
      alias: row.alias,
      ingredient: row.ingredient,
    });
  }
  return map;
}

export function normalizeIngredients(
  rawInputs: string[],
  aliasIndex: Map<string, AliasIndexEntry>,
  canonicalByName: Map<string, IngredientRef>,
): { pantry: IngredientRef[]; unmatched: string[] } {
  const pantryMap = new Map<string, IngredientRef>();
  const unmatched: string[] = [];

  for (const raw of rawInputs) {
    const input = preprocessIngredientInput(raw);
    if (!input) continue;

    const exact = aliasIndex.get(input);
    if (exact) {
      pantryMap.set(exact.ingredient.id, exact.ingredient);
      continue;
    }

    const canonical = canonicalByName.get(input);
    if (canonical) {
      pantryMap.set(canonical.id, canonical);
      continue;
    }

    let best: AliasIndexEntry | null = null;
    let bestScore = 0;
    for (const entry of aliasIndex.values()) {
      const score = similarity(input, entry.alias);
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    }

    if (best && bestScore >= FUZZY_MATCH_THRESHOLD) {
      pantryMap.set(best.ingredient.id, best.ingredient);
      continue;
    }

    unmatched.push(raw.trim());
  }

  return {
    pantry: Array.from(pantryMap.values()),
    unmatched,
  };
}
