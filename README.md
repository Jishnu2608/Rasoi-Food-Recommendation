# Rasoi

India-first homemade cooking recommendations from the ingredients you already have. Deterministic recipe matching backed by PostgreSQL — not AI-generated recipes.

## Stack

- Next.js 15, TypeScript, Tailwind CSS
- Supabase (PostgreSQL, free tier)
- Optional: Ollama + Qwen for explanation text only

## Quick start

### 1. Supabase project

1. Create a free project at [supabase.com](https://supabase.com).
2. Copy **Project URL**, **anon key**, and **service role key**.
3. In the SQL Editor, run the migration file:
   `supabase/migrations/001_initial.sql`

### 2. Environment

```bash
cp .env.example .env.local
```

Fill in your Supabase values in `.env.local`.

### 3. Install and seed

```bash
npm install
npm run db:seed
```

`db:seed` loads the curated seed catalog plus any generated catalog in `data/generated/`.
This repo includes **102** hand-curated home recipes and can expand to **1600+**
sourced Indian recipe entries after running `npm run recipes:import`.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Try: `aloo`, `pyaz`, `tamatar`.

### 5. Deploy (Vercel)

1. Push to GitHub and import in Vercel.
2. Add the same env vars (`NEXT_PUBLIC_SUPABASE_*`, `SUPABASE_SERVICE_ROLE_KEY`).
3. Keep `AI_ENABLED=false` on Vercel unless you host Ollama on a reachable server.

---

## Optional: Ollama (AI explanations only)

The app works fully **without** Ollama. AI only adds short “why these recipes” text on the results page — it does **not** create or rank recipes.

### Install Ollama (Windows)

1. Download from [https://ollama.com/download](https://ollama.com/download) and install.
2. Open PowerShell and pull a Qwen model:

```powershell
ollama pull qwen2.5:7b
```

3. Verify Ollama is running:

```powershell
ollama list
curl http://127.0.0.1:11434/api/tags
```

### Enable in the app

In `.env.local`:

```env
AI_ENABLED=true
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=qwen2.5:7b
NEXT_PUBLIC_AI_ENABLED=true
```

Restart `npm run dev`. After searching ingredients, the results page may show an AI explanation block.

**Note:** Vercel cannot reach `localhost`. For production AI you would need Ollama on a VPS or a tunnel — not required for MVP.

---

## Project structure

```
app/                 # Pages + API routes
components/          # UI
lib/intelligence/    # Normalize, match, score (deterministic)
lib/ai/              # Ollama client (optional)
lib/db/              # Supabase queries
data/seeds/          # Ingredients JSON + recipe catalog
supabase/migrations/ # SQL schema
```

## Adding more recipes

Edit `data/seeds/recipe-catalog.ts` (use only canonical names from `data/seeds/ingredients.json`), then run `npm run db:seed` again.

For a larger sourced catalog, run:

```bash
npm run recipes:import
```

This downloads `Anupam007/indian-recipe-dataset` from Hugging Face and writes
normalized recipe/ingredient data into `data/generated/`. The dataset page has
no explicit license, so generated entries keep original source URLs and do not
copy full method text into the app.

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Development server       |
| `npm run build`| Production build         |
| `npm run db:seed` | Load DB from seeds    |
| `npm run recipes:import` | Generate expanded sourced catalog |
| `npm run typecheck` | TypeScript check    |
