/** Ingredients assumed present in most Indian home kitchens for can_cook_now. */
export const STAPLE_CANONICAL_NAMES = new Set([
  "salt",
  "cooking_oil",
  "water",
  "cumin",
  "turmeric",
  "red_chili_powder",
  "coriander_powder",
  "garam_masala",
  "mustard_seeds",
  "asafoetida",
  "ginger",
  "garlic",
  "green_chili",
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
