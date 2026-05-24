import type {
  IngredientRef,
  Recipe,
  RecipeIngredientRow,
  RecipeSummary,
  RecommendationResult,
} from "@/lib/utils/types";
import { rankRecommendations } from "./rank";
import { scoreRecipe } from "./score";

export interface RecipeWithIngredients {
  recipe: Recipe;
  rows: (RecipeIngredientRow & { ingredient: IngredientRef })[];
}

export function toRecipeSummary(recipe: Recipe): RecipeSummary {
  return {
    id: recipe.id,
    slug: recipe.slug,
    name: recipe.name,
    name_hi: recipe.name_hi,
    region: recipe.region,
    meal_type: recipe.meal_type,
    veg: recipe.veg,
    prep_time_min: recipe.prep_time_min,
    difficulty: recipe.difficulty,
    homemade_score: recipe.homemade_score,
  };
}

export function matchRecipes(
  pantry: IngredientRef[],
  recipes: RecipeWithIngredients[],
  options?: {
    veg?: boolean;
    region?: string;
    meal_type?: string;
    max_prep_time?: number;
    limit?: number;
  },
): RecommendationResult[] {
  const pantryIds = new Set(pantry.map((p) => p.id));
  const pantryIngredientIds = [...pantryIds];

  const results: RecommendationResult[] = [];

  for (const { recipe, rows } of recipes) {
    if (options?.veg === true && !recipe.veg) continue;
    if (options?.region && recipe.region !== options.region) continue;
    if (options?.meal_type && recipe.meal_type !== options.meal_type) continue;
    if (
      options?.max_prep_time &&
      recipe.prep_time_min > options.max_prep_time
    ) {
      continue;
    }

    const required = rows
      .filter((r) => r.is_required)
      .map((r) => r.ingredient);
    const optional = rows
      .filter((r) => !r.is_required)
      .map((r) => r.ingredient);

    const sharesIngredient = rows.some((r) =>
      pantryIngredientIds.includes(r.ingredient_id),
    );
    if (!sharesIngredient && required.length > 0) continue;

    const summary = toRecipeSummary(recipe);
    const scored = scoreRecipe({
      recipe: summary,
      required,
      optional,
      pantryIds,
      pantryByCanonical: new Map(
        pantry.map((p) => [p.canonical_name, p]),
      ),
    });

    results.push({
      recipe: summary,
      ...scored,
    });
  }

  const ranked = rankRecommendations(results);
  const limit = options?.limit ?? 20;
  return ranked.slice(0, limit);
}
