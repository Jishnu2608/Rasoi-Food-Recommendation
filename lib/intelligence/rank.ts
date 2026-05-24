import type { RecommendationResult } from "@/lib/utils/types";

export function rankRecommendations(
  results: RecommendationResult[],
): RecommendationResult[] {
  return [...results].sort((a, b) => {
    if (a.can_cook_now !== b.can_cook_now) {
      return a.can_cook_now ? -1 : 1;
    }
    if (b.score !== a.score) return b.score - a.score;
    const missA = a.missing_required.length;
    const missB = b.missing_required.length;
    if (missA !== missB) return missA - missB;
    if (a.recipe.prep_time_min !== b.recipe.prep_time_min) {
      return a.recipe.prep_time_min - b.recipe.prep_time_min;
    }
    return b.recipe.homemade_score - a.recipe.homemade_score;
  });
}
