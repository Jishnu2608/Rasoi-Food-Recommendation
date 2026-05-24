-- Rasoi: initial schema

CREATE TABLE ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_name TEXT NOT NULL UNIQUE,
  display_name_en TEXT NOT NULL,
  display_name_hi TEXT,
  category TEXT,
  is_staple BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE ingredient_aliases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
  alias TEXT NOT NULL,
  language TEXT,
  script TEXT,
  region_hint TEXT,
  UNIQUE (alias, language)
);

CREATE INDEX idx_ingredient_aliases_alias ON ingredient_aliases (alias);

CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  name_hi TEXT,
  region TEXT NOT NULL,
  state TEXT,
  meal_type TEXT NOT NULL,
  veg BOOLEAN NOT NULL,
  prep_time_min INT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  instructions JSONB NOT NULL,
  description TEXT,
  homemade_score SMALLINT NOT NULL DEFAULT 80,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_recipes_region ON recipes (region);
CREATE INDEX idx_recipes_meal_type ON recipes (meal_type);
CREATE INDEX idx_recipes_published ON recipes (is_published) WHERE is_published = true;

CREATE TABLE recipe_ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES ingredients(id),
  quantity_text TEXT,
  is_required BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  UNIQUE (recipe_id, ingredient_id)
);

CREATE INDEX idx_recipe_ingredients_recipe ON recipe_ingredients (recipe_id);
CREATE INDEX idx_recipe_ingredients_ingredient ON recipe_ingredients (ingredient_id);

CREATE TABLE substitution_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ingredient_id UUID NOT NULL REFERENCES ingredients(id),
  substitute_id UUID NOT NULL REFERENCES ingredients(id),
  context_region TEXT,
  ratio_note TEXT,
  confidence SMALLINT NOT NULL DEFAULT 90,
  UNIQUE (ingredient_id, substitute_id, context_region)
);

CREATE TABLE unknown_ingredient_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  raw_input TEXT NOT NULL,
  normalized_guess TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Public read for published recipes (anon key)
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredient_aliases ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE substitution_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read ingredients" ON ingredients FOR SELECT USING (true);
CREATE POLICY "Public read aliases" ON ingredient_aliases FOR SELECT USING (true);
CREATE POLICY "Public read published recipes" ON recipes FOR SELECT USING (is_published = true);
CREATE POLICY "Public read recipe ingredients" ON recipe_ingredients FOR SELECT USING (
  EXISTS (SELECT 1 FROM recipes r WHERE r.id = recipe_id AND r.is_published = true)
);
CREATE POLICY "Public read substitutions" ON substitution_rules FOR SELECT USING (true);
