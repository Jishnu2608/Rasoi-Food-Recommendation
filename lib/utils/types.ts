import type { DIFFICULTIES, MEAL_TYPES, REGIONS } from "./constants";

export type Region = (typeof REGIONS)[number];
export type MealType = (typeof MEAL_TYPES)[number];
export type Difficulty = (typeof DIFFICULTIES)[number];

export interface Ingredient {
  id: string;
  canonical_name: string;
  display_name_en: string;
  display_name_hi: string | null;
  category: string | null;
  is_staple: boolean;
}

export interface IngredientAlias {
  id: string;
  ingredient_id: string;
  alias: string;
  language: string | null;
}

export interface Recipe {
  id: string;
  slug: string;
  name: string;
  name_hi: string | null;
  region: Region;
  state: string | null;
  meal_type: MealType;
  veg: boolean;
  prep_time_min: number;
  difficulty: Difficulty;
  instructions: RecipeStep[];
  description: string | null;
  homemade_score: number;
  is_published: boolean;
}

export interface RecipeStep {
  step: number;
  text: string;
}

export interface RecipeIngredientRow {
  id: string;
  recipe_id: string;
  ingredient_id: string;
  quantity_text: string | null;
  is_required: boolean;
  sort_order: number;
  ingredient?: IngredientRef;
}

export interface SubstitutionRule {
  id: string;
  ingredient_id: string;
  substitute_id: string;
  context_region: string | null;
  ratio_note: string | null;
  confidence: number;
}

export interface RecipeSummary {
  id: string;
  slug: string;
  name: string;
  name_hi: string | null;
  region: Region;
  meal_type: MealType;
  veg: boolean;
  prep_time_min: number;
  difficulty: Difficulty;
  homemade_score: number;
}

export interface IngredientRef {
  id: string;
  canonical_name: string;
  display_name_en: string;
  display_name_hi: string | null;
}

export interface RecommendationResult {
  recipe: RecipeSummary;
  score: number;
  matched: IngredientRef[];
  missing_required: IngredientRef[];
  missing_optional: IngredientRef[];
  can_cook_now: boolean;
  assumed_staples: string[];
}

export interface NormalizeResult {
  pantry: IngredientRef[];
  unmatched: string[];
}
