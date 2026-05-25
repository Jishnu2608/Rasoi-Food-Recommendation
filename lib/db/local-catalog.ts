import ingredientsSeed from "@/data/seeds/ingredients.json";
import { recipeCatalog } from "@/data/seeds/recipe-catalog";
import type { SeedRecipe } from "@/data/seeds/recipe-catalog";
import type { RecipeWithIngredients } from "@/lib/intelligence/match";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import type {
  Ingredient,
  IngredientAlias,
  IngredientRef,
  Recipe,
  RecipeIngredientRow,
  SubstitutionRule,
} from "@/lib/utils/types";

type IngredientSeed = (typeof ingredientsSeed.ingredients)[number];
type LocalIngredientSeed = IngredientSeed & { source_aliases?: string[] };

interface ExpandedIngredientsFile {
  ingredients?: LocalIngredientSeed[];
}

interface ExpandedRecipesFile {
  recipes?: SeedRecipe[];
}

let cachedGeneratedIngredients: LocalIngredientSeed[] | null = null;
let cachedGeneratedRecipes: SeedRecipe[] | null = null;

function readJsonFile<T>(path: string, fallback: T): T {
  try {
    if (!existsSync(path)) return fallback;
    return JSON.parse(readFileSync(path, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

function getGeneratedIngredients(): LocalIngredientSeed[] {
  cachedGeneratedIngredients ??= readJsonFile<ExpandedIngredientsFile>(
    join(process.cwd(), "data", "generated", "expanded-ingredients.json"),
    {},
  ).ingredients ?? [];
  return cachedGeneratedIngredients;
}

function getGeneratedRecipes(): SeedRecipe[] {
  cachedGeneratedRecipes ??= readJsonFile<ExpandedRecipesFile>(
    join(process.cwd(), "data", "generated", "expanded-recipes.json"),
    {},
  ).recipes ?? [];
  return cachedGeneratedRecipes;
}

function getAllIngredientSeeds(): LocalIngredientSeed[] {
  return [...ingredientsSeed.ingredients, ...getGeneratedIngredients()];
}

function getAllRecipes(): SeedRecipe[] {
  return [...recipeCatalog, ...getGeneratedRecipes()];
}

function getIngredientSeedByCanonical(): Map<string, LocalIngredientSeed> {
  return new Map(
    getAllIngredientSeeds().map((seed) => [seed.canonical_name, seed]),
  );
}

function getIngredientRefByCanonical(): Map<string, IngredientRef> {
  return new Map(
    getAllIngredientSeeds().map((seed) => [
      seed.canonical_name,
      toIngredientRef(seed),
    ]),
  );
}

function toIngredient(seed: LocalIngredientSeed): Ingredient {
  return {
    id: seed.canonical_name,
    canonical_name: seed.canonical_name,
    display_name_en: seed.display_name_en,
    display_name_hi: seed.display_name_hi ?? null,
    category: seed.category ?? null,
    is_staple: seed.is_staple ?? false,
  };
}

function toIngredientRef(seed: LocalIngredientSeed): IngredientRef {
  return {
    id: seed.canonical_name,
    canonical_name: seed.canonical_name,
    display_name_en: seed.display_name_en,
    display_name_hi: seed.display_name_hi ?? null,
  };
}

export function fetchLocalIngredients(): Ingredient[] {
  return getAllIngredientSeeds().map(toIngredient);
}

export function fetchLocalAliasesWithIngredients(): (IngredientAlias & {
  ingredient: IngredientRef;
})[] {
  return getAllIngredientSeeds().flatMap((seed) => {
    const ingredient = toIngredientRef(seed);
    const aliases = new Set([
      seed.canonical_name,
      seed.display_name_en.toLowerCase(),
      ...(seed.aliases ?? []),
      ...("source_aliases" in seed ? seed.source_aliases ?? [] : []),
    ]);

    return [...aliases]
      .map((alias) => alias.trim().toLowerCase())
      .filter(Boolean)
      .map((alias) => ({
        id: `${seed.canonical_name}:${alias}`,
        ingredient_id: seed.canonical_name,
        alias,
        language: /[\u0900-\u097F]/.test(alias) ? "hi" : "en",
        ingredient,
      }));
  });
}

export function fetchLocalCanonicalNameMap(): Map<string, IngredientRef> {
  return getIngredientRefByCanonical();
}

export function fetchLocalRecipesWithIngredients(): RecipeWithIngredients[] {
  const ingredientRefByCanonical = getIngredientRefByCanonical();

  return getAllRecipes().map((seed) => {
    const recipe: Recipe = {
      id: seed.slug,
      slug: seed.slug,
      name: seed.name,
      name_hi: seed.name_hi ?? null,
      region: seed.region,
      state: null,
      meal_type: seed.meal_type,
      veg: seed.veg,
      prep_time_min: seed.prep_time_min,
      difficulty: seed.difficulty,
      instructions: seed.instructions,
      description: seed.description ?? null,
      source_url: seed.source_url ?? null,
      homemade_score: seed.homemade_score ?? 85,
      is_published: true,
    };

    const rows = seed.ingredients.map((ingredient, index) => {
      const ref = ingredientRefByCanonical.get(ingredient.canonical);
      if (!ref) {
        throw new Error(
          `Unknown canonical "${ingredient.canonical}" in local recipe ${seed.slug}`,
        );
      }

      return {
        id: `${seed.slug}:${ingredient.canonical}`,
        recipe_id: seed.slug,
        ingredient_id: ingredient.canonical,
        quantity_text: ingredient.quantity ?? null,
        is_required: ingredient.required !== false,
        sort_order: index,
        ingredient: ref,
      } satisfies RecipeIngredientRow & { ingredient: IngredientRef };
    });

    return { recipe, rows };
  });
}

export function fetchLocalRecipeBySlug(slug: string): RecipeWithIngredients {
  const recipe = fetchLocalRecipesWithIngredients().find(
    (item) => item.recipe.slug === slug,
  );
  if (!recipe) throw new Error("Recipe not found");
  return recipe;
}

export function fetchLocalSubstitutionRules(): (SubstitutionRule & {
  ingredient: IngredientRef;
  substitute: IngredientRef;
})[] {
  const ingredientSeedByCanonical = getIngredientSeedByCanonical();

  return ingredientsSeed.substitutions.flatMap((substitution) => {
    const ingredientSeed = ingredientSeedByCanonical.get(substitution.ingredient);
    const substituteSeed = ingredientSeedByCanonical.get(substitution.substitute);
    if (!ingredientSeed || !substituteSeed) return [];

    return {
      id: `${substitution.ingredient}:${substitution.substitute}`,
      ingredient_id: substitution.ingredient,
      substitute_id: substitution.substitute,
      context_region: null,
      ratio_note: substitution.ratio_note ?? null,
      confidence: substitution.confidence ?? 90,
      ingredient: toIngredientRef(ingredientSeed),
      substitute: toIngredientRef(substituteSeed),
    };
  });
}

export function searchLocalIngredientAliases(query: string, limit = 8) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return fetchLocalAliasesWithIngredients()
    .filter((row) => row.alias.startsWith(q))
    .slice(0, limit)
    .map((row) => ({
      alias: row.alias,
      ingredient: row.ingredient,
    }));
}
