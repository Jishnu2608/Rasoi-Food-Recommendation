/**
 * Import a sourced Indian recipe catalog into data/generated.
 *
 * Source: https://huggingface.co/datasets/Anupam007/indian-recipe-dataset
 * The dataset is a CSV mirror of Indian recipes with names, ingredients,
 * cuisine/course metadata, and source URLs. The dataset page does not publish
 * a license, so this importer stores the dish identity, ingredient facts, and
 * source URL, while keeping exact method text at the original source.
 */
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import ingredientsSeed from "../seeds/ingredients.json";
import { recipeCatalog, type SeedRecipe } from "../seeds/recipe-catalog";

const SOURCE_URL =
  "https://huggingface.co/datasets/Anupam007/indian-recipe-dataset/resolve/main/Cleaned_Indian_Food_Dataset.csv";
const SOURCE_PAGE =
  "https://huggingface.co/datasets/Anupam007/indian-recipe-dataset";
const TARGET_RECIPE_COUNT = Number(process.env.EXPANDED_RECIPE_TARGET ?? 1500);
const generatedRoot = join(process.cwd(), "data", "generated");

type Region = SeedRecipe["region"];
type MealType = SeedRecipe["meal_type"];
type Difficulty = SeedRecipe["difficulty"];

interface IngredientSeed {
  canonical_name: string;
  display_name_en: string;
  display_name_hi?: string;
  category?: string;
  is_staple?: boolean;
  aliases?: string[];
  source_aliases?: string[];
}

interface RawRecipeRow {
  TranslatedRecipeName: string;
  TranslatedIngredients: string;
  TotalTimeInMins: string;
  Cuisine: string;
  Course: string;
  Diet: string;
  URL: string;
  "Cleaned-Ingredients": string;
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (quoted && next === '"') {
        cell += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  row.push(cell);
  if (row.some((value) => value.trim())) rows.push(row);
  return rows;
}

function toRecords(csv: string): RawRecipeRow[] {
  const [header, ...rows] = parseCsv(csv);
  const index = new Map(header.map((name, i) => [name, i]));
  return rows.map((row) => ({
    TranslatedRecipeName: row[index.get("TranslatedRecipeName") ?? -1] ?? "",
    TranslatedIngredients: row[index.get("TranslatedIngredients") ?? -1] ?? "",
    TotalTimeInMins: row[index.get("TotalTimeInMins") ?? -1] ?? "",
    Cuisine: row[index.get("Cuisine") ?? -1] ?? "",
    Course: row[index.get("Course") ?? -1] ?? "",
    Diet: row[index.get("Diet") ?? -1] ?? "",
    URL: row[index.get("URL") ?? -1] ?? "",
    "Cleaned-Ingredients": row[index.get("Cleaned-Ingredients") ?? -1] ?? "",
  }));
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function titleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\b\d+\b/g, " ")
    .replace(/\b(cup|cups|tablespoon|tablespoons|tbsp|teaspoon|teaspoons|tsp|grams|gram|kg|kilogram|liter|litre|ml|inch|inches|pinch|sprig|sprigs|piece|pieces)\b/g, " ")
    .replace(/\b(finely|roughly|fresh|homemade|whole|split|dry|dried|small|big|large|medium|optional|required|for|to|taste|as|needed|chopped|sliced|grated|paste|puree|powdered|roasted|crushed|soaked|cooked|boiled|peeled|deseeded|seedless|thinly)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function stripIngredientLine(value: string): string {
  return value
    .replace(/^\s*[\d\s./-]+/, "")
    .replace(/^\s*(cup|cups|tablespoon|tablespoons|tbsp|teaspoon|teaspoons|tsp|grams|gram|kg|kilogram|liter|litre|ml|inch|inches|pinch|sprig|sprigs|piece|pieces)\b\s*/i, "")
    .replace(/\s+-\s+.*$/g, "")
    .replace(/\s+as\s+(required|needed|per taste).*$/i, "")
    .trim();
}

function aliasVariants(alias: string): string[] {
  const normalized = normalizeText(alias);
  const parts = normalized.split(" ").filter(Boolean);
  const usefulSingleWords = new Set([
    "ragi",
    "fish",
    "cream",
    "paneer",
    "pomfret",
    "surmai",
    "rohu",
    "katla",
    "bhetki",
    "hilsa",
    "ilish",
    "sardine",
    "mackerel",
  ]);
  const variants = new Set([alias.toLowerCase(), normalized]);
  for (const part of [parts[0], parts.at(-1)]) {
    if (
      part &&
      usefulSingleWords.has(part) &&
      !(part === "cream" && normalized.includes("ice cream"))
    ) {
      variants.add(part);
    }
  }
  return [...variants].filter(Boolean);
}

function baseAliasIndex(): Map<string, string> {
  const index = new Map<string, string>();
  for (const ingredient of ingredientsSeed.ingredients) {
    const aliases = [
      ingredient.canonical_name,
      ingredient.display_name_en,
      ...(ingredient.aliases ?? []),
    ];
    for (const alias of aliases) {
      index.set(normalizeText(alias), ingredient.canonical_name);
      index.set(slugify(alias).replace(/-/g, " "), ingredient.canonical_name);
    }
  }

  const extra: Record<string, string> = {
    "red chilli powder": "red_chili_powder",
    "red chili powder": "red_chili_powder",
    "red chilli powder lal mirch": "red_chili_powder",
    "coriander dhania powder": "coriander_powder",
    "coriander powder dhania": "coriander_powder",
    "coriander powder": "coriander_powder",
    "coriander dhania leaves": "coriander_leaves",
    "coriander leaves": "coriander_leaves",
    "dhania leaves": "coriander_leaves",
    "cumin seeds jeera": "cumin",
    "cumin powder jeera": "cumin",
    "mustard seeds": "mustard_seeds",
    mustard: "mustard_seeds",
    "asafoetida hing": "asafoetida",
    hing: "asafoetida",
    "turmeric powder haldi": "turmeric",
    "turmeric powder": "turmeric",
    "garam masala powder": "garam_masala",
    "green chillies": "green_chili",
    "green chilli": "green_chili",
    "sunflower oil": "cooking_oil",
    oil: "cooking_oil",
    "virgin olive oil": "cooking_oil",
    "sesame oil": "cooking_oil",
    "rice cooked": "rice",
    "basmati rice": "rice",
    "whole wheat flour": "wheat_flour",
    atta: "wheat_flour",
    "gram flour besan": "besan",
    "sooji semolina rava": "semolina",
    "curd dahi yogurt": "yogurt",
    "curd": "yogurt",
    "hung curd greek yogurt": "yogurt",
    "potatoes aloo": "potato",
    potatoes: "potato",
    "tomatoes": "tomato",
    onions: "onion",
    "garlic cloves": "garlic",
    "ginger garlic paste": "ginger_garlic_paste",
    "green peas matar": "peas",
    "cauliflower gobi": "cauliflower",
    "brinjal baingan": "brinjal",
    "paneer homemade cottage cheese": "paneer",
    "whole egg": "egg",
    "whole eggs": "egg",
    "chicken breasts": "chicken",
    "chicken legs": "chicken",
    "mint leaves pudina": "mint_leaves",
    "curry leaves": "curry_leaves",
    "lemon juice": "lemon",
    "ragi flour finger millet nagli": "ragi",
    "ragi flour": "ragi",
    "ragi seeds": "ragi",
    "finger millet": "ragi",
    "fresh cream": "cream",
  };

  for (const [alias, canonical] of Object.entries(extra)) {
    index.set(normalizeText(alias), canonical);
  }

  return index;
}

const aliasIndex = baseAliasIndex();

function specialCanonical(normalized: string):
  | { canonical: string; display: string; category: string }
  | null {
  if (/\b(paneer|cottage cheese)\b/.test(normalized)) {
    return { canonical: "paneer", display: "Paneer", category: "dairy" };
  }
  if (/\b(tomato|tomatoes)\b/.test(normalized)) {
    return { canonical: "tomato", display: "Tomato", category: "vegetable" };
  }
  if (/\b(ragi|finger millet|nachni|nagli)\b/.test(normalized)) {
    return { canonical: "ragi", display: "Ragi / finger millet", category: "grain" };
  }
  if (/\b(fish|maach|machli|pomfret|surmai|rohu|katla|bhetki|hilsa|ilish)\b/.test(normalized)) {
    return { canonical: "fish", display: "Fish", category: "protein" };
  }
  if (/\bcream\b/.test(normalized) && !/\bice cream\b/.test(normalized)) {
    return { canonical: "cream", display: "Fresh cream", category: "dairy" };
  }
  return null;
}

function canonicalizeIngredient(raw: string): {
  canonical: string;
  display: string;
  alias: string;
  category: string;
} {
  const normalized = normalizeText(raw);
  const special = specialCanonical(normalized);
  if (special) {
    return {
      canonical: special.canonical,
      display: special.display,
      alias: raw.toLowerCase(),
      category: special.category,
    };
  }

  const canonical = aliasIndex.get(normalized);
  if (canonical) {
    const base = ingredientsSeed.ingredients.find(
      (ingredient) => ingredient.canonical_name === canonical,
    );
    return {
      canonical,
      display: base?.display_name_en ?? titleCase(normalized),
      alias: raw.toLowerCase(),
      category: base?.category ?? inferCategory(normalized),
    };
  }

  const slug = slugify(normalized || raw);
  return {
    canonical: slug,
    display: titleCase(normalized || raw),
    alias: raw.toLowerCase(),
    category: inferCategory(normalized),
  };
}

function inferCategory(value: string): string {
  if (/(chicken|fish|mutton|prawn|shrimp|egg|keema|meat)/.test(value)) {
    return "protein";
  }
  if (/(milk|curd|yogurt|paneer|cream|cheese|butter|ghee)/.test(value)) {
    return "dairy";
  }
  if (/(rice|flour|atta|rava|semolina|noodle|vermicelli|millet|poha|bread|oats)/.test(value)) {
    return "grain";
  }
  if (/(dal|lentil|bean|chana|chickpea|peas|rajma|sprout)/.test(value)) {
    return "pulse";
  }
  if (/(cumin|chilli|chili|turmeric|masala|pepper|mustard|methi|fenugreek|cardamom|clove|cinnamon|bay|saffron|tamarind|jaggery|sugar|salt)/.test(value)) {
    return "spice";
  }
  if (/(coriander|mint|curry leaves|basil|dill)/.test(value)) {
    return "herb";
  }
  if (/(lemon|mango|banana|apple|coconut|pomegranate|raisin|cashew|almond|peanut)/.test(value)) {
    return "fruit";
  }
  if (/(oil|water)/.test(value)) {
    return "staple";
  }
  return "vegetable";
}

function isIndianCuisine(cuisine: string): boolean {
  const c = cuisine.toLowerCase();
  const excluded = [
    "continental",
    "mexican",
    "italian",
    "thai",
    "chinese",
    "middle eastern",
    "mediterranean",
    "european",
  ];
  if (excluded.some((term) => c.includes(term))) return false;

  return [
    "indian",
    "andhra",
    "assamese",
    "awadhi",
    "bengali",
    "bihari",
    "chettinad",
    "coastal karnataka",
    "goan",
    "gujarati",
    "hyderabadi",
    "jain",
    "karnataka",
    "kashmiri",
    "kerala",
    "konkan",
    "lucknowi",
    "maharashtrian",
    "malabar",
    "malvani",
    "mangalorean",
    "mughlai",
    "odiya",
    "oriya",
    "punjabi",
    "rajasthani",
    "sindhi",
    "tamil",
    "udupi",
  ].some((term) => c.includes(term));
}

function mapRegion(cuisine: string): Region {
  const c = cuisine.toLowerCase();
  if (/(south|andhra|chettinad|karnataka|kerala|tamil|udupi|malabar|mangalorean|coastal)/.test(c)) {
    return "south";
  }
  if (/(bengal|bengali|assam|odiya|oriya)/.test(c)) return "east";
  if (/(maharashtra|maharashtrian|malvani|goan|konkan|gujarati|parsi|sindhi)/.test(c)) {
    return "west";
  }
  if (/(north|punjabi|rajasthani|awadhi|lucknowi|kashmiri|bihari|mughlai)/.test(c)) {
    return "north";
  }
  return "pan_india";
}

function mapMealType(course: string): MealType {
  const c = course.toLowerCase();
  if (/(breakfast|brunch)/.test(c)) return "breakfast";
  if (/(dinner)/.test(c)) return "dinner";
  if (/(snack|appetizer|starter|dessert|sweet|side|tea)/.test(c)) return "snack";
  return "lunch";
}

function mapDifficulty(minutes: number): Difficulty {
  if (minutes <= 30) return "easy";
  if (minutes <= 75) return "medium";
  return "hard";
}

function isVeg(row: RawRecipeRow): boolean {
  const text = `${row.Diet} ${row.TranslatedRecipeName} ${row["Cleaned-Ingredients"]}`.toLowerCase();
  if (/(non vegetarian|non-vegetarian|chicken|fish|mutton|prawn|shrimp|egg|meat|keema)/.test(text)) {
    return false;
  }
  return true;
}

function cleanRecipeName(name: string): string {
  return name
    .replace(/\s*\(recipe\)\s*$/i, "")
    .replace(/\s+recipe\s*-\s*/i, " - ")
    .replace(/\s+recipe$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchCsv(): Promise<string> {
  const response = await fetch(SOURCE_URL);
  if (!response.ok) {
    throw new Error(`Dataset download failed: ${response.status}`);
  }
  return response.text();
}

function buildRecipe(
  row: RawRecipeRow,
  existingSlugs: Set<string>,
  ingredientOutput: Map<string, IngredientSeed>,
): SeedRecipe | null {
  const sourceIngredientLines = splitList(row.TranslatedIngredients);
  const cleanedIngredients = splitList(row["Cleaned-Ingredients"]);
  const ingredientLines =
    sourceIngredientLines.length >= 3 ? sourceIngredientLines : cleanedIngredients;

  if (!row.TranslatedRecipeName || ingredientLines.length < 3 || !row.URL) {
    return null;
  }

  const name = cleanRecipeName(row.TranslatedRecipeName);
  const baseSlug = slugify(name);
  if (!baseSlug || existingSlugs.has(baseSlug)) return null;
  existingSlugs.add(baseSlug);

  const seenIngredients = new Set<string>();
  const ingredients = ingredientLines.flatMap((line) => {
    const raw = stripIngredientLine(line);
    const mapped = canonicalizeIngredient(raw);
    if (!mapped.canonical || seenIngredients.has(mapped.canonical)) return [];
    seenIngredients.add(mapped.canonical);

    if (!ingredientsSeed.ingredients.some((base) => base.canonical_name === mapped.canonical)) {
      const previous = ingredientOutput.get(mapped.canonical);
      ingredientOutput.set(mapped.canonical, {
        canonical_name: mapped.canonical,
        display_name_en: previous?.display_name_en ?? mapped.display,
        category: previous?.category ?? mapped.category,
        is_staple: mapped.category === "staple",
        aliases: [
          ...new Set([...(previous?.aliases ?? []), ...aliasVariants(mapped.alias)]),
        ],
        source_aliases: [
          ...new Set([
            ...(previous?.source_aliases ?? []),
            line.toLowerCase(),
            raw.toLowerCase(),
          ]),
        ],
      });
    }

    const quantity = line.slice(0, 160);
    const optional = /optional|garnish|for serving|for garnish/i.test(quantity ?? "");
    return {
      canonical: mapped.canonical,
      quantity: quantity || undefined,
      required: optional ? false : undefined,
    };
  });

  if (ingredients.length < 3) return null;

  const totalMinutes = Number.parseInt(row.TotalTimeInMins, 10);
  const prepTime = Number.isFinite(totalMinutes) && totalMinutes > 0 ? totalMinutes : 30;
  const sourceHost = new URL(row.URL).hostname.replace(/^www\./, "");

  return {
    slug: baseSlug,
    name,
    region: mapRegion(row.Cuisine),
    meal_type: mapMealType(row.Course),
    veg: isVeg(row),
    prep_time_min: Math.min(prepTime, 720),
    difficulty: mapDifficulty(prepTime),
    description: `${row.Cuisine || "Indian"}${row.Course ? ` ${row.Course}` : ""}. Sourced from ${sourceHost}.`,
    homemade_score: 7,
    source_url: row.URL,
    instructions: [
      {
        step: 1,
        text: "This recommendation is based on a sourced Indian recipe entry and the ingredient list below.",
      },
      {
        step: 2,
        text: `Open the original source for the exact cooking method: ${row.URL}`,
      },
    ],
    ingredients,
  };
}

async function main() {
  mkdirSync(generatedRoot, { recursive: true });

  console.log(`Downloading ${SOURCE_PAGE}`);
  const csv = await fetchCsv();
  const rows = toRecords(csv);
  const existingSlugs = new Set(recipeCatalog.map((recipe) => recipe.slug));
  const generatedIngredients = new Map<string, IngredientSeed>();
  const recipes: SeedRecipe[] = [];

  for (const row of rows) {
    if (recipes.length >= TARGET_RECIPE_COUNT) break;
    if (!isIndianCuisine(row.Cuisine)) continue;

    const recipe = buildRecipe(row, existingSlugs, generatedIngredients);
    if (recipe) recipes.push(recipe);
  }

  if (recipes.length < TARGET_RECIPE_COUNT) {
    throw new Error(
      `Only imported ${recipes.length} recipes; target was ${TARGET_RECIPE_COUNT}`,
    );
  }

  const generatedAt = new Date().toISOString();
  const recipeFile = join(generatedRoot, "expanded-recipes.json");
  const ingredientFile = join(generatedRoot, "expanded-ingredients.json");

  writeFileSync(
    recipeFile,
    `${JSON.stringify(
      {
        source: SOURCE_PAGE,
        source_file: SOURCE_URL,
        generated_at: generatedAt,
        note:
          "Recipe names, ingredient lists, metadata, and source URLs are imported from the sourced dataset. Exact method text remains at the original source URL.",
        recipes,
      },
      null,
      2,
    )}\n`,
  );

  writeFileSync(
    ingredientFile,
    `${JSON.stringify(
      {
        source: SOURCE_PAGE,
        source_file: SOURCE_URL,
        generated_at: generatedAt,
        ingredients: [...generatedIngredients.values()].sort((a, b) =>
          a.canonical_name.localeCompare(b.canonical_name),
        ),
      },
      null,
      2,
    )}\n`,
  );

  console.log(`Imported ${recipes.length} recipes`);
  console.log(`Added ${generatedIngredients.size} ingredient aliases/canonicals`);
  console.log(`Wrote ${recipeFile}`);
  console.log(`Wrote ${ingredientFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
