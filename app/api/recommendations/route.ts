import { NextResponse } from "next/server";
import { z } from "zod";
import {
  buildAliasIndex,
  normalizeIngredients,
} from "@/lib/intelligence/normalize";
import { matchRecipes } from "@/lib/intelligence/match";
import {
  fetchAliasesWithIngredients,
  fetchCanonicalNameMap,
  fetchRecipesWithIngredients,
  logUnknownIngredient,
} from "@/lib/db/queries";
import { DEFAULT_RECOMMENDATION_LIMIT } from "@/lib/utils/constants";

const bodySchema = z.object({
  ingredients: z.array(z.string()).min(1).max(30),
  filters: z
    .object({
      veg: z.boolean().optional(),
      region: z.string().optional(),
      meal_type: z.string().optional(),
      max_prep_time: z.number().int().positive().optional(),
    })
    .optional(),
  limit: z.number().int().min(1).max(50).optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { ingredients, filters, limit } = bodySchema.parse(json);

    const [aliases, canonicalMap, recipes] = await Promise.all([
      fetchAliasesWithIngredients(),
      fetchCanonicalNameMap(),
      fetchRecipesWithIngredients(),
    ]);

    const aliasIndex = buildAliasIndex(aliases);
    const { pantry, unmatched } = normalizeIngredients(
      ingredients,
      aliasIndex,
      canonicalMap,
    );

    for (const raw of unmatched) {
      await logUnknownIngredient(raw).catch(() => undefined);
    }

    if (pantry.length === 0) {
      return NextResponse.json({
        pantry: [],
        unmatched,
        results: [],
        message: "No recognized ingredients. Try common names like aloo, pyaz, tamatar.",
      });
    }

    const results = matchRecipes(pantry, recipes, {
      ...filters,
      limit: limit ?? DEFAULT_RECOMMENDATION_LIMIT,
    });

    return NextResponse.json({ pantry, unmatched, results });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.flatten() }, { status: 400 });
    }
    console.error(e);
    return NextResponse.json(
      { error: "Recommendation failed" },
      { status: 500 },
    );
  }
}
