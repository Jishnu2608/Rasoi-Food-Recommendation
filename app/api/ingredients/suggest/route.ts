import { NextResponse } from "next/server";
import { searchIngredientAliases } from "@/lib/db/queries";

export async function GET(request: Request) {
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
