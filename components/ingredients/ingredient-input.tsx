"use client";

import { useCallback, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface IngredientInputProps {
  onSubmit: (ingredients: string[]) => void;
  loading?: boolean;
}

export function IngredientInput({ onSubmit, loading }: IngredientInputProps) {
  const [value, setValue] = useState("");
  const [chips, setChips] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<
    { alias: string; display: string }[]
  >([]);

  const addChip = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    setChips((prev) =>
      prev.some((c) => c.toLowerCase() === trimmed.toLowerCase())
        ? prev
        : [...prev, trimmed],
    );
    setValue("");
    setSuggestions([]);
  }, []);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `/api/ingredients/suggest?q=${encodeURIComponent(q)}`,
      );
      if (!res.ok) return;
      const data = (await res.json()) as {
        suggestions: { alias: string; ingredient: { display_name_en: string } }[];
      };
      setSuggestions(
        data.suggestions.map((s) => ({
          alias: s.alias,
          display: s.ingredient.display_name_en,
        })),
      );
    } catch {
      setSuggestions([]);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addChip(value);
    }
    if (e.key === "Backspace" && !value && chips.length) {
      setChips((prev) => prev.slice(0, -1));
    }
  };

  const handleSubmit = () => {
    const list = [...chips];
    if (value.trim()) list.push(value.trim());
    if (list.length === 0) return;
    onSubmit(list);
  };

  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-14 rounded-[1.2rem] border-border bg-card/95 pl-10 pr-12 text-base shadow-sm"
            placeholder="Type ingredients - aloo, pyaz, tamatar"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              void fetchSuggestions(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            disabled={loading}
            aria-label="Ingredient input"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-2xl bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
            onClick={() => addChip(value)}
            disabled={loading || !value.trim()}
            aria-label="Add ingredient"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {suggestions.length > 0 && (
          <ul
            className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-card py-1 shadow-lg"
            role="listbox"
          >
            {suggestions.map((s) => (
              <li key={s.alias}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-muted"
                  onClick={() => addChip(s.alias)}
                >
                  <span className="font-medium">{s.alias}</span>
                  <span className="text-muted-foreground">{s.display}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 rounded-2xl border border-border bg-background/80 p-3">
          {chips.map((chip) => (
            <Badge
              key={chip}
              variant="secondary"
              className="gap-1 border border-border bg-card pr-1"
            >
              {chip}
              <button
                type="button"
                className="rounded-full p-0.5 hover:bg-black/10"
                onClick={() =>
                  setChips((prev) => prev.filter((c) => c !== chip))
                }
                aria-label={`Remove ${chip}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <Button
        size="lg"
        className="w-full shadow-sm sm:w-auto"
        onClick={handleSubmit}
        disabled={loading || (chips.length === 0 && !value.trim())}
      >
        {loading ? "Finding dishes..." : "Kya bana sakte hain?"}
      </Button>
    </div>
  );
}
