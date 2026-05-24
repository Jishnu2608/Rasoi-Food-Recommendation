import { STAPLE_CANONICAL_NAMES } from "@/lib/utils/constants";
import type {
  Difficulty,
  IngredientRef,
  RecipeSummary,
} from "@/lib/utils/types";

export interface RecipeMatchInput {
  recipe: RecipeSummary;
  required: IngredientRef[];
  optional: IngredientRef[];
  pantryIds: Set<string>;
  pantryByCanonical: Map<string, IngredientRef>;
}

function difficultyWeight(d: Difficulty): number {
  if (d === "easy") return 1;
  if (d === "medium") return 0.5;
  return 0;
}

function prepTimeWeight(minutes: number): number {
  if (minutes <= 20) return 1;
  if (minutes <= 40) return 0.6;
  return 0.2;
}

function isStaple(ing: IngredientRef): boolean {
  return (
    ing.canonical_name !== undefined &&
    STAPLE_CANONICAL_NAMES.has(ing.canonical_name)
  );
}

export function scoreRecipe(input: RecipeMatchInput): {
  score: number;
  matched: IngredientRef[];
  missing_required: IngredientRef[];
  missing_optional: IngredientRef[];
  can_cook_now: boolean;
  assumed_staples: string[];
} {
  const { recipe, required, optional, pantryIds } = input;

  const matched: IngredientRef[] = [];
  const missing_required: IngredientRef[] = [];
  const missing_optional: IngredientRef[] = [];
  const assumed_staples: string[] = [];

  for (const ing of required) {
    if (pantryIds.has(ing.id)) {
      matched.push(ing);
    } else if (isStaple(ing)) {
      assumed_staples.push(ing.display_name_en);
    } else {
      missing_required.push(ing);
    }
  }

  for (const ing of optional) {
    if (pantryIds.has(ing.id)) {
      matched.push(ing);
    } else {
      missing_optional.push(ing);
    }
  }

  const matchedRequired = required.filter(
    (i) =>
      pantryIds.has(i.id) ||
      isStaple(i),
  ).length;

  const baseScore =
    required.length > 0 ? matchedRequired / required.length : 0;

  const matchedOptional = optional.filter((i) => pantryIds.has(i.id)).length;
  const optionalBonus =
    optional.length > 0
      ? Math.min(0.05, 0.05 * (matchedOptional / optional.length))
      : 0;

  const missingPenalty = 0.12 * missing_required.length;

  const practicality =
    0.08 * (recipe.homemade_score / 100) +
    0.06 * difficultyWeight(recipe.difficulty) +
    0.05 * prepTimeWeight(recipe.prep_time_min);

  const finalScore = Math.max(
    0,
    Math.min(
      1,
      baseScore + optionalBonus - missingPenalty + practicality,
    ),
  );

  return {
    score: Math.round(finalScore * 1000) / 1000,
    matched,
    missing_required,
    missing_optional,
    can_cook_now: missing_required.length === 0,
    assumed_staples,
  };
}
