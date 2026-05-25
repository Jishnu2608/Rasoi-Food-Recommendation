import { NextResponse } from "next/server";
import { z } from "zod";
import {
  buildAliasIndex,
  normalizeIngredients,
} from "@/lib/intelligence/normalize";
import {
  fetchAliasesWithIngredients,
  fetchCanonicalNameMap,
  logUnknownIngredient,
} from "@/lib/db/queries";

const bodySchema = z.object({
  ingredients: z.array(z.string()).min(1).max(30),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { ingredients } = bodySchema.parse(json);

    const [aliases, canonicalMap] = await Promise.all([
      fetchAliasesWithIngredients(),
      fetchCanonicalNameMap(),
    ]);

    const aliasIndex = buildAliasIndex(aliases);
    const result = normalizeIngredients(ingredients, aliasIndex, canonicalMap);

    for (const raw of result.unmatched) {
      await logUnknownIngredient(raw).catch(() => undefined);
    }

    return NextResponse.json(result);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.flatten() }, { status: 400 });
    }
    console.error(e);
    return NextResponse.json({ error: "Normalization failed" }, { status: 500 });
  }
}
