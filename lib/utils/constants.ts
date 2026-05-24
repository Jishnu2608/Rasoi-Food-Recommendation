/** Ingredients assumed present in most Indian home kitchens for can_cook_now. */
export const STAPLE_CANONICAL_NAMES = new Set([
  "salt",
  "cooking_oil",
  "water",
]);

export const DEFAULT_RECOMMENDATION_LIMIT = 20;

export const FUZZY_MATCH_THRESHOLD = 0.85;

export const REGIONS = [
  "north",
  "south",
  "east",
  "west",
  "pan_india",
] as const;

export const MEAL_TYPES = [
  "breakfast",
  "lunch",
  "dinner",
  "snack",
] as const;

export const DIFFICULTIES = ["easy", "medium", "hard"] as const;
