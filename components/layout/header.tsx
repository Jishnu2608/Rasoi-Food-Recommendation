import Link from "next/link";
import { ChefHat, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-card/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-lg font-semibold tracking-tight text-primary"
        >
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <span className="absolute inset-x-0 top-0 h-1 bg-accent" />
            <ChefHat className="h-5 w-5" />
          </span>
          <span>
            Rasoi
            <span className="ml-2 hidden text-xs font-medium text-muted-foreground sm:inline">
              fridge se faisla tak
            </span>
          </span>
        </Link>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          AI-native pantry match
        </span>
      </div>
    </header>
  );
}
