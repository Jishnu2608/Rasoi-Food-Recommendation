import { NextResponse } from "next/server";
import { fetchRecipesWithIngredients } from "@/lib/db/queries";
import { toRecipeSummary } from "@/lib/intelligence/match";

function hashDate(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export async function GET() {
  try {
    const recipes = await fetchRecipesWithIngredients();
    if (recipes.length === 0) {
      return NextResponse.json({ error: "No recipes available" }, { status: 404 });
    }

    const today = new Date().toISOString().slice(0, 10);
    const selected = recipes[hashDate(today) % recipes.length];

    return NextResponse.json({
      date: today,
      recipe: toRecipeSummary(selected.recipe),
      description: selected.recipe.description,
      source_url: selected.recipe.source_url ?? null,
      ingredients: selected.rows
        .slice(0, 8)
        .map((row) => row.ingredient.display_name_en),
    });
  } catch {
    return NextResponse.json(
      { error: "Could not select today's star dish" },
      { status: 500 },
    );
  }
}
