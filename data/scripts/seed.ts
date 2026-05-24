/**
 * Seed Supabase with ingredients, aliases, recipes, and substitutions.
 * Run: npm run db:seed
 * Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
import { readFileSync } from "fs";
import { join } from "path";
import { createClient } from "@supabase/supabase-js";
import { recipeCatalog, type SeedRecipe } from "../seeds/recipe-catalog";

const root = join(process.cwd(), "data", "seeds");

interface IngredientSeed {
  canonical_name: string;
  display_name_en: string;
  display_name_hi?: string;
  category?: string;
  is_staple?: boolean;
  aliases?: string[];
}

function loadIngredients(): {
  ingredients: IngredientSeed[];
  substitutions: {
    ingredient: string;
    substitute: string;
    ratio_note?: string;
    confidence?: number;
  }[];
} {
  const raw = readFileSync(join(root, "ingredients.json"), "utf-8");
  return JSON.parse(raw);
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false },
  });

  const { ingredients, substitutions } = loadIngredients();
  const idByCanonical = new Map<string, string>();

  console.log("Seeding ingredients...");
  for (const ing of ingredients) {
    const { data, error } = await supabase
      .from("ingredients")
      .upsert(
        {
          canonical_name: ing.canonical_name,
          display_name_en: ing.display_name_en,
          display_name_hi: ing.display_name_hi ?? null,
          category: ing.category ?? null,
          is_staple: ing.is_staple ?? false,
        },
        { onConflict: "canonical_name" },
      )
      .select("id, canonical_name")
      .single();
    if (error) throw error;
    idByCanonical.set(data.canonical_name, data.id);

    const aliasSet = new Set<string>([
      ing.canonical_name,
      ing.display_name_en.toLowerCase(),
      ...(ing.aliases ?? []),
    ]);
    for (const alias of aliasSet) {
      const normalized = alias.trim().toLowerCase();
      if (!normalized) continue;
      await supabase.from("ingredient_aliases").upsert(
        {
          ingredient_id: data.id,
          alias: normalized,
          language: /[\u0900-\u097F]/.test(normalized) ? "hi" : "en",
        },
        { onConflict: "alias,language", ignoreDuplicates: true },
      );
    }
  }

  console.log("Seeding substitution rules...");
  for (const sub of substitutions) {
    const ingredient_id = idByCanonical.get(sub.ingredient);
    const substitute_id = idByCanonical.get(sub.substitute);
    if (!ingredient_id || !substitute_id) continue;
    await supabase.from("substitution_rules").upsert(
      {
        ingredient_id,
        substitute_id,
        context_region: null,
        ratio_note: sub.ratio_note ?? null,
        confidence: sub.confidence ?? 90,
      },
      { onConflict: "ingredient_id,substitute_id,context_region" },
    );
  }

  console.log(`Seeding ${recipeCatalog.length} recipes...`);
  for (const recipe of recipeCatalog as SeedRecipe[]) {
    const { data: row, error } = await supabase
      .from("recipes")
      .upsert(
        {
          slug: recipe.slug,
          name: recipe.name,
          name_hi: recipe.name_hi ?? null,
          region: recipe.region,
          state: null,
          meal_type: recipe.meal_type,
          veg: recipe.veg,
          prep_time_min: recipe.prep_time_min,
          difficulty: recipe.difficulty,
          instructions: recipe.instructions,
          description: recipe.description ?? null,
          homemade_score: recipe.homemade_score ?? 85,
          is_published: true,
        },
        { onConflict: "slug" },
      )
      .select("id")
      .single();
    if (error) throw error;

    await supabase.from("recipe_ingredients").delete().eq("recipe_id", row.id);

    const links = recipe.ingredients.map((ing, idx) => {
      const ingredient_id = idByCanonical.get(ing.canonical);
      if (!ingredient_id) {
        throw new Error(
          `Unknown canonical "${ing.canonical}" in recipe ${recipe.slug}`,
        );
      }
      return {
        recipe_id: row.id,
        ingredient_id,
        quantity_text: ing.quantity ?? null,
        is_required: ing.required !== false,
        sort_order: idx,
      };
    });

    const { error: linkError } = await supabase
      .from("recipe_ingredients")
      .insert(links);
    if (linkError) throw linkError;
  }

  console.log("Seed complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
