"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Heart } from "lucide-react";

export function Footer() {
  const [starDishSlug, setStarDishSlug] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/todays-star")
      .then((res) => res.json())
      .then((data) => {
        if (data.recipe?.slug) {
          setStarDishSlug(data.recipe.slug);
        }
      })
      .catch(() => {
        // Fallback to a known recipe if API fails
        setStarDishSlug(null);
      });
  }, []);

  return (
    <footer className="mt-16 border-t border-border bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="mt-4 font-semibold">Rasoi</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Ghar ka khana from your kitchen. Enter what you have at home and get realistic homemade Indian dish recommendations.
            </p>
          </div>

          <div>
            <h2 className="mt-4 font-semibold">Quick Links</h2>
            <ul className="mt-2 text-sm leading-6 text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                {starDishSlug ? (
                  <Link
                    href={`/recipe/${starDishSlug}`}
                    className="hover:text-primary transition-colors"
                  >
                    Aaj Ki Star Dish
                  </Link>
                ) : (
                  <Link href="/recommend" className="hover:text-primary transition-colors">
                    Get Recommendations
                  </Link>
                )}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mt-4 font-semibold">Connect</h2>
            <div className="mt-2 flex gap-4">
              <a
                href="https://github.com/Jishnu2608/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/JishnudeepBorah"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="X"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> by{" "}
            <span className="font-medium text-foreground">Jishnu</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
