import { NextResponse } from "next/server";
import {
  fetchAllIngredients,
  fetchRecipesWithIngredients,
} from "@/lib/db/queries";

export async function GET() {
  try {
    const [ingredients, recipes] = await Promise.all([
      fetchAllIngredients(),
      fetchRecipesWithIngredients(),
    ]);

    return NextResponse.json({
      ingredient_count: ingredients.length,
      recipe_count: recipes.length,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not load catalog stats" },
      { status: 500 },
    );
  }
}
