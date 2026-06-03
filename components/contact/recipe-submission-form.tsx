"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

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
    } catch (error) {
      alert("Failed to submit recipe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-[1.5rem] border border-border bg-card/90 p-5 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <svg
            className="h-6 w-6 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Recipe Submitted!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you for sharing your recipe. We'll review it and add it to our collection.
        </p>
        <Button
          onClick={() => setSubmitted(false)}
          variant="outline"
          className="mt-4"
        >
          Submit Another Recipe
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-[1.5rem] border border-border bg-card/90 p-5 shadow-sm">
      <h3 className="text-lg font-semibold">Submit Your Recipe</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Found a recipe that's not in our app? Share it with us!
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="recipeName" className="mb-1.5 block text-sm font-medium">
            Recipe Name *
          </label>
          <input
            type="text"
            id="recipeName"
            required
            value={formData.recipeName}
            onChange={(e) => setFormData({ ...formData, recipeName: e.target.value })}
            className="w-full rounded-2xl border border-border bg-background/80 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g., Maa ki Dal"
          />
        </div>

        <div>
          <label htmlFor="ingredients" className="mb-1.5 block text-sm font-medium">
            Ingredients *
          </label>
          <textarea
            id="ingredients"
            required
            rows={4}
            value={formData.ingredients}
            onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
            className="w-full rounded-2xl border border-border bg-background/80 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            placeholder="List all ingredients with quantities (e.g., 1 cup rice, 2 onions, 1 tsp cumin)"
          />
        </div>

        <div>
          <label htmlFor="instructions" className="mb-1.5 block text-sm font-medium">
            Cooking Instructions *
          </label>
          <textarea
            id="instructions"
            required
            rows={4}
            value={formData.instructions}
            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            className="w-full rounded-2xl border border-border bg-background/80 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            placeholder="Describe the cooking steps in order"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="yourName" className="mb-1.5 block text-sm font-medium">
              Your Name *
            </label>
            <input
              type="text"
              id="yourName"
              required
              value={formData.yourName}
              onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
              className="w-full rounded-2xl border border-border bg-background/80 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="yourEmail" className="mb-1.5 block text-sm font-medium">
              Your Email *
            </label>
            <input
              type="email"
              id="yourEmail"
              required
              value={formData.yourEmail}
              onChange={(e) => setFormData({ ...formData, yourEmail: e.target.value })}
              className="w-full rounded-2xl border border-border bg-background/80 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              Submit Recipe
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
