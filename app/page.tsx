"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  CookingPot,
  Leaf,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import { IngredientInput } from "@/components/ingredients/ingredient-input";

const sampleIngredients = ["aloo", "pyaz", "tamatar", "dahi", "chawal", "anda"];
const highlights = [
  { label: "1600+", text: "Indian dishes" },
  { label: "700+", text: "ingredient names" },
  { label: "20", text: "ranked ideas" },
];

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

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-5 shadow-sm sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              AI-native pantry matching, Indian at heart
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.04] tracking-tight text-foreground sm:text-6xl">
                Open the fridge. Rasoi finds the next dish.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Add one ingredient or the whole pantry. The app ranks real
                Indian recipes by what you already have, what is missing, and
                what is practical to cook today.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-border bg-background/86 p-3 shadow-sm sm:p-4">
              <IngredientInput onSubmit={handleSubmit} loading={loading} />
              {error && (
                <p className="mt-4 text-sm text-red-700" role="alert">
                  {error}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {sampleIngredients.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="rounded-full border border-border bg-card/85 px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:border-primary/60 hover:text-foreground"
                  onClick={() => handleSubmit([item])}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-border bg-foreground p-5 text-primary-foreground shadow-sm sm:col-span-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-primary-foreground/70">Today mode</p>
                  <h2 className="mt-2 text-2xl font-semibold">From pantry to plate</h2>
                </div>
                <CookingPot className="h-7 w-7 text-accent" />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {highlights.map((item) => (
                  <div key={item.text} className="rounded-2xl bg-white/8 p-3">
                    <p className="text-xl font-semibold">{item.label}</p>
                    <p className="mt-1 text-xs text-primary-foreground/65">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="rounded-[1.5rem] border border-border bg-secondary/55 p-5 text-left transition hover:border-primary/50"
              onClick={() => handleSubmit(["rice", "egg", "onion", "tomato"])}
            >
              <Leaf className="h-5 w-5 text-green-800" />
              <h2 className="mt-4 font-semibold">Thicker search</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Rice, egg, onion, tomato ranks fuller meals over plain staples.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Try it <ArrowRight className="h-4 w-4" />
              </span>
            </button>

            <div className="rounded-[1.5rem] border border-border bg-card/85 p-5">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="mt-4 font-semibold">Practical scoring</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Ready dishes, shorter prep, and easy methods get a quiet boost.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-green-900">
                <CheckCircle2 className="h-4 w-4" />
                Built for weekday cooking
              </div>
            </div>
          </div>
        </div>
      </section>

      {starDish && (
        <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.5rem] border border-border bg-foreground p-5 text-primary-foreground shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-primary-foreground/75">
              <Star className="h-4 w-4 fill-accent text-accent" />
              Aaj Ki Star Dish
            </div>
            <h2 className="mt-4 text-2xl font-semibold leading-tight">
              {starDish.recipe.name}
            </h2>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-primary-foreground/70">
              {starDish.description ??
                "A daily pick from Rasoi's Indian recipe catalog."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white/10 px-2.5 py-1 capitalize">
                {starDish.recipe.region.replace("_", " ")}
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-1">
                {starDish.recipe.prep_time_min} min
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-1">
                {starDish.recipe.veg ? "Veg" : "Non-veg"}
              </span>
            </div>
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent"
              onClick={() => router.push(`/recipe/${starDish.recipe.slug}`)}
            >
              Open star dish <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="rounded-[1.5rem] border border-border bg-card/85 p-5 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">
              Star pantry signals
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {starDish.ingredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-sm"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="grid gap-3 md:grid-cols-3">
        {[
          ["Normalize", "Hindi, English, regional names, and fuzzy spellings."],
          ["Rank", "Uses pantry overlap, missing items, prep time, and staples."],
          ["Cook", "Open the recipe, see ingredients, substitutions, and method source."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-[1.25rem] border border-border bg-card/80 p-5 shadow-sm">
            <Search className="h-4 w-4 text-primary" />
            <h2 className="mt-3 font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
