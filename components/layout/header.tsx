import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-primary">
          Rasoi
        </Link>
        <span className="text-xs text-muted-foreground">Ghar ka khana</span>
      </div>
    </header>
  );
}
