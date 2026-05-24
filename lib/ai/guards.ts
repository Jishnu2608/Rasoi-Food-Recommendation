import type { RecommendationResult } from "@/lib/utils/types";

export function validateExplainInput(results: RecommendationResult[]): boolean {
  return results.length > 0 && results.length <= 10;
}

export function sanitizeUserText(text: string, maxLen = 500): string {
  return text.slice(0, maxLen).replace(/[<>]/g, "");
}
