import { Github, Twitter, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Rasoi</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Ghar ka khana from your kitchen. Enter what you have at home and get realistic homemade Indian dish recommendations.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/recommend" className="hover:text-primary transition-colors">
                  Get Recommendations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Connect</h4>
            <div className="flex gap-4">
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
                href="https://twitter.com/JishnudeepBorah"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
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
