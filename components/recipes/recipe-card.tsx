import Link from "next/link";
import { Clock, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { RecommendationResult } from "@/lib/utils/types";

interface RecipeCardProps {
  result: RecommendationResult;
  pantryIds: string;
}

export function RecipeCard({ result, pantryIds }: RecipeCardProps) {
  const { recipe, score, missing_required, can_cook_now } = result;
  const missingCount = missing_required.length;

  return (
    <Link
      href={`/recipe/${recipe.slug}?pantry=${pantryIds}`}
      className="block rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{recipe.name}</h3>
          {recipe.name_hi && (
            <p className="text-sm text-muted-foreground">{recipe.name_hi}</p>
          )}
        </div>
        {can_cook_now ? (
          <Badge variant="success">Ban sakta hai</Badge>
        ) : (
          <Badge variant="outline">{missingCount} missing</Badge>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {recipe.prep_time_min} min
        </span>
        <span>·</span>
        <span className="capitalize">{recipe.region.replace("_", " ")}</span>
        <span>·</span>
        <span className="capitalize">{recipe.difficulty}</span>
        {recipe.veg && (
          <>
            <span>·</span>
            <span className="inline-flex items-center gap-1 text-green-800">
              <Leaf className="h-3.5 w-3.5" />
              Veg
            </span>
          </>
        )}
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Match {Math.round(score * 100)}%
        {missingCount > 0 &&
          ` · Need: ${missing_required.map((m) => m.display_name_en).join(", ")}`}
      </p>
    </Link>
  );
}
