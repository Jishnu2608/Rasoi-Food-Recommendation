"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Clock, CookingPot, Leaf, Search } from "lucide-react";
import { IngredientInput } from "@/components/ingredients/ingredient-input";

const sampleIngredients = ["aloo", "pyaz", "tamatar", "dahi", "chawal", "anda"];
const highlights = [
  { label: "1600+", text: "sourced recipes" },
  { label: "700+", text: "known ingredients" },
  { label: "20", text: "smart matches" },
];

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      <section className="space-y-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            <Search className="h-3.5 w-3.5 text-primary" />
            Pantry-first Indian cooking
          </div>
          <div className="space-y-3">
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Tell Rasoi what is in your kitchen.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Add one ingredient or a full pantry list. Rasoi finds realistic
              homemade dishes from the catalog and shows what is ready, close,
              or missing.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 shadow-sm sm:p-5">
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
              className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:border-primary/60 hover:text-foreground"
              onClick={() => handleSubmit([item])}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/12 text-primary">
              <CookingPot className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-semibold">Kitchen logic</h2>
              <p className="text-sm text-muted-foreground">
                Common dry spices and aromatics are treated as home basics.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {highlights.map((item) => (
              <div
                key={item.text}
                className="rounded-md border border-border bg-background px-3 py-3"
              >
                <p className="text-xl font-bold text-primary">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-secondary/45 p-5">
          <div className="flex gap-3">
            <Leaf className="mt-0.5 h-5 w-5 text-green-800" />
            <div>
              <h2 className="font-semibold">Try a thicker search</h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                `rice, egg, onion, tomato` now ranks fuller dishes above plain
                rice when those ingredients can make a better meal.
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                onClick={() => handleSubmit(["rice", "egg", "onion", "tomato"])}
              >
                Use this pantry <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-dashed border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 text-primary" />
          Short prep and easy recipes get a practical boost.
        </div>
      </aside>
    </div>
  );
}
