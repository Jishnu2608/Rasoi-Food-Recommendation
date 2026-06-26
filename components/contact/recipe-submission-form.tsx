"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ClipboardPen, CheckCircle2 } from "lucide-react";

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function RecipeSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    recipeName: "",
    ingredients: "",
    instructions: "",
    yourName: "",
    yourEmail: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          recipeName: "",
          ingredients: "",
          instructions: "",
          yourName: "",
          yourEmail: "",
        });
      } else {
        alert("Failed to submit recipe. Please try again.");
      }
    } catch {
      alert("Failed to submit recipe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="premium-panel p-6 text-center">
        <div className="relative z-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-success-muted text-success">
            <CheckCircle2 className="h-7 w-7" aria-hidden />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            Recipe submitted
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Thank you for sharing your recipe. We&apos;ll review it and add it
            to our collection.
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="mt-4"
          >
            Submit Another Recipe
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="premium-panel p-5 sm:p-7">
      <div className="relative z-10 grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            <ClipboardPen className="h-5 w-5" aria-hidden />
          </div>
          <p className="mt-4 text-sm font-semibold text-primary">
            Community pantry
          </p>
          <h3 className="mt-1 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            Know a dish Rasoi missed?
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Send the recipe name, ingredients, and steps. It lands in the
            owner&apos;s inbox as a review-ready submission.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="recipeName"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Recipe Name *
            </label>
            <Input
              id="recipeName"
              required
              value={formData.recipeName}
              onChange={(e) =>
                setFormData({ ...formData, recipeName: e.target.value })
              }
              placeholder="e.g., Maa ki Dal"
            />
          </div>

          <div>
            <label
              htmlFor="ingredients"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Ingredients *
            </label>
            <textarea
              id="ingredients"
              required
              rows={4}
              value={formData.ingredients}
              onChange={(e) =>
                setFormData({ ...formData, ingredients: e.target.value })
              }
              className={`${fieldClass} min-h-28 resize-y`}
              placeholder="List all ingredients with quantities"
            />
          </div>

          <div>
            <label
              htmlFor="instructions"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Cooking Instructions *
            </label>
            <textarea
              id="instructions"
              required
              rows={4}
              value={formData.instructions}
              onChange={(e) =>
                setFormData({ ...formData, instructions: e.target.value })
              }
              className={`${fieldClass} min-h-28 resize-y`}
              placeholder="Describe the cooking steps in order"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="yourName"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Your Name *
              </label>
              <Input
                id="yourName"
                required
                value={formData.yourName}
                onChange={(e) =>
                  setFormData({ ...formData, yourName: e.target.value })
                }
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="yourEmail"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Your Email *
              </label>
              <Input
                id="yourEmail"
                type="email"
                required
                value={formData.yourEmail}
                onChange={(e) =>
                  setFormData({ ...formData, yourEmail: e.target.value })
                }
                placeholder="your@email.com"
              />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              "Submitting…"
            ) : (
              <>
                Submit Recipe
                <Send className="h-4 w-4" aria-hidden />
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
