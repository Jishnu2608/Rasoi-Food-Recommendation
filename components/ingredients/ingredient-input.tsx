"use client";

import { useCallback, useState } from "react";
import { X } from "lucide-react";
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
    <div className="w-full max-w-xl space-y-4">
      <div className="relative">
        <Input
          placeholder="Type ingredients — aloo, pyaz, tamatar…"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            void fetchSuggestions(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          disabled={loading}
          aria-label="Ingredient input"
        />
        {suggestions.length > 0 && (
          <ul
            className="absolute z-10 mt-1 w-full rounded-lg border border-border bg-card py-1 shadow-md"
            role="listbox"
          >
            {suggestions.map((s) => (
              <li key={s.alias}>
                <button
                  type="button"
                  className="w-full px-3 py-2 text-left text-sm hover:bg-muted"
                  onClick={() => addChip(s.alias)}
                >
                  <span className="font-medium">{s.alias}</span>
                  <span className="ml-2 text-muted-foreground">{s.display}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <Badge
              key={chip}
              variant="secondary"
              className="gap-1 pr-1"
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
        className="w-full sm:w-auto"
        onClick={handleSubmit}
        disabled={loading || (chips.length === 0 && !value.trim())}
      >
        {loading ? "Finding dishes…" : "Kya bana sakte hain?"}
      </Button>
    </div>
  );
}
