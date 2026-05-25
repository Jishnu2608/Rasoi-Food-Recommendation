import Link from "next/link";
import { ChefHat } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-primary"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <ChefHat className="h-5 w-5" />
          </span>
          <span>Rasoi</span>
        </Link>
        <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
          Ghar ka khana
        </span>
      </div>
    </header>
  );
}
