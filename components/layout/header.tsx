import Link from "next/link";
import { ChefHat, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header
      className="sticky top-0 z-20 border-b border-border bg-card/90"
      style={{ boxShadow: "var(--shadow-header)" }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 text-lg font-semibold tracking-tight text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span
            className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-2xl bg-primary text-primary-foreground transition-transform duration-200 group-hover:scale-[1.02]"
            style={{ boxShadow: "var(--shadow-primary)" }}
          >
            <span className="absolute inset-x-0 top-0 h-1 bg-accent" />
            <ChefHat className="h-5 w-5" aria-hidden />
          </span>
          <span>
            Rasoi
            <span className="ml-2 hidden text-xs font-medium text-muted-foreground sm:inline">
              fridge se faisla tak
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold text-muted-foreground sm:inline-flex">
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
            Pantry match
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
