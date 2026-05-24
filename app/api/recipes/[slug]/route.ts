import { NextResponse } from "next/server";
import { fetchRecipeBySlug, fetchSubstitutionRules } from "@/lib/db/queries";
import { resolveSubstitutions } from "@/lib/intelligence/substitutions";
import { scoreRecipe } from "@/lib/intelligence/score";
import { toRecipeSummary } from "@/lib/intelligence/match";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import type { IngredientRef } from "@/lib/utils/types";
import { z } from "zod";

const querySchema = z.object({
  pantry: z.string().optional(),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 503 },
    );
  }

  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({
    pantry: searchParams.get("pantry") ?? undefined,
  });

  const pantryIds = new Set(
    (parsed.success && parsed.data.pantry
      ? parsed.data.pantry.split(",").filter(Boolean)
      : []),
  );

  try {
    const { recipe, rows } = await fetchRecipeBySlug(slug);
    const required = rows.filter((r) => r.is_required).map((r) => r.ingredient);
    const optional = rows.filter((r) => !r.is_required).map((r) => r.ingredient);

    const pantry: IngredientRef[] =
      pantryIds.size > 0
        ? [...required, ...optional].filter((i) => pantryIds.has(i.id))
        : [];

    const match =
      pantry.length > 0
        ? scoreRecipe({
            recipe: toRecipeSummary(recipe),
            required,
            optional,
            pantryIds,
            pantryByCanonical: new Map(
              pantry.map((p) => [p.canonical_name, p]),
            ),
          })
        : null;

    const rules = await fetchSubstitutionRules();
    const substitutions =
      match && match.missing_required.length > 0
        ? resolveSubstitutions(match.missing_required, pantryIds, rules)
        : [];

    return NextResponse.json({
      recipe,
      ingredients: rows,
      match,
      substitutions,
    });
  } catch {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }
}
