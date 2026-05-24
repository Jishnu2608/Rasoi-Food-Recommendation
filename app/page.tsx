"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IngredientInput } from "@/components/ingredients/ingredient-input";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (ingredients: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const q = encodeURIComponent(ingredients.join(","));
      router.push(`/recommend?q=${q}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          Jo fridge mein hai, usse ghar ka khana
        </h1>
        <p className="max-w-lg text-muted-foreground">
          Add ingredients you have — aloo, pyaz, dahi, dal — and get practical
          homemade Indian dishes you can actually cook today.
        </p>
      </section>

      <IngredientInput onSubmit={handleSubmit} loading={loading} />

      {error && (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <section className="rounded-xl border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Try typing:</p>
        <p className="mt-1">aloo · pyaz · tamatar · dahi · chawal · palak · anda</p>
      </section>
    </div>
  );
}
