import { NextResponse } from "next/server";
import { z } from "zod";
import { generateWithOllama, isAiEnabled } from "@/lib/ai/ollama-client";
import { buildExplainPrompt } from "@/lib/ai/prompts";
import { sanitizeUserText, validateExplainInput } from "@/lib/ai/guards";
import type { IngredientRef, RecommendationResult } from "@/lib/utils/types";

const bodySchema = z.object({
  pantry: z.array(
    z.object({
      id: z.string(),
      canonical_name: z.string(),
      display_name_en: z.string(),
      display_name_hi: z.string().nullable(),
    }),
  ),
  results: z.array(z.any()),
});

export async function POST(request: Request) {
  if (!isAiEnabled()) {
    return NextResponse.json(
      {
        error: "AI is disabled. Set AI_ENABLED=true and run Ollama locally. See README.",
        enabled: false,
      },
      { status: 503 },
    );
  }

  try {
    const json = await request.json();
    const { pantry, results } = bodySchema.parse(json) as {
      pantry: IngredientRef[];
      results: RecommendationResult[];
    };

    if (!validateExplainInput(results)) {
      return NextResponse.json({ error: "Invalid results payload" }, { status: 400 });
    }

    const prompt = buildExplainPrompt(pantry, results);
    const explanation = sanitizeUserText(await generateWithOllama(prompt), 800);

    return NextResponse.json({ explanation, enabled: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error:
          "Ollama is unavailable. Install Ollama, pull a Qwen model, and ensure OLLAMA_BASE_URL is reachable.",
      },
      { status: 503 },
    );
  }
}
