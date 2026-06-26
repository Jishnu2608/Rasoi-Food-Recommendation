"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Leaf,
  Orbit,
  Star,
} from "lucide-react";
import { IngredientInput } from "@/components/ingredients/ingredient-input";
import { RecipeSubmissionForm } from "@/components/contact/recipe-submission-form";
import { Button } from "@/components/ui/button";

const sampleIngredients = ["aloo", "pyaz", "tamatar", "dahi", "chawal", "anda"];

function formatCount(value: number | null) {
  if (value === null) return "...";
  if (value >= 1000) return `${(Math.floor(value / 100) / 10).toFixed(1)}k+`;
  if (value >= 100) return `${Math.floor(value / 100) * 100}+`;
  return `${value}`;
}

interface StarDish {
  recipe: {
    slug: string;
    name: string;
    region: string;
    veg: boolean;
    prep_time_min: number;
  };
  description: string | null;
  ingredients: string[];
}

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [starDish, setStarDish] = useState<StarDish | null>(null);
  const [catalogStats, setCatalogStats] = useState<{
    recipeCount: number | null;
    ingredientCount: number | null;
  }>({
    recipeCount: null,
    ingredientCount: null,
  });

  useEffect(() => {
    async function loadStarDish() {
      try {
        const res = await fetch("/api/todays-star");
        if (res.ok) setStarDish(await res.json());
      } catch {
        setStarDish(null);
      }
    }
    void loadStarDish();
  }, []);

  useEffect(() => {
    async function loadCatalogStats() {
      try {
        const res = await fetch("/api/catalog/stats");
        if (!res.ok) return;
        const data = (await res.json()) as {
          recipe_count?: number;
          ingredient_count?: number;
        };
        setCatalogStats({
          recipeCount: data.recipe_count ?? null,
          ingredientCount: data.ingredient_count ?? null,
        });
      } catch {
        setCatalogStats({ recipeCount: null, ingredientCount: null });
      }
    }
    void loadCatalogStats();
  }, []);

  const handleSubmit = async (ingredients: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const q = encodeURIComponent(ingredients.join(","));
      router.push(`/recommend?q=${q}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const highlights = [
    { label: formatCount(catalogStats.recipeCount), text: "Indian dishes" },
    {
      label: formatCount(catalogStats.ingredientCount),
      text: "ingredient names",
    },
    { label: "20", text: "ranked ideas" },
  ];

  return (
    <div className="rasoi-page space-y-8">
      <section className="premium-panel relative p-5 sm:p-8 lg:p-10">
        <div className="hero-orb right-[8%] top-[6%] hidden h-20 w-20 sm:block" aria-hidden />
        <div className="hero-orb bottom-[10%] right-[14%] hidden h-14 w-14 md:block" aria-hidden />

        <div className="relative z-10 space-y-8">
          {starDish && (
            <div className="premium-card flex flex-col gap-4 bg-strong p-4 text-strong-foreground sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-strong-foreground/75">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden />
                  Aaj Ki Star Dish
                </div>
                <h2 className="mt-1.5 truncate text-xl font-semibold sm:text-2xl">
                  {starDish.recipe.name}
                </h2>
                <p className="mt-1 line-clamp-2 text-sm text-strong-foreground/75">
                  {starDish.description ??
                    "A daily pick from Rasoi's Indian recipe catalog."}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="chip-on-strong px-2.5 py-1 text-xs capitalize">
                    {starDish.recipe.region.replace("_", " ")}
                  </span>
                  <span className="chip-on-strong px-2.5 py-1 text-xs">
                    {starDish.recipe.prep_time_min} min
                  </span>
                  <span className="chip-on-strong px-2.5 py-1 text-xs">
                    {starDish.recipe.veg ? "Veg" : "Non-veg"}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                <div className="flex flex-wrap gap-1.5">
                  {starDish.ingredients.slice(0, 5).map((ingredient) => (
                    <span
                      key={ingredient}
                      className="chip-on-strong px-2.5 py-1 text-xs"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-strong-foreground/10 text-strong-foreground hover:bg-strong-foreground/20"
                  onClick={() => router.push(`/recipe/${starDish.recipe.slug}`)}
                >
                  Open star dish
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-10">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-muted-foreground">
                <span className="alive-dot h-2 w-2 rounded-full" aria-hidden />
                Turn ingredients into possibilities
              </div>

              <div className="space-y-3">
                <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Open the fridge.
                  <span className="block text-primary">
                    Let Rasoi compose dinner.
                  </span>
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  Add one ingredient or the whole pantry. The app ranks real
                  Indian recipes by what you already have, what is missing, and
                  what is practical to cook today.
                </p>
              </div>

              <div className="surface-glass rounded-2xl p-3 sm:p-4">
                <IngredientInput onSubmit={handleSubmit} loading={loading} />
                {error && (
                  <p className="mt-3 text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {sampleIngredients.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="kinetic-chip rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => handleSubmit([item])}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="premium-card bg-strong p-5 text-strong-foreground sm:col-span-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-strong-foreground/70">
                      Live pantry intelligence
                    </p>
                    <h2 className="mt-1 text-xl font-semibold sm:text-2xl">
                      From shelf to story
                    </h2>
                  </div>
                  <Orbit className="h-6 w-6 shrink-0 text-accent" aria-hidden />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {highlights.map((item) => (
                    <div key={item.text} className="stat-on-strong">
                      <p className="text-lg font-semibold sm:text-xl">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs text-strong-foreground/65">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="premium-card bg-secondary/60 p-5 text-left"
                onClick={() => handleSubmit(["rice", "egg", "onion", "tomato"])}
              >
                <Leaf className="h-5 w-5 text-success" aria-hidden />
                <h2 className="mt-3 font-semibold text-foreground">
                  Thicker search
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Rice, egg, onion, tomato ranks fuller meals over plain
                  staples.
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Try it <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </button>

              <div className="premium-card p-5">
                <Clock className="h-5 w-5 text-primary" aria-hidden />
                <h2 className="mt-3 font-semibold text-foreground">
                  Practical scoring
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Ready dishes, shorter prep, and easy methods get a quiet
                  boost.
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm font-medium text-success">
                  <CheckCircle2 className="h-4 w-4" aria-hidden />
                  Built for weekday cooking
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RecipeSubmissionForm />
    </div>
  );
}
