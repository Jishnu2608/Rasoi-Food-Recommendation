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
        setStarDishSlug(null);
      });
  }, []);

  return (
    <footer className="mt-16 px-4 pb-8 sm:px-6">
      <div className="premium-panel mx-auto max-w-6xl p-5 sm:p-8">
        <div className="relative z-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="group inline-block">
              <h2 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                Rasoi
              </h2>
            </Link>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Ghar ka khana from your kitchen. Enter what you have at home and
              get realistic homemade Indian dish recommendations.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-foreground">Explore</h2>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Home
                </Link>
              </li>
              <li>
                {starDishSlug ? (
                  <Link
                    href={`/recipe/${starDishSlug}`}
                    className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Aaj Ki Star Dish
                  </Link>
                ) : (
                  <Link
                    href="/recommend"
                    className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Get Recommendations
                  </Link>
                )}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-foreground">Connect</h2>
            <div className="mt-2 flex items-center gap-3">
              <a
                href="https://github.com/Jishnu2608/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border bg-background p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" aria-hidden />
              </a>
              <a
                href="https://x.com/JishnudeepBorah"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border bg-background p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="X"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            Made with{" "}
            <Heart className="h-4 w-4 fill-primary text-primary" aria-hidden />{" "}
            by{" "}
            <span className="font-medium text-foreground">Jishnu</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
