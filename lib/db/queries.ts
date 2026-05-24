import { createServerClient } from "@/lib/supabase/server";
import type { IngredientRef } from "@/lib/utils/types";
import type { RecipeWithIngredients } from "@/lib/intelligence/match";

function toIngredientRef(row: {
  id: string;
  canonical_name: string;
  display_name_en: string;
  display_name_hi: string | null;
}): IngredientRef {
  return {
    id: row.id,
    canonical_name: row.canonical_name,
    display_name_en: row.display_name_en,
    display_name_hi: row.display_name_hi,
  };
}

export async function fetchAllIngredients() {
  const supabase = createServerClient();
  const { data, error } = await supabase.from("ingredients").select("*");
  if (error) throw error;
  return data ?? [];
}

export async function fetchAliasesWithIngredients() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("ingredient_aliases")
    .select(
      `
      id,
      ingredient_id,
      alias,
      language,
      ingredient:ingredients (
        id,
        canonical_name,
        display_name_en,
        display_name_hi
      )
    `,
    );
  if (error) throw error;

  return (data ?? []).map((row) => {
    const ing = Array.isArray(row.ingredient)
      ? row.ingredient[0]
      : row.ingredient;
    return {
      id: row.id,
      ingredient_id: row.ingredient_id,
      alias: row.alias,
      language: row.language,
      ingredient: toIngredientRef(ing),
    };
  });
}

export async function fetchCanonicalNameMap(): Promise<Map<string, IngredientRef>> {
  const ingredients = await fetchAllIngredients();
  const map = new Map<string, IngredientRef>();
  for (const ing of ingredients) {
    map.set(ing.canonical_name, toIngredientRef(ing));
  }
  return map;
}

export async function fetchRecipesWithIngredients(): Promise<
  RecipeWithIngredients[]
> {
  const supabase = createServerClient();
  const { data: recipes, error: recipeError } = await supabase
    .from("recipes")
    .select("*")
    .eq("is_published", true);
  if (recipeError) throw recipeError;

  const { data: links, error: linkError } = await supabase
    .from("recipe_ingredients")
    .select(
      `
      id,
      recipe_id,
      ingredient_id,
      quantity_text,
      is_required,
      sort_order,
      ingredient:ingredients (
        id,
        canonical_name,
        display_name_en,
        display_name_hi
      )
    `,
    );
  if (linkError) throw linkError;

  const byRecipe = new Map<string, RecipeWithIngredients["rows"]>();
  for (const link of links ?? []) {
    const ing = Array.isArray(link.ingredient)
      ? link.ingredient[0]
      : link.ingredient;
    const rows = byRecipe.get(link.recipe_id) ?? [];
    rows.push({
      id: link.id,
      recipe_id: link.recipe_id,
      ingredient_id: link.ingredient_id,
      quantity_text: link.quantity_text,
      is_required: link.is_required,
      sort_order: link.sort_order,
      ingredient: toIngredientRef(ing),
    });
    byRecipe.set(link.recipe_id, rows);
  }

  return (recipes ?? []).map((recipe) => ({
    recipe: {
      ...recipe,
      instructions: recipe.instructions as RecipeWithIngredients["recipe"]["instructions"],
    },
    rows: byRecipe.get(recipe.id) ?? [],
  }));
}

export async function fetchRecipeBySlug(slug: string) {
  const supabase = createServerClient();
  const { data: recipe, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  if (error) throw error;

  const { data: links, error: linkError } = await supabase
    .from("recipe_ingredients")
    .select(
      `
      id,
      recipe_id,
      ingredient_id,
      quantity_text,
      is_required,
      sort_order,
      ingredient:ingredients (
        id,
        canonical_name,
        display_name_en,
        display_name_hi
      )
    `,
    )
    .eq("recipe_id", recipe.id)
    .order("sort_order");
  if (linkError) throw linkError;

  const rows = (links ?? []).map((link) => {
    const ing = Array.isArray(link.ingredient)
      ? link.ingredient[0]
      : link.ingredient;
    return {
      ...link,
      ingredient: toIngredientRef(ing),
    };
  });

  return {
    recipe: {
      ...recipe,
      instructions: recipe.instructions as RecipeWithIngredients["recipe"]["instructions"],
    },
    rows,
  };
}

export async function fetchSubstitutionRules() {
  const supabase = createServerClient();
  const ingredients = await fetchAllIngredients();
  const byId = new Map(ingredients.map((i) => [i.id, toIngredientRef(i)]));

  const { data, error } = await supabase.from("substitution_rules").select("*");
  if (error) throw error;

  return (data ?? [])
    .map((row) => {
      const ingredient = byId.get(row.ingredient_id);
      const substitute = byId.get(row.substitute_id);
      if (!ingredient || !substitute) return null;
      return {
        ...row,
        ingredient,
        substitute,
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);
}

export async function logUnknownIngredient(raw: string, guess?: string) {
  const supabase = createServerClient();
  await supabase.from("unknown_ingredient_logs").insert({
    raw_input: raw,
    normalized_guess: guess ?? null,
  });
}

export async function searchIngredientAliases(query: string, limit = 8) {
  const supabase = createServerClient();
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const { data, error } = await supabase
    .from("ingredient_aliases")
    .select(
      `
      alias,
      ingredient:ingredients (
        id,
        canonical_name,
        display_name_en,
        display_name_hi
      )
    `,
    )
    .ilike("alias", `${q}%`)
    .limit(limit);
  if (error) throw error;

  return (data ?? []).map((row) => {
    const ing = Array.isArray(row.ingredient)
      ? row.ingredient[0]
      : row.ingredient;
    return {
      alias: row.alias,
      ingredient: toIngredientRef(ing),
    };
  });
}
