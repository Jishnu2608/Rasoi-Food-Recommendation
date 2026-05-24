import type { IngredientRef, SubstitutionRule } from "@/lib/utils/types";

export interface ResolvedSubstitution {
  missing: IngredientRef;
  substitute: IngredientRef;
  ratio_note: string | null;
  confidence: number;
}

export function resolveSubstitutions(
  missing: IngredientRef[],
  pantryIds: Set<string>,
  rules: (SubstitutionRule & {
    substitute: IngredientRef;
    ingredient: IngredientRef;
  })[],
): ResolvedSubstitution[] {
  const resolved: ResolvedSubstitution[] = [];

  for (const ing of missing) {
    const rule = rules.find(
      (r) =>
        r.ingredient_id === ing.id && pantryIds.has(r.substitute_id),
    );
    if (rule) {
      resolved.push({
        missing: ing,
        substitute: rule.substitute,
        ratio_note: rule.ratio_note,
        confidence: rule.confidence,
      });
    }
  }

  return resolved;
}
