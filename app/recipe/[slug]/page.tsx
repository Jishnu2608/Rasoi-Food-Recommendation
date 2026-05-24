"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Recipe, RecipeIngredientRow, RecipeStep } from "@/lib/utils/types";

interface RecipeDetailResponse {
  recipe: Recipe;
  ingredients: (RecipeIngredientRow & {
    ingredient: { display_name_en: string; display_name_hi: string | null };
  })[];
  match: {
    can_cook_now: boolean;
    missing_required: { display_name_en: string }[];
    missing_optional: { display_name_en: string }[];
    assumed_staples: string[];
  } | null;
  substitutions: {
    missing: { display_name_en: string };
    substitute: { display_name_en: string };
    ratio_note: string | null;
  }[];
}

function RecipeDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const pantry = searchParams.get("pantry") ?? "";

  const [data, setData] = useState<RecipeDetailResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const url = `/api/recipes/${slug}${pantry ? `?pantry=${pantry}` : ""}`;
      const res = await fetch(url);
      if (!res.ok) {
        setError("Recipe not found.");
        return;
      }
      setData(await res.json());
    }
    void load();
  }, [slug, pantry]);

  if (error) {
    return (
      <div className="space-y-4">
        <p>{error}</p>
        <Button variant="outline" asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>
    );
  }

  if (!data) {
    return <p className="text-muted-foreground">Loading recipe…</p>;
  }

  const { recipe, ingredients, match, substitutions } = data;
  const steps = recipe.instructions as RecipeStep[];

  return (
    <article className="space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-2 -ml-2">
          <Link href={pantry ? `/recommend?q=${encodeURIComponent(getLastQuery())}` : "/"}>
            ← Back
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{recipe.name}</h1>
        {recipe.name_hi && (
          <p className="text-muted-foreground">{recipe.name_hi}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {match?.can_cook_now && <Badge variant="success">Ready to cook</Badge>}
          {recipe.veg && (
            <Badge variant="outline" className="gap-1">
              <Leaf className="h-3 w-3" /> Veg
            </Badge>
          )}
          <Badge variant="secondary">
            <Clock className="mr-1 inline h-3 w-3" />
            {recipe.prep_time_min} min
          </Badge>
          <Badge variant="outline" className="capitalize">
            {recipe.region.replace("_", " ")}
          </Badge>
        </div>
        {recipe.description && (
          <p className="mt-3 text-muted-foreground">{recipe.description}</p>
        )}
      </div>

      {match && (
        <section className="rounded-xl border border-border bg-muted/30 p-4 text-sm">
          {!match.can_cook_now && match.missing_required.length > 0 && (
            <p>
              <span className="font-medium">Missing: </span>
              {match.missing_required.map((m) => m.display_name_en).join(", ")}
            </p>
          )}
          {match.assumed_staples.length > 0 && (
            <p className="mt-1 text-muted-foreground">
              Assumed at home: {match.assumed_staples.join(", ")}
            </p>
          )}
          {substitutions.length > 0 && (
            <ul className="mt-2 space-y-1">
              {substitutions.map((s, i) => (
                <li key={i}>
                  Use <strong>{s.substitute.display_name_en}</strong> instead of{" "}
                  {s.missing.display_name_en}
                  {s.ratio_note && ` — ${s.ratio_note}`}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold">Ingredients</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {ingredients.map((row) => (
            <li key={row.id} className="flex gap-2">
              <span>{row.ingredient.display_name_en}</span>
              {row.quantity_text && (
                <span className="text-muted-foreground">({row.quantity_text})</span>
              )}
              {!row.is_required && (
                <span className="text-xs text-muted-foreground">(optional)</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Method</h2>
        <ol className="mt-2 list-decimal space-y-3 pl-5 text-sm leading-relaxed">
          {steps.map((s) => (
            <li key={s.step}>{s.text}</li>
          ))}
        </ol>
      </section>
    </article>
  );
}

function getLastQuery(): string {
  if (typeof window === "undefined") return "";
  try {
    const raw = sessionStorage.getItem("rasoi:lastSearch");
    if (!raw) return "";
    const parsed = JSON.parse(raw) as { ingredients?: string[] };
    return (parsed.ingredients ?? []).join(",");
  } catch {
    return "";
  }
}

export default function RecipePage() {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Loading…</p>}>
      <RecipeDetailContent />
    </Suspense>
  );
}
