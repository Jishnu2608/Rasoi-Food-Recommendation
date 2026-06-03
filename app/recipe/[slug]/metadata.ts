import { Metadata } from "next";

interface RecipeMetadataParams {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: RecipeMetadataParams): Promise<Metadata> {
  const slug = params.slug;
  const baseUrl = "https://rasoi-ready.vercel.app";

  try {
    const res = await fetch(`${baseUrl}/api/recipes/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        title: "Recipe Not Found | Rasoi",
        description: "The requested recipe could not be found.",
      };
    }

    const data = await res.json();
    const recipe = data.recipe;

    const ingredients = data.ingredients
      .map((i: { ingredient: { display_name_en: string } }) => i.ingredient.display_name_en)
      .slice(0, 5)
      .join(", ");

    return {
      title: `${recipe.name} | Rasoi`,
      description: `${recipe.description}. Ingredients: ${ingredients}. Prep time: ${recipe.prep_time_min} minutes.`,
      keywords: [
        recipe.name,
        recipe.region.replace("_", " "),
        recipe.meal_type,
        "Indian recipe",
        "homemade",
        "cooking",
        ...ingredients.split(", "),
      ],
      openGraph: {
        title: `${recipe.name} | Rasoi`,
        description: `${recipe.description}. Ingredients: ${ingredients}. Prep time: ${recipe.prep_time_min} minutes.`,
        url: `${baseUrl}/recipe/${slug}`,
        type: "article",
        siteName: "Rasoi",
      },
      twitter: {
        card: "summary_large_image",
        title: `${recipe.name} | Rasoi`,
        description: `${recipe.description}. Ingredients: ${ingredients}. Prep time: ${recipe.prep_time_min} minutes.`,
      },
    };
  } catch {
    return {
      title: "Recipe Not Found | Rasoi",
      description: "The requested recipe could not be found.",
    };
  }
}
