import Link from "next/link";
import { ArrowUpRight, Clock, Leaf, ListChecks, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { RecommendationResult } from "@/lib/utils/types";

interface RecipeCardProps {
  result: RecommendationResult;
  pantryIds: string;
}

export function RecipeCard({ result, pantryIds }: RecipeCardProps) {
  const { recipe, score, matched, missing_required, can_cook_now } = result;
  const missingCount = missing_required.length;
  const matchPercent = Math.round(score * 100);

  return (
    <Link
      href={`/recipe/${recipe.slug}?pantry=${pantryIds}`}
      className="group block h-full rounded-[1.5rem] border border-border bg-card/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-md"
    >
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3 text-accent" />
              {matched.length} pantry hits
            </div>
            <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground">
              {recipe.name}
            </h3>
            {recipe.name_hi && (
              <p className="mt-1 text-sm text-muted-foreground">{recipe.name_hi}</p>
            )}
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-background text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {can_cook_now ? (
            <Badge variant="success">Ready</Badge>
          ) : (
            <Badge variant="outline">{missingCount} missing</Badge>
          )}
          {recipe.veg && (
            <Badge variant="outline" className="gap-1 text-green-800">
              <Leaf className="h-3 w-3" /> Veg
            </Badge>
          )}
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            {recipe.prep_time_min} min
          </Badge>
        </div>

        <div className="mt-auto space-y-3">
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${matchPercent}%` }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 font-medium text-foreground">
              <ListChecks className="h-3.5 w-3.5 text-primary" />
              {matchPercent}% match
            </span>
            <span className="capitalize">{recipe.region.replace("_", " ")}</span>
            <span className="capitalize">{recipe.difficulty}</span>
          </div>
          {missingCount > 0 && (
            <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">
              Need: {missing_required.map((m) => m.display_name_en).join(", ")}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
