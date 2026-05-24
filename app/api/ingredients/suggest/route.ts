import { NextResponse } from "next/server";
import { searchIngredientAliases } from "@/lib/db/queries";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";

  if (q.trim().length < 1) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const suggestions = await searchIngredientAliases(q, 8);
    return NextResponse.json({ suggestions });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Suggest failed" }, { status: 500 });
  }
}
