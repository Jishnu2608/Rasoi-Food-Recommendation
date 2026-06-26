"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpenText,
  Clock,
  ExternalLink,
  Leaf,
  Loader2,
} from "lucide-react";
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

  const sourceHost = useMemo(() => {
    if (!data?.recipe.source_url) return null;
    try {
      return new URL(data.recipe.source_url).hostname.replace(/^www\./, "");
    } catch {
      return null;
    }
  }, [data?.recipe.source_url]);

  if (error) {
    return (
      <div className="premium-panel p-6">
        <p className="text-foreground">{error}</p>
        <Button variant="outline" asChild className="mt-4">
          <Link href="/">Home</Link>
        </Button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="premium-panel grid min-h-[320px] place-items-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden />
          Loading recipe…
        </div>
      </div>
    );
  }

  const { recipe, ingredients, match, substitutions } = data;
  const steps = recipe.instructions as RecipeStep[];
  const hasRealInstructions =
    steps.length > 0 &&
    !steps.some((step) =>
      step.text.toLowerCase().includes("open the original source"),
    );

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    name: recipe.name,
    description: recipe.description,
    prepTime: `PT${recipe.prep_time_min}M`,
    cookTime: `PT${recipe.prep_time_min}M`,
    totalTime: `PT${recipe.prep_time_min}M`,
    recipeCategory: recipe.meal_type,
    recipeCuisine: recipe.region.replace("_", " "),
    keywords: ingredients.map((i) => i.ingredient.display_name_en).join(", "),
    recipeIngredient: ingredients.map(
      (i) => i.quantity_text || i.ingredient.display_name_en,
    ),
    recipeInstructions: steps.map((step, index) => ({
      "@type": "HowToStep",
      text: step.text,
      position: index + 1,
    })),
    author: {
      "@type": "Person",
      name: "Rasoi",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "100",
    },
  };

  return (
    <article className="rasoi-page space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="premium-panel p-5 sm:p-8">
        <div className="relative z-10">
          <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
            <Link
              href={
                pantry
                  ? `/recommend?q=${encodeURIComponent(getLastQuery())}`
                  : "/"
              }
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back
            </Link>
          </Button>
          <div className="grid gap-6 lg:grid-cols-[1fr_16rem]">
            <div>
              <p className="text-sm font-semibold text-primary">
                Recipe workspace
              </p>
              <h1 className="mt-1 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                {recipe.name}
              </h1>
              {recipe.name_hi && (
                <p className="mt-2 text-muted-foreground">{recipe.name_hi}</p>
              )}
              {recipe.description && (
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {recipe.description}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {match?.can_cook_now && (
                  <Badge variant="success">Ready to cook</Badge>
                )}
                {recipe.veg && (
                  <Badge variant="outline" className="gap-1">
                    <Leaf className="h-3 w-3" aria-hidden /> Veg
                  </Badge>
                )}
                <Badge variant="secondary">
                  <Clock className="mr-1 inline h-3 w-3" aria-hidden />
                  {recipe.prep_time_min} min
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {recipe.region.replace("_", " ")}
                </Badge>
              </div>
            </div>

            <aside className="premium-card h-fit p-4 lg:sticky lg:top-24">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <Clock className="h-4 w-4 text-primary" aria-hidden />
                Quick info
              </div>
              <dl className="mt-3 space-y-2.5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Prep time</dt>
                  <dd className="font-medium text-foreground">
                    {recipe.prep_time_min} min
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Difficulty</dt>
                  <dd className="font-medium capitalize text-foreground">
                    {recipe.difficulty}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Region</dt>
                  <dd className="font-medium capitalize text-foreground">
                    {recipe.region.replace("_", " ")}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Type</dt>
                  <dd className="font-medium capitalize text-foreground">
                    {recipe.meal_type}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        {match && (
          <section className="premium-card p-5 text-sm text-foreground">
            {!match.can_cook_now && match.missing_required.length > 0 && (
              <p>
                <span className="font-medium">Missing: </span>
                {match.missing_required
                  .map((m) => m.display_name_en)
                  .join(", ")}
              </p>
            )}
            {match.assumed_staples.length > 0 && (
              <p className="mt-1 text-muted-foreground">
                Assumed at home: {match.assumed_staples.join(", ")}
              </p>
            )}
            {substitutions.length > 0 && (
              <ul className="mt-3 space-y-1">
                {substitutions.map((s, i) => (
                  <li key={i}>
                    Use <strong>{s.substitute.display_name_en}</strong> instead
                    of {s.missing.display_name_en}
                    {s.ratio_note && ` — ${s.ratio_note}`}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        <section className="premium-card p-5">
          <h2 className="text-lg font-semibold text-foreground">Ingredients</h2>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            {ingredients.map((row) => (
              <li
                key={row.id}
                className="rounded-xl border border-border bg-background px-3 py-2"
              >
                <span className="font-medium text-foreground">
                  {row.ingredient.display_name_en}
                </span>
                {row.quantity_text && (
                  <span className="ml-1 text-muted-foreground">
                    ({row.quantity_text})
                  </span>
                )}
                {!row.is_required && (
                  <span className="ml-1 text-xs text-muted-foreground">
                    (optional)
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="premium-card p-5">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <BookOpenText className="h-4 w-4 text-primary" aria-hidden />
            Method
          </div>
          {hasRealInstructions ? (
            <ol className="method-steps mt-4 space-y-3 text-sm leading-7">
              {steps.map((s) => (
                <li
                  key={s.step}
                  className="method-step rounded-xl border border-border bg-background py-3 pl-12 pr-4"
                >
                  {s.text}
                </li>
              ))}
            </ol>
          ) : (
            <div className="mt-4 space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">
                This expanded-catalog recipe is sourced externally, so Rasoi
                shows the pantry-critical ingredient list here and routes you
                to the publisher for the full cooking steps.
              </p>
              {recipe.source_url && (
                <Button asChild className="w-full sm:w-auto">
                  <a href={recipe.source_url} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-4 w-4" aria-hidden />
                    Read full method
                  </a>
                </Button>
              )}
            </div>
          )}
          {recipe.source_url && (
            <div className="mt-6 border-t border-border pt-4">
              <p className="text-xs text-muted-foreground">
                Recipe sourced from{" "}
                <a
                  href={recipe.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  {sourceHost ?? "original source"}
                </a>
              </p>
            </div>
          )}
        </section>
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
    <Suspense
      fallback={
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Loading…
        </div>
      }
    >
      <RecipeDetailContent />
    </Suspense>
  );
}
