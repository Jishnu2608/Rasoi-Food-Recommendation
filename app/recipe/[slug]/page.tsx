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
  ShieldCheck,
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
      <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
        <p>{error}</p>
        <Button variant="outline" asChild className="mt-4">
          <Link href="/">Home</Link>
        </Button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="grid min-h-[360px] place-items-center rounded-[2rem] border border-border bg-card">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          Loading recipe...
        </div>
      </div>
    );
  }

  const { recipe, ingredients, match, substitutions } = data;
  const steps = recipe.instructions as RecipeStep[];
  const hasRealInstructions = steps.length > 0 && !steps.some((step) =>
    step.text.toLowerCase().includes("open the original source"),
  );

  return (
    <article className="space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-5 shadow-sm sm:p-7">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative">
          <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
            <Link href={pantry ? `/recommend?q=${encodeURIComponent(getLastQuery())}` : "/"}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
            <div>
              <p className="text-sm font-medium text-primary">Recipe workspace</p>
              <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                {recipe.name}
              </h1>
              {recipe.name_hi && (
                <p className="mt-2 text-muted-foreground">{recipe.name_hi}</p>
              )}
              {recipe.description && (
                <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {recipe.description}
                </p>
              )}
              <div className="mt-5 flex flex-wrap gap-2">
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
            </div>

            {/* <div className="rounded-[1.5rem] border border-border bg-background/80 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Method source
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Rasoi keeps ingredients and pantry matching in-app. When a
                recipe comes from another publisher, the full method remains
                with the original source to avoid copying copyrighted text.
              </p>
              {recipe.source_url && (
                <Button variant="outline" size="sm" asChild className="mt-4 w-full">
                  <a href={recipe.source_url} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Open {sourceHost ?? "source"} method
                  </a>
                </Button>
              )}
            </div> */}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          {match && (
            <section className="rounded-[1.5rem] border border-border bg-card/90 p-5 text-sm shadow-sm">
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
                <ul className="mt-3 space-y-1">
                  {substitutions.map((s, i) => (
                    <li key={i}>
                      Use <strong>{s.substitute.display_name_en}</strong> instead of{" "}
                      {s.missing.display_name_en}
                      {s.ratio_note && ` - ${s.ratio_note}`}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          <section className="rounded-[1.5rem] border border-border bg-card/90 p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Ingredients</h2>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {ingredients.map((row) => (
                <li
                  key={row.id}
                  className="rounded-2xl border border-border bg-background/80 px-3 py-2"
                >
                  <span className="font-medium">{row.ingredient.display_name_en}</span>
                  {row.quantity_text && (
                    <span className="ml-1 text-muted-foreground">({row.quantity_text})</span>
                  )}
                  {!row.is_required && (
                    <span className="ml-1 text-xs text-muted-foreground">(optional)</span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[1.5rem] border border-border bg-card/90 p-5 shadow-sm">
            <div className="flex items-center gap-2 font-semibold">
              <BookOpenText className="h-4 w-4 text-primary" />
              Method
            </div>
            {hasRealInstructions ? (
              <ol className="mt-4 list-decimal space-y-4 pl-5 text-sm leading-7">
                {steps.map((s) => (
                  <li key={s.step} className="pl-2">{s.text}</li>
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
                  <Button asChild className="w-full">
                    <a href={recipe.source_url} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Read full method
                    </a>
                  </Button>
                )}
              </div>
            )}
            {recipe.source_url && (
              <div className="mt-6 pt-4 border-t border-border">
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
        </div>

        <aside className="space-y-4">
          <section className="rounded-[1.5rem] border border-border bg-card/90 p-5 shadow-sm">
            <div className="flex items-center gap-2 font-semibold">
              <Clock className="h-4 w-4 text-primary" />
              Quick Info
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Prep time</span>
                <span className="font-medium">{recipe.prep_time_min} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Difficulty</span>
                <span className="font-medium capitalize">{recipe.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Region</span>
                <span className="font-medium capitalize">{recipe.region.replace("_", " ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium capitalize">{recipe.meal_type}</span>
              </div>
            </div>
          </section>
        </aside>
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
    <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
      <RecipeDetailContent />
    </Suspense>
  );
}
