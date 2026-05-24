"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { RecipeCard } from "@/components/recipes/recipe-card";
import type {
  IngredientRef,
  RecommendationResult,
} from "@/lib/utils/types";
import { Button } from "@/components/ui/button";

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

    const ingredients = q.split(",").map((s) => decodeURIComponent(s.trim())).filter(Boolean);

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
        setError("Network error. Check Supabase configuration.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [q]);

  const pantryIds = pantry.map((p) => p.id).join(",");

  if (loading) {
    return <p className="text-muted-foreground">Matching recipes…</p>;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="text-red-700">{error}</p>
        <Button variant="outline" asChild>
          <Link href="/">Back home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Aaj ke liye yeh dishes</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Using: {pantry.map((p) => p.display_name_en).join(", ") || "—"}
        </p>
        {unmatched.length > 0 && (
          <p className="mt-1 text-sm text-amber-800">
            Not recognized: {unmatched.join(", ")}
          </p>
        )}
      </div>

      {explanation && (
        <div className="rounded-xl border border-border bg-secondary/50 p-4 text-sm">
          {explanation}
        </div>
      )}

      {results.length === 0 ? (
        <p className="text-muted-foreground">
          No strong matches yet. Try more common ingredients or check spelling.
        </p>
      ) : (
        <ul className="space-y-3">
          {results.map((r) => (
            <li key={r.recipe.id}>
              <RecipeCard result={r} pantryIds={pantryIds} />
            </li>
          ))}
        </ul>
      )}

      <Button variant="ghost" asChild>
        <Link href="/">← Change ingredients</Link>
      </Button>
    </div>
  );
}

export default function RecommendPage() {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Loading…</p>}>
      <RecommendContent />
    </Suspense>
  );
}
