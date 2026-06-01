"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2, SearchX, ShoppingBasket } from "lucide-react";
import { RecipeCard } from "@/components/recipes/recipe-card";
import type {
  IngredientRef,
  RecommendationResult,
} from "@/lib/utils/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function RecommendContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pantry, setPantry] = useState<IngredientRef[]>([]);
  const [unmatched, setUnmatched] = useState<string[]>([]);
  const [results, setResults] = useState<RecommendationResult[]>([]);
  const [explanation, setExplanation] = useState<string | null>(null);

  useEffect(() => {
    if (!q) {
      setLoading(false);
      setError("No ingredients provided.");
      return;
    }

    const ingredients = q
      .split(",")
      .map((s) => decodeURIComponent(s.trim()))
      .filter(Boolean);

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Could not load recommendations.");
          return;
        }
        setPantry(data.pantry ?? []);
        setUnmatched(data.unmatched ?? []);
        setResults(data.results ?? []);
        sessionStorage.setItem(
          "rasoi:lastSearch",
          JSON.stringify({ ingredients, pantry: data.pantry, results: data.results }),
        );

        if (process.env.NEXT_PUBLIC_AI_ENABLED === "true" && data.results?.length) {
          const aiRes = await fetch("/api/ai/explain", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              pantry: data.pantry,
              results: data.results.slice(0, 5),
            }),
          });
          if (aiRes.ok) {
            const ai = await aiRes.json();
            setExplanation(ai.explanation ?? null);
          }
        }
      } catch {
        setError("Network error. Check the app configuration.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [q]);

  const pantryIds = pantry.map((p) => p.id).join(",");
  const readyCount = useMemo(
    () => results.filter((result) => result.can_cook_now).length,
    [results],
  );

  if (loading) {
    return (
      <div className="grid min-h-[420px] place-items-center rounded-[2rem] border border-border bg-card/90">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          Matching recipes from your pantry...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
        <p className="text-destructive">{error}</p>
        <Button variant="outline" asChild className="mt-4">
          <Link href="/">Back home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4">
            <Button variant="ghost" size="sm" asChild className="-ml-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Change ingredients
              </Link>
            </Button>
            <div>
              <p className="text-sm font-medium text-primary">Rasoi ranked your pantry</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Aaj ke liye yeh dishes
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {results.length} matches from {pantry.length} recognized ingredients
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {pantry.map((p) => (
                <Badge key={p.id} variant="secondary" className="bg-background">
                  {p.display_name_en}
                </Badge>
              ))}
              {pantry.length === 0 && (
                <span className="text-sm text-muted-foreground">No recognized pantry items</span>
              )}
            </div>
            {unmatched.length > 0 && (
              <p className="text-sm text-warning">
                Not recognized: {unmatched.join(", ")}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-72">
            <div className="rounded-[1.25rem] border border-border bg-background/85 p-4">
              <p className="text-3xl font-semibold text-primary">{readyCount}</p>
              <p className="text-xs text-muted-foreground">ready now</p>
            </div>
            <div className="rounded-[1.25rem] border border-border bg-background/85 p-4">
              <p className="text-3xl font-semibold text-primary">{results.length}</p>
              <p className="text-xs text-muted-foreground">ranked ideas</p>
            </div>
          </div>
        </div>
      </section>

      {explanation && (
        <div className="rounded-[1.5rem] border border-border bg-secondary/45 p-4 text-sm leading-6 shadow-sm">
          {explanation}
        </div>
      )}

      {results.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-border bg-muted/45 p-8 text-center">
          <SearchX className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-3 font-semibold">No recipe match yet</h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Try a common pantry item like aloo, rice, dahi, egg, onion, tomato,
            or besan.
          </p>
        </div>
      ) : (
        <>
          {readyCount > 0 && (
            <div className="flex items-center gap-2 text-sm font-medium text-success">
              <CheckCircle2 className="h-4 w-4" />
              Ready dishes are shown first, then close matches.
            </div>
          )}
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {results.map((r) => (
              <li key={r.recipe.id}>
                <RecipeCard result={r} pantryIds={pantryIds} />
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="flex items-center gap-2 rounded-[1.25rem] border border-border bg-card/85 px-4 py-3 text-sm text-muted-foreground">
        <ShoppingBasket className="h-4 w-4 text-primary" />
        Missing items are shown so you can decide whether to substitute or skip.
      </div>
    </div>
  );
}

export default function RecommendPage() {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
      <RecommendContent />
    </Suspense>
  );
}
