import type { IngredientRef, RecommendationResult } from "@/lib/utils/types";

export function buildExplainPrompt(
  pantry: IngredientRef[],
  results: RecommendationResult[],
): string {
  const pantryList = pantry.map((p) => p.display_name_en).join(", ");
  const recipes = results.slice(0, 5).map((r, i) => {
    const missing = r.missing_required.map((m) => m.display_name_en).join(", ");
    return `${i + 1}. ${r.recipe.name} (score ${r.score}, missing: ${missing || "none"})`;
  });

  return `You are a warm Indian home-cooking assistant. The user has these ingredients: ${pantryList}.

These recipes were matched by a database (do NOT invent other dishes):
${recipes.join("\n")}

Write 2-3 short, practical sentences in simple English explaining why the top choices make sense for ghar ka khana. Do not add recipes not listed above.`;
}
