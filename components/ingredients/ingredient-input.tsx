"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

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

  const fetchSuggestions = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (abortRef.current) abortRef.current.abort();

    if (q.length < 2) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch(
          `/api/ingredients/suggest?q=${encodeURIComponent(q)}`,
          { signal: controller.signal },
        );
        if (!res.ok) return;
        const data = (await res.json()) as {
          suggestions: {
            alias: string;
            ingredient: { display_name_en: string };
          }[];
        };
        setSuggestions(
          data.suggestions.map((s) => ({
            alias: s.alias,
            display: s.ingredient.display_name_en,
          })),
        );
      } catch {
        /* aborted or network */
      }
    }, 220);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
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
        <div className="surface-inset relative rounded-2xl border border-border p-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            className="h-12 rounded-xl border-transparent bg-transparent pl-10 pr-14 shadow-none focus-visible:ring-offset-0"
            placeholder="Type ingredients — aloo, pyaz, tamatar"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              fetchSuggestions(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            disabled={loading}
            aria-label="Ingredient input"
            aria-autocomplete="list"
            aria-expanded={suggestions.length > 0}
          />
          <button
            type="button"
            className="soft-button absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40"
            onClick={() => addChip(value)}
            disabled={loading || !value.trim()}
            aria-label="Add ingredient"
          >
            <Plus className="h-4 w-4" aria-hidden />
          </button>
        </div>

        {suggestions.length > 0 && (
          <ul
            className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-border bg-card p-1"
            style={{ boxShadow: "var(--shadow-card)" }}
            role="listbox"
          >
            {suggestions.map((s) => (
              <li key={s.alias}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm text-foreground hover:bg-muted"
                  onClick={() => addChip(s.alias)}
                  role="option"
                  aria-selected={false}
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
        <div className="surface-inset flex flex-wrap gap-2 rounded-xl border border-border p-3">
          {chips.map((chip) => (
            <Badge
              key={chip}
              variant="secondary"
              className="gap-1 border border-border py-1 pr-1"
            >
              {chip}
              <button
                type="button"
                className="rounded-full p-0.5 hover:bg-muted hover:text-destructive focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                onClick={() =>
                  setChips((prev) => prev.filter((c) => c !== chip))
                }
                aria-label={`Remove ${chip}`}
              >
                <X className="h-3 w-3" aria-hidden />
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
