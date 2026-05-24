export interface SeedRecipe {
  slug: string;
  name: string;
  name_hi?: string;
  region: "north" | "south" | "east" | "west" | "pan_india";
  meal_type: "breakfast" | "lunch" | "dinner" | "snack";
  veg: boolean;
  prep_time_min: number;
  difficulty: "easy" | "medium" | "hard";
  description?: string;
  homemade_score?: number;
  instructions: { step: number; text: string }[];
  ingredients: { canonical: string; required?: boolean; quantity?: string }[];
}

export const recipeCatalog: SeedRecipe[] = [
  {
    slug: "poha",
    name: "Kanda Poha",
    region: "west",
    meal_type: "breakfast",
    veg: true,
    prep_time_min: 20,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Rinse poha, drain, and toss with salt and turmeric.",
      },
      {
        step: 2,
        text: "Temper mustard seeds, asafoetida, curry leaves, and onion in oil until soft.",
      },
      {
        step: 3,
        text: "Add peas and green chili; stir in poha and warm 3–4 minutes.",
      },
      {
        step: 4,
        text: "Squeeze lemon and garnish with coriander if you have it.",
      },
    ],
    ingredients: [
      {
        canonical: "poha",
        quantity: "2 cups",
      },
      {
        canonical: "onion",
        quantity: "1",
      },
      {
        canonical: "peas",
        quantity: "1/4 cup",
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "curry_leaves",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "lemon",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "asafoetida",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
      {
        canonical: "sugar",
        quantity: "1/2 tsp",
        required: false,
      },
    ],
    name_hi: "कांदा पोहा",
    description: "Maharashtrian flattened-rice breakfast with onion and peas.",
    homemade_score: 9,
  },
  {
    slug: "upma",
    name: "Rava Upma",
    region: "south",
    meal_type: "breakfast",
    veg: true,
    prep_time_min: 25,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Dry-roast semolina until fragrant; set aside.",
      },
      {
        step: 2,
        text: "Temper mustard, urad dal, curry leaves, ginger, and green chili in ghee or oil.",
      },
      {
        step: 3,
        text: "Sauté onion, add water with salt; when it boils, stir in semolina while whisking.",
      },
      {
        step: 4,
        text: "Cover 3 minutes, fluff, and serve hot with lemon on the side.",
      },
    ],
    ingredients: [
      {
        canonical: "semolina",
        quantity: "1 cup",
      },
      {
        canonical: "water",
        quantity: "2.5 cups",
      },
      {
        canonical: "onion",
        quantity: "1 small",
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "black_gram_urad",
        quantity: "1 tsp",
      },
      {
        canonical: "curry_leaves",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "lemon",
        required: false,
      },
    ],
    name_hi: "उपमा",
    homemade_score: 9,
  },
  {
    slug: "aloo-paratha",
    name: "Aloo Paratha",
    region: "north",
    meal_type: "breakfast",
    veg: true,
    prep_time_min: 40,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Boil and mash potatoes with salt, cumin, green chili, and coriander.",
      },
      {
        step: 2,
        text: "Knead wheat flour with water and salt; rest 15 minutes.",
      },
      {
        step: 3,
        text: "Stuff dough balls with potato filling and roll gently.",
      },
      {
        step: 4,
        text: "Cook on a hot tawa with ghee until golden spots appear on both sides.",
      },
    ],
    ingredients: [
      {
        canonical: "wheat_flour",
        quantity: "2 cups",
      },
      {
        canonical: "potato",
        quantity: "3 medium",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "ghee",
      },
      {
        canonical: "water",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "आलू पराठा",
    homemade_score: 10,
  },
  {
    slug: "plain-paratha",
    name: "Plain Paratha",
    region: "north",
    meal_type: "breakfast",
    veg: true,
    prep_time_min: 25,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Knead wheat flour, salt, and water into a soft dough; rest 15 minutes.",
      },
      {
        step: 2,
        text: "Divide, roll each portion into a circle, fold into a triangle, and roll again.",
      },
      {
        step: 3,
        text: "Cook on a hot tawa, brushing ghee, until lightly browned on both sides.",
      },
    ],
    ingredients: [
      {
        canonical: "wheat_flour",
        quantity: "2 cups",
      },
      {
        canonical: "water",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "ghee",
      },
    ],
    name_hi: "सादा पराठा",
    homemade_score: 10,
  },
  {
    slug: "gobi-paratha",
    name: "Gobi Paratha",
    region: "north",
    meal_type: "breakfast",
    veg: true,
    prep_time_min: 45,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Grate cauliflower, squeeze dry, and sauté briefly with cumin and green chili.",
      },
      {
        step: 2,
        text: "Mix with salt and optional coriander for filling.",
      },
      {
        step: 3,
        text: "Stuff into wheat dough rounds and roll carefully.",
      },
      {
        step: 4,
        text: "Roast on tawa with ghee until cooked through and speckled brown.",
      },
    ],
    ingredients: [
      {
        canonical: "wheat_flour",
        quantity: "2 cups",
      },
      {
        canonical: "cauliflower",
        quantity: "2 cups grated",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "ghee",
      },
      {
        canonical: "water",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "गोभी पराठा",
    homemade_score: 9,
  },
  {
    slug: "methi-paratha",
    name: "Methi Paratha",
    region: "north",
    meal_type: "breakfast",
    veg: true,
    prep_time_min: 35,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Knead wheat flour with chopped fenugreek leaves, salt, and a little oil.",
      },
      {
        step: 2,
        text: "Rest dough 15 minutes, then roll into parathas.",
      },
      {
        step: 3,
        text: "Cook on tawa with ghee, pressing lightly so the greens cook through.",
      },
    ],
    ingredients: [
      {
        canonical: "wheat_flour",
        quantity: "2 cups",
      },
      {
        canonical: "fenugreek_leaves",
        quantity: "1 cup",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "ghee",
      },
      {
        canonical: "water",
      },
    ],
    name_hi: "मेथी पराठा",
    homemade_score: 9,
  },
  {
    slug: "besan-chilla",
    name: "Besan Chilla",
    region: "north",
    meal_type: "breakfast",
    veg: true,
    prep_time_min: 20,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Whisk besan with water, salt, turmeric, and red chili powder into a smooth batter.",
      },
      {
        step: 2,
        text: "Stir in onion, tomato, and green chili.",
      },
      {
        step: 3,
        text: "Pour thin layer on a greased pan and cook both sides until set and golden.",
      },
    ],
    ingredients: [
      {
        canonical: "besan",
        quantity: "1 cup",
      },
      {
        canonical: "water",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "बेसन चीला",
    homemade_score: 9,
  },
  {
    slug: "moong-chilla",
    name: "Moong Dal Chilla",
    region: "north",
    meal_type: "breakfast",
    veg: true,
    prep_time_min: 30,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Soak moong dal 4 hours; grind to a smooth batter with ginger and green chili.",
      },
      {
        step: 2,
        text: "Add salt and cumin; rest batter 10 minutes.",
      },
      {
        step: 3,
        text: "Spread on a hot greased pan and cook till crisp at edges; flip once.",
      },
    ],
    ingredients: [
      {
        canonical: "lentil_moong",
        quantity: "1 cup",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "water",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "मूंग दाल चीला",
    homemade_score: 8,
  },
  {
    slug: "egg-bhurji",
    name: "Anda Bhurji",
    region: "pan_india",
    meal_type: "breakfast",
    veg: false,
    prep_time_min: 12,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Beat eggs with salt and a pinch of turmeric.",
      },
      {
        step: 2,
        text: "Sauté onion, tomato, green chili, and ginger in oil until soft.",
      },
      {
        step: 3,
        text: "Pour eggs and scramble on medium heat until just set.",
      },
      {
        step: 4,
        text: "Finish with coriander and a dash of garam masala.",
      },
    ],
    ingredients: [
      {
        canonical: "egg",
        quantity: "4",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "garam_masala",
        required: false,
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "अंडा भुर्जी",
    homemade_score: 10,
  },
  {
    slug: "masala-omelette",
    name: "Masala Omelette",
    region: "pan_india",
    meal_type: "breakfast",
    veg: false,
    prep_time_min: 10,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Whisk eggs with salt, red chili, and chopped onion-tomato-green chili.",
      },
      {
        step: 2,
        text: "Heat oil in a small pan and pour the mixture.",
      },
      {
        step: 3,
        text: "Cook covered on low until set; fold and serve.",
      },
    ],
    ingredients: [
      {
        canonical: "egg",
        quantity: "2",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "मसाला ऑमलेट",
    homemade_score: 10,
  },
  {
    slug: "bread-omelette",
    name: "Bread Omelette",
    region: "pan_india",
    meal_type: "breakfast",
    veg: false,
    prep_time_min: 15,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Beat eggs with salt, onion, and green chili.",
      },
      {
        step: 2,
        text: "Dip bread slices briefly and pan-fry in butter until golden.",
      },
      {
        step: 3,
        text: "Flip, cook other side, and serve hot.",
      },
    ],
    ingredients: [
      {
        canonical: "bread",
        quantity: "4 slices",
      },
      {
        canonical: "egg",
        quantity: "3",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "butter",
      },
    ],
    homemade_score: 8,
  },
  {
    slug: "khichdi",
    name: "Moong Dal Khichdi",
    region: "pan_india",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 35,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Wash rice and moong dal together.",
      },
      {
        step: 2,
        text: "Temper cumin and asafoetida in ghee; add dal-rice, turmeric, salt, and water.",
      },
      {
        step: 3,
        text: "Pressure cook or simmer until soft and mushy.",
      },
      {
        step: 4,
        text: "Serve with ghee on top and lemon if desired.",
      },
    ],
    ingredients: [
      {
        canonical: "rice",
        quantity: "1 cup",
      },
      {
        canonical: "lentil_moong",
        quantity: "1/2 cup",
      },
      {
        canonical: "ghee",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "asafoetida",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "ginger",
        required: false,
      },
      {
        canonical: "lemon",
        required: false,
      },
    ],
    name_hi: "खिचड़ी",
    homemade_score: 10,
  },
  {
    slug: "lemon-rice",
    name: "Lemon Rice",
    region: "south",
    meal_type: "breakfast",
    veg: true,
    prep_time_min: 25,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Cook rice grains separately and cool slightly.",
      },
      {
        step: 2,
        text: "Temper mustard, urad, curry leaves, and green chili in oil.",
      },
      {
        step: 3,
        text: "Add turmeric, salt, and lemon juice; toss with rice and warm through.",
      },
    ],
    ingredients: [
      {
        canonical: "rice",
        quantity: "2 cups cooked",
      },
      {
        canonical: "lemon",
        quantity: "1",
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "black_gram_urad",
      },
      {
        canonical: "curry_leaves",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "salt",
      },
    ],
    name_hi: "नींबू चावल",
    homemade_score: 8,
  },
  {
    slug: "coconut-rice",
    name: "Thengai Sadam",
    region: "south",
    meal_type: "breakfast",
    veg: true,
    prep_time_min: 30,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Cook rice and spread to cool.",
      },
      {
        step: 2,
        text: "Temper mustard, urad, curry leaves, and green chili in oil.",
      },
      {
        step: 3,
        text: "Add grated coconut, salt, and fold gently into rice.",
      },
    ],
    ingredients: [
      {
        canonical: "rice",
        quantity: "2 cups cooked",
      },
      {
        canonical: "coconut",
        quantity: "1/2 cup grated",
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "black_gram_urad",
      },
      {
        canonical: "curry_leaves",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "salt",
      },
    ],
    name_hi: "नारियल चावल",
    homemade_score: 8,
  },
  {
    slug: "curd-rice",
    name: "Thayir Sadam",
    region: "south",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 20,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Mash cooled cooked rice lightly with salt.",
      },
      {
        step: 2,
        text: "Mix in beaten yogurt until creamy; add a little milk if too thick.",
      },
      {
        step: 3,
        text: "Temper mustard, urad, curry leaves, and green chili in oil; pour over rice.",
      },
    ],
    ingredients: [
      {
        canonical: "rice",
        quantity: "2 cups cooked",
      },
      {
        canonical: "yogurt",
        quantity: "1 cup",
      },
      {
        canonical: "milk",
        quantity: "2 tbsp",
        required: false,
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "black_gram_urad",
      },
      {
        canonical: "curry_leaves",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "ginger",
        quantity: "1 tsp grated",
        required: false,
      },
    ],
    name_hi: "दही चावल",
    homemade_score: 9,
  },
  {
    slug: "tomato-rice",
    name: "Tomato Rice",
    region: "south",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 30,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Cook rice and set aside.",
      },
      {
        step: 2,
        text: "Sauté mustard, curry leaves, onion, ginger, and tomato until mushy.",
      },
      {
        step: 3,
        text: "Add turmeric, salt, and rice; toss on low heat 5 minutes.",
      },
    ],
    ingredients: [
      {
        canonical: "rice",
        quantity: "2 cups cooked",
      },
      {
        canonical: "tomato",
        quantity: "2",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "curry_leaves",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "salt",
      },
    ],
    name_hi: "टमाटर चावल",
    homemade_score: 8,
  },
  {
    slug: "dal-tadka",
    name: "Dal Tadka",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 40,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Pressure-cook toor dal with turmeric, salt, and water until soft; mash lightly.",
      },
      {
        step: 2,
        text: "Heat ghee, add cumin, garlic, and red chili powder; sizzle.",
      },
      {
        step: 3,
        text: "Pour tadka over dal; simmer 5 minutes and garnish with coriander.",
      },
    ],
    ingredients: [
      {
        canonical: "lentil_toor",
        quantity: "1 cup",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "ghee",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "दाल तड़का",
    homemade_score: 10,
  },
  {
    slug: "moong-dal",
    name: "Yellow Moong Dal",
    region: "pan_india",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 30,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Boil moong dal with turmeric and salt until soft.",
      },
      {
        step: 2,
        text: "Heat oil, add cumin and asafoetida, then chopped garlic and green chili.",
      },
      {
        step: 3,
        text: "Pour over dal and simmer 3 minutes.",
      },
    ],
    ingredients: [
      {
        canonical: "lentil_moong",
        quantity: "1 cup",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "asafoetida",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "green_chili",
      },
    ],
    name_hi: "मूंग दाल",
    homemade_score: 10,
  },
  {
    slug: "masoor-dal",
    name: "Masoor Dal",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 30,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Cook masoor dal with turmeric and salt until smooth.",
      },
      {
        step: 2,
        text: "Fry onion, tomato, ginger, and spices in oil; add to dal.",
      },
      {
        step: 3,
        text: "Simmer 10 minutes and finish with garam masala.",
      },
    ],
    ingredients: [
      {
        canonical: "lentil_masoor",
        quantity: "1 cup",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "coriander_powder",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "मसूर दाल",
    homemade_score: 9,
  },
  {
    slug: "chana-dal",
    name: "Chana Dal Fry",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 45,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Soak chana dal 1 hour; boil with turmeric and salt until tender but whole.",
      },
      {
        step: 2,
        text: "Sauté onion, tomato, ginger, garlic, and ground spices in oil.",
      },
      {
        step: 3,
        text: "Add dal and simmer until thick; garnish with coriander.",
      },
    ],
    ingredients: [
      {
        canonical: "lentil_chana",
        quantity: "1 cup",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "coriander_powder",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "चना दाल",
    homemade_score: 9,
  },
  {
    slug: "matar-paratha",
    name: "Matar Paratha",
    region: "north",
    meal_type: "breakfast",
    veg: true,
    prep_time_min: 40,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Mash boiled peas with cumin, green chili, and salt for filling.",
      },
      {
        step: 2,
        text: "Roll wheat dough with pea stuffing into parathas.",
      },
      {
        step: 3,
        text: "Roast on tawa with ghee until golden and cooked through.",
      },
    ],
    ingredients: [
      {
        canonical: "wheat_flour",
        quantity: "2 cups",
      },
      {
        canonical: "peas",
        quantity: "1 cup",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "ghee",
      },
      {
        canonical: "water",
      },
    ],
    name_hi: "मटर पराठा",
    homemade_score: 9,
  },
  {
    slug: "missi-roti",
    name: "Missi Roti",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 30,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Mix wheat flour, besan, salt, ajwain substitute cumin, and spices with water.",
      },
      {
        step: 2,
        text: "Knead firm dough; roll thick rotis.",
      },
      {
        step: 3,
        text: "Cook on tawa with ghee, pressing edges so they cook evenly.",
      },
    ],
    ingredients: [
      {
        canonical: "wheat_flour",
        quantity: "1.5 cups",
      },
      {
        canonical: "besan",
        quantity: "1/2 cup",
      },
      {
        canonical: "onion",
        quantity: "1 grated",
        required: false,
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "ghee",
      },
    ],
    name_hi: "मिस्सी रोटी",
    homemade_score: 8,
  },
  {
    slug: "methi-thepla",
    name: "Methi Thepla",
    region: "west",
    meal_type: "breakfast",
    veg: true,
    prep_time_min: 35,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Knead wheat flour with fenugreek leaves, yogurt, salt, and turmeric.",
      },
      {
        step: 2,
        text: "Roll thin circles and cook on a dry tawa, then brush with oil.",
      },
      {
        step: 3,
        text: "Stack and serve warm—Gujarati travel staple.",
      },
    ],
    ingredients: [
      {
        canonical: "wheat_flour",
        quantity: "2 cups",
      },
      {
        canonical: "fenugreek_leaves",
        quantity: "1 cup",
      },
      {
        canonical: "yogurt",
        quantity: "3 tbsp",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "मेथी थेपला",
    homemade_score: 9,
  },
  {
    slug: "suji-halwa",
    name: "Suji Halwa",
    region: "north",
    meal_type: "snack",
    veg: true,
    prep_time_min: 25,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Roast semolina in ghee until nutty and golden.",
      },
      {
        step: 2,
        text: "Boil water with sugar separately; add carefully to semolina while stirring.",
      },
      {
        step: 3,
        text: "Cook until thick; garnish with optional nuts substitute—serve warm.",
      },
    ],
    ingredients: [
      {
        canonical: "semolina",
        quantity: "1 cup",
      },
      {
        canonical: "ghee",
        quantity: "1/2 cup",
      },
      {
        canonical: "sugar",
        quantity: "3/4 cup",
      },
      {
        canonical: "water",
        quantity: "2 cups",
      },
    ],
    name_hi: "सूजी हलवा",
    homemade_score: 9,
  },
  {
    slug: "gajar-halwa",
    name: "Gajar ka Halwa",
    region: "north",
    meal_type: "snack",
    veg: true,
    prep_time_min: 50,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Grate carrots; cook in milk on low, stirring, until milk reduces.",
      },
      {
        step: 2,
        text: "Add sugar and ghee; cook until glossy and thick.",
      },
      {
        step: 3,
        text: "Finish with a pinch of cardamom substitute garam masala if desired.",
      },
    ],
    ingredients: [
      {
        canonical: "carrot",
        quantity: "500 g",
      },
      {
        canonical: "milk",
        quantity: "2 cups",
      },
      {
        canonical: "sugar",
      },
      {
        canonical: "ghee",
      },
      {
        canonical: "garam_masala",
        quantity: "pinch",
        required: false,
      },
    ],
    name_hi: "गाजर का हलवा",
    homemade_score: 9,
  },
  {
    slug: "palak-dal",
    name: "Palak Dal",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 35,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Cook toor dal with turmeric and salt until soft.",
      },
      {
        step: 2,
        text: "Blanch chopped spinach; sauté with garlic and cumin in oil.",
      },
      {
        step: 3,
        text: "Stir spinach into dal and simmer 5 minutes.",
      },
    ],
    ingredients: [
      {
        canonical: "lentil_toor",
        quantity: "3/4 cup",
      },
      {
        canonical: "spinach",
        quantity: "2 cups",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "garlic",
      },
    ],
    name_hi: "पालक दाल",
    homemade_score: 9,
  },
  {
    slug: "tomato-dal",
    name: "Tomato Dal",
    region: "south",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 35,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Boil toor dal with turmeric until smooth.",
      },
      {
        step: 2,
        text: "Sauté mustard, garlic, green chili, and mashed tomato in oil.",
      },
      {
        step: 3,
        text: "Stir into dal, add salt, and boil 5 minutes.",
      },
    ],
    ingredients: [
      {
        canonical: "lentil_toor",
        quantity: "1 cup",
      },
      {
        canonical: "tomato",
        quantity: "2",
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "टमाटर दाल",
    homemade_score: 9,
  },
  {
    slug: "methi-dal",
    name: "Methi Dal",
    region: "west",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 40,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Pressure-cook toor dal with turmeric and salt.",
      },
      {
        step: 2,
        text: "Sauté fenugreek leaves with onion, ginger, and green chili until wilted.",
      },
      {
        step: 3,
        text: "Combine with dal, simmer, and finish with lemon juice.",
      },
    ],
    ingredients: [
      {
        canonical: "lentil_toor",
        quantity: "1 cup",
      },
      {
        canonical: "fenugreek_leaves",
        quantity: "1 cup",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "lemon",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "मेथी दाल",
    homemade_score: 8,
  },
  {
    slug: "sambar",
    name: "Home-style Sambar",
    region: "south",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 50,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Cook toor dal soft; mash lightly with tamarind water, salt, and turmeric.",
      },
      {
        step: 2,
        text: "Boil potato, carrot, and bottle gourd until tender; add to dal.",
      },
      {
        step: 3,
        text: "Fry mustard, curry leaves, onion, and spices in oil; pour in and simmer.",
      },
    ],
    ingredients: [
      {
        canonical: "lentil_toor",
        quantity: "1/2 cup",
      },
      {
        canonical: "potato",
      },
      {
        canonical: "carrot",
      },
      {
        canonical: "bottle_gourd",
      },
      {
        canonical: "tamarind",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "curry_leaves",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "coriander_powder",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
    ],
    name_hi: "सांभर",
    homemade_score: 9,
  },
  {
    slug: "rasam",
    name: "Tomato Rasam",
    region: "south",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 30,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Boil tomato, tamarind, turmeric, and salt in water 10 minutes.",
      },
      {
        step: 2,
        text: "Add cooked toor dal and simmer until soupy.",
      },
      {
        step: 3,
        text: "Temper mustard, cumin, curry leaves, and garlic in ghee; pour in.",
      },
    ],
    ingredients: [
      {
        canonical: "tomato",
        quantity: "2",
      },
      {
        canonical: "tamarind",
      },
      {
        canonical: "lentil_toor",
        quantity: "1/4 cup",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "curry_leaves",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "ghee",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
    ],
    name_hi: "रसम",
    homemade_score: 9,
  },
  {
    slug: "kadhi-pakora",
    name: "Kadhi Pakora",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 50,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Whisk besan and yogurt with water, turmeric, and salt; simmer to a thin kadhi.",
      },
      {
        step: 2,
        text: "Fry spoonfuls of thick besan-onion batter as pakoras; add to kadhi.",
      },
      {
        step: 3,
        text: "Temper cumin, red chili, and garlic in ghee; pour over and serve with rice.",
      },
    ],
    ingredients: [
      {
        canonical: "besan",
        quantity: "1 cup",
      },
      {
        canonical: "yogurt",
        quantity: "1 cup",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "ghee",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "कढ़ी पकोड़ा",
    homemade_score: 9,
  },
  {
    slug: "plain-kadhi",
    name: "Plain Kadhi",
    region: "west",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 35,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Blend besan with yogurt, water, turmeric, and salt until smooth.",
      },
      {
        step: 2,
        text: "Simmer on low, stirring, until kadhi thickens slightly.",
      },
      {
        step: 3,
        text: "Temper mustard, cumin, curry leaves, and green chili in ghee.",
      },
    ],
    ingredients: [
      {
        canonical: "besan",
        quantity: "1/3 cup",
      },
      {
        canonical: "yogurt",
        quantity: "1 cup",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "curry_leaves",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "ghee",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
    ],
    name_hi: "कढ़ी",
    homemade_score: 9,
  },
  {
    slug: "chana-masala",
    name: "Chana Masala",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 45,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Soak chickpeas overnight; boil with salt until tender.",
      },
      {
        step: 2,
        text: "Sauté onion, tomato, ginger, garlic, and spice powders until oil separates.",
      },
      {
        step: 3,
        text: "Add chickpeas and simmer; finish with garam masala and coriander.",
      },
    ],
    ingredients: [
      {
        canonical: "chickpea",
        quantity: "2 cups soaked",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "coriander_powder",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "चना मसाला",
    homemade_score: 9,
  },
  {
    slug: "chole",
    name: "Punjabi Chole",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 50,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Pressure-cook soaked chickpeas with tea substitute turmeric and salt until soft.",
      },
      {
        step: 2,
        text: "Cook onion-tomato masala with chole spices in oil until thick.",
      },
      {
        step: 3,
        text: "Add chickpeas and simmer; mash a few for thickness.",
      },
    ],
    ingredients: [
      {
        canonical: "chickpea",
        quantity: "2 cups soaked",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "coriander_powder",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "छोले",
    homemade_score: 9,
  },
  {
    slug: "dal-makhani-style",
    name: "Home Dal Makhani",
    region: "north",
    meal_type: "dinner",
    veg: true,
    prep_time_min: 60,
    difficulty: "hard",
    instructions: [
      {
        step: 1,
        text: "Soak urad and chana dal; slow-cook with salt and turmeric until creamy.",
      },
      {
        step: 2,
        text: "Sauté onion, tomato, ginger, garlic, and butter until rich.",
      },
      {
        step: 3,
        text: "Combine and simmer on low 20 minutes; finish with cream substitute yogurt swirl.",
      },
    ],
    ingredients: [
      {
        canonical: "black_gram_urad",
        quantity: "1 cup",
      },
      {
        canonical: "lentil_chana",
        quantity: "1/4 cup",
      },
      {
        canonical: "butter",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "yogurt",
        quantity: "2 tbsp",
        required: false,
      },
    ],
    name_hi: "दाल मखनी",
    homemade_score: 8,
  },
  {
    slug: "aloo-sabzi",
    name: "Aloo ki Sabzi",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 25,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Heat oil, add cumin and asafoetida, then potato cubes and turmeric.",
      },
      {
        step: 2,
        text: "Cover and cook on low, stirring, until potatoes soften.",
      },
      {
        step: 3,
        text: "Add salt, red chili, and coriander powder; finish with fresh coriander.",
      },
    ],
    ingredients: [
      {
        canonical: "potato",
        quantity: "4 medium",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "asafoetida",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "coriander_powder",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "आलू की सब्जी",
    homemade_score: 10,
  },
  {
    slug: "aloo-tomato",
    name: "Aloo Tamatar",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 30,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Sauté cumin, onion, and ginger in oil until golden.",
      },
      {
        step: 2,
        text: "Add potato and tomato with turmeric and salt; cover and cook until tender.",
      },
      {
        step: 3,
        text: "Mash a little tomato into a gravy and simmer 2 minutes.",
      },
    ],
    ingredients: [
      {
        canonical: "potato",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "आलू टमाटर",
    homemade_score: 10,
  },
  {
    slug: "aloo-gobi",
    name: "Aloo Gobi",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 35,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Heat oil with cumin; add potato and cauliflower florets with turmeric.",
      },
      {
        step: 2,
        text: "Cover and cook on medium, stirring, until vegetables are tender.",
      },
      {
        step: 3,
        text: "Add salt, red chili, and garam masala; garnish with coriander.",
      },
    ],
    ingredients: [
      {
        canonical: "potato",
      },
      {
        canonical: "cauliflower",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "आलू गोभी",
    homemade_score: 10,
  },
  {
    slug: "aloo-matar",
    name: "Aloo Matar",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 30,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Sauté cumin, onion, and ginger-garlic in oil.",
      },
      {
        step: 2,
        text: "Add potato, peas, tomato, and spices; cover with little water.",
      },
      {
        step: 3,
        text: "Cook until potatoes are done and gravy coats the vegetables.",
      },
    ],
    ingredients: [
      {
        canonical: "potato",
      },
      {
        canonical: "peas",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "coriander_powder",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "आलू मटर",
    homemade_score: 10,
  },
  {
    slug: "aloo-bhindi",
    name: "Aloo Bhindi",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 35,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Pan-fry okra in little oil until less slimy; set aside.",
      },
      {
        step: 2,
        text: "Sauté potato with cumin and spices until half done.",
      },
      {
        step: 3,
        text: "Add okra, salt, and amchur substitute lemon; cook covered 8 minutes.",
      },
    ],
    ingredients: [
      {
        canonical: "okra",
      },
      {
        canonical: "potato",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "coriander_powder",
      },
      {
        canonical: "lemon",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "आलू भिंडी",
    homemade_score: 9,
  },
  {
    slug: "jeera-aloo",
    name: "Jeera Aloo",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 20,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Boil potatoes, peel, and cube.",
      },
      {
        step: 2,
        text: "Temper cumin in ghee, add potatoes, salt, and turmeric.",
      },
      {
        step: 3,
        text: "Toss on high heat until lightly crisp edges form.",
      },
    ],
    ingredients: [
      {
        canonical: "potato",
        quantity: "4",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "ghee",
      },
      {
        canonical: "green_chili",
        required: false,
      },
    ],
    name_hi: "जीरा आलू",
    homemade_score: 10,
  },
  {
    slug: "dahi-aloo",
    name: "Dahi Wale Aloo",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 30,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Boil and cube potatoes.",
      },
      {
        step: 2,
        text: "Sauté cumin, green chili, and ginger in oil; add whisked yogurt off heat slowly.",
      },
      {
        step: 3,
        text: "Fold in potatoes, salt, and turmeric; warm gently without curdling.",
      },
    ],
    ingredients: [
      {
        canonical: "potato",
      },
      {
        canonical: "yogurt",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "दही आलू",
    homemade_score: 8,
  },
  {
    slug: "bhindi-masala",
    name: "Bhindi Masala",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 30,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Wash and dry okra; slice and shallow-fry in oil until lightly browned.",
      },
      {
        step: 2,
        text: "Sauté onion, tomato, ginger, and spice powders until oil separates.",
      },
      {
        step: 3,
        text: "Return bhindi, add salt, and toss on medium heat 5 minutes until coated.",
      },
    ],
    ingredients: [
      {
        canonical: "okra",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "coriander_powder",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "भिंडी मसाला",
    homemade_score: 9,
  },
  {
    slug: "baingan-bharta",
    name: "Baingan Bharta",
    region: "north",
    meal_type: "dinner",
    veg: true,
    prep_time_min: 40,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Roast brinjal on flame until charred; peel and mash.",
      },
      {
        step: 2,
        text: "Sauté onion, tomato, ginger, garlic, and green chili with spices.",
      },
      {
        step: 3,
        text: "Mix in mashed brinjal and cook 10 minutes; finish with butter.",
      },
    ],
    ingredients: [
      {
        canonical: "brinjal",
        quantity: "2 large",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "butter",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "बैंगन भरता",
    homemade_score: 9,
  },
  {
    slug: "baingan-sabzi",
    name: "Baingan ki Sabzi",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 30,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Cube brinjal and fry briefly in oil with cumin and turmeric.",
      },
      {
        step: 2,
        text: "Add onion, tomato, salt, and spices; cover until soft.",
      },
      {
        step: 3,
        text: "Uncover and cook 2 minutes more until oil shows; garnish with coriander if available.",
      },
    ],
    ingredients: [
      {
        canonical: "brinjal",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "बैंगन की सब्जी",
    homemade_score: 9,
  },
  {
    slug: "lauki-sabzi",
    name: "Lauki ki Sabzi",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 25,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Peel bottle gourd, cube, and sauté with cumin and asafoetida in oil.",
      },
      {
        step: 2,
        text: "Cover and cook with little water, salt, and turmeric until tender.",
      },
      {
        step: 3,
        text: "Optional finish with tomato and coriander.",
      },
    ],
    ingredients: [
      {
        canonical: "bottle_gourd",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "asafoetida",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "tomato",
        required: false,
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "लौकी की सब्जी",
    homemade_score: 9,
  },
  {
    slug: "turai-sabzi",
    name: "Turai ki Sabzi",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 25,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Sauté ridge gourd rounds with onion, cumin, and turmeric.",
      },
      {
        step: 2,
        text: "Cook covered with salt until gourd is tender and water released dries up.",
      },
      {
        step: 3,
        text: "Open lid and sauté 2 minutes on high to lightly brown edges.",
      },
    ],
    ingredients: [
      {
        canonical: "ridge_gourd",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "तुरई की सब्जी",
    homemade_score: 9,
  },
  {
    slug: "karela-sabzi",
    name: "Karela Sabzi",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 35,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Salt sliced bitter gourd; rinse after 15 minutes to reduce bitterness.",
      },
      {
        step: 2,
        text: "Sauté with onion, turmeric, and spices until tender.",
      },
      {
        step: 3,
        text: "Finish with a little jaggery substitute sugar if desired.",
      },
    ],
    ingredients: [
      {
        canonical: "bitter_gourd",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "coriander_powder",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "sugar",
        quantity: "1 tsp",
        required: false,
      },
    ],
    name_hi: "करेला की सब्जी",
    homemade_score: 8,
  },
  {
    slug: "palak-paneer",
    name: "Palak Paneer",
    region: "north",
    meal_type: "dinner",
    veg: true,
    prep_time_min: 40,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Blanch spinach, blend smooth, and cook with ginger and green chili.",
      },
      {
        step: 2,
        text: "Sauté paneer cubes lightly in ghee; add to spinach gravy with salt.",
      },
      {
        step: 3,
        text: "Simmer 5 minutes and swirl in cream substitute yogurt if you like.",
      },
    ],
    ingredients: [
      {
        canonical: "spinach",
      },
      {
        canonical: "paneer",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "ghee",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "yogurt",
        quantity: "2 tbsp",
        required: false,
      },
    ],
    name_hi: "पालक पनीर",
    homemade_score: 8,
  },
  {
    slug: "paneer-bhurji",
    name: "Paneer Bhurji",
    region: "north",
    meal_type: "breakfast",
    veg: true,
    prep_time_min: 20,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Crumble paneer coarsely.",
      },
      {
        step: 2,
        text: "Sauté onion, tomato, green chili, and ginger with turmeric and spices.",
      },
      {
        step: 3,
        text: "Add paneer, salt, and toss 3 minutes; garnish with coriander.",
      },
    ],
    ingredients: [
      {
        canonical: "paneer",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "पनीर भुर्जी",
    homemade_score: 9,
  },
  {
    slug: "paneer-butter-masala",
    name: "Paneer Butter Masala",
    region: "north",
    meal_type: "dinner",
    veg: true,
    prep_time_min: 45,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Cook tomato-onion-ginger-garlic masala with butter and kasuri substitute fenugreek leaves.",
      },
      {
        step: 2,
        text: "Blend smooth if you like; add paneer cubes, salt, and cream substitute yogurt.",
      },
      {
        step: 3,
        text: "Simmer gently 8 minutes.",
      },
    ],
    ingredients: [
      {
        canonical: "paneer",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "butter",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "fenugreek_leaves",
      },
      {
        canonical: "yogurt",
      },
      {
        canonical: "salt",
      },
    ],
    name_hi: "पनीर बटर मसाला",
    homemade_score: 8,
  },
  {
    slug: "matar-paneer",
    name: "Matar Paneer",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 35,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Sauté cumin, onion, and tomato masala with spices.",
      },
      {
        step: 2,
        text: "Add peas and a splash of water; cook 5 minutes.",
      },
      {
        step: 3,
        text: "Fold in paneer cubes and simmer gently.",
      },
    ],
    ingredients: [
      {
        canonical: "paneer",
      },
      {
        canonical: "peas",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "coriander_powder",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "मटर पनीर",
    homemade_score: 9,
  },
  {
    slug: "paneer-capsicum",
    name: "Paneer Capsicum",
    region: "pan_india",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 30,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Sauté capsicum strips with onion, ginger, and garlic in oil.",
      },
      {
        step: 2,
        text: "Add tomato and spice powders; cook until tomatoes soften.",
      },
      {
        step: 3,
        text: "Add paneer cubes and toss on high heat 4 minutes until lightly golden.",
      },
    ],
    ingredients: [
      {
        canonical: "paneer",
      },
      {
        canonical: "capsicum",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    homemade_score: 8,
  },
  {
    slug: "aloo-paneer",
    name: "Aloo Paneer",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 35,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Shallow-fry potato cubes; set aside.",
      },
      {
        step: 2,
        text: "Cook onion-tomato gravy with spices; add paneer and potato.",
      },
      {
        step: 3,
        text: "Simmer with little water until flavors meld.",
      },
    ],
    ingredients: [
      {
        canonical: "potato",
      },
      {
        canonical: "paneer",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "coriander_powder",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    homemade_score: 8,
  },
  {
    slug: "gobi-sabzi",
    name: "Gobi ki Sabzi",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 30,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Separate cauliflower florets; parboil briefly.",
      },
      {
        step: 2,
        text: "Sauté cumin, onion, and tomato with turmeric and spices.",
      },
      {
        step: 3,
        text: "Add gobi, salt, and cook covered until tender.",
      },
    ],
    ingredients: [
      {
        canonical: "cauliflower",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "गोभी की सब्जी",
    homemade_score: 9,
  },
  {
    slug: "gobi-matar",
    name: "Gobi Matar",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 30,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Fry cauliflower lightly in oil with cumin and turmeric.",
      },
      {
        step: 2,
        text: "Add peas, tomato, salt, and spices; cover until done.",
      },
      {
        step: 3,
        text: "Garnish with coriander and serve with roti or rice.",
      },
    ],
    ingredients: [
      {
        canonical: "cauliflower",
      },
      {
        canonical: "peas",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "coriander_powder",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "गोभी मटर",
    homemade_score: 9,
  },
  {
    slug: "cabbage-sabzi",
    name: "Patta Gobi Sabzi",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 25,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Shred cabbage; heat oil with cumin and asafoetida.",
      },
      {
        step: 2,
        text: "Add cabbage, turmeric, salt, and green chili; stir-fry on high until wilted but crisp.",
      },
      {
        step: 3,
        text: "Serve hot as a dry side with dal and chapati.",
      },
    ],
    ingredients: [
      {
        canonical: "cabbage",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "asafoetida",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "पत्ता गोभी",
    homemade_score: 9,
  },
  {
    slug: "carrot-sabzi",
    name: "Gajar ki Sabzi",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 25,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Sauté cumin and asafoetida in oil; add julienned carrot.",
      },
      {
        step: 2,
        text: "Cover with little water, salt, and turmeric; cook until tender.",
      },
      {
        step: 3,
        text: "Finish with coriander and a pinch of sugar optional.",
      },
    ],
    ingredients: [
      {
        canonical: "carrot",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "asafoetida",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
      {
        canonical: "sugar",
        required: false,
      },
    ],
    name_hi: "गाजर की सब्जी",
    homemade_score: 9,
  },
  {
    slug: "mixed-veg",
    name: "Mix Veg Sabzi",
    region: "pan_india",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 35,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Chop potato, carrot, peas, beans substitute capsicum, and cauliflower.",
      },
      {
        step: 2,
        text: "Sauté cumin, onion, ginger, and tomato masala.",
      },
      {
        step: 3,
        text: "Add vegetables, salt, spices, and cook covered until tender.",
      },
    ],
    ingredients: [
      {
        canonical: "potato",
      },
      {
        canonical: "carrot",
      },
      {
        canonical: "peas",
      },
      {
        canonical: "cauliflower",
      },
      {
        canonical: "capsicum",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "coriander_powder",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "मिक्स वेज",
    homemade_score: 9,
  },
  {
    slug: "aloo-shimla",
    name: "Aloo Capsicum",
    region: "pan_india",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 25,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Sauté potato cubes with cumin and turmeric until half cooked.",
      },
      {
        step: 2,
        text: "Add capsicum, onion, salt, and spices; cook until peppers soften.",
      },
      {
        step: 3,
        text: "Finish with garam masala and serve immediately.",
      },
    ],
    ingredients: [
      {
        canonical: "potato",
      },
      {
        canonical: "capsicum",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    homemade_score: 8,
  },
  {
    slug: "methi-aloo",
    name: "Methi Aloo",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 30,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Sauté potato with cumin, turmeric, and salt until golden.",
      },
      {
        step: 2,
        text: "Add chopped fenugreek leaves and cook covered until greens wilt.",
      },
      {
        step: 3,
        text: "Check seasoning and serve with plain roti.",
      },
    ],
    ingredients: [
      {
        canonical: "potato",
      },
      {
        canonical: "fenugreek_leaves",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "मेथी आलू",
    homemade_score: 9,
  },
  {
    slug: "soy-curry",
    name: "Soya Chunk Curry",
    region: "pan_india",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 40,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Soak soy chunks in hot water; squeeze dry.",
      },
      {
        step: 2,
        text: "Sauté onion-tomato masala with ginger-garlic and spices.",
      },
      {
        step: 3,
        text: "Add chunks and simmer with water until spongy and flavorful.",
      },
    ],
    ingredients: [
      {
        canonical: "soy_chunks",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "coriander_powder",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "सोया करी",
    homemade_score: 7,
  },
  {
    slug: "soy-masala",
    name: "Soya Keema Masala",
    region: "north",
    meal_type: "dinner",
    veg: true,
    prep_time_min: 35,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Pulse soaked soy chunks coarsely after squeezing.",
      },
      {
        step: 2,
        text: "Brown with onion, ginger, garlic, and spice powders.",
      },
      {
        step: 3,
        text: "Add tomato and cook until dry masala coats soya.",
      },
    ],
    ingredients: [
      {
        canonical: "soy_chunks",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    homemade_score: 7,
  },
  {
    slug: "veg-pulao",
    name: "Vegetable Pulao",
    region: "pan_india",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 40,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Wash rice; soak 20 minutes.",
      },
      {
        step: 2,
        text: "Sauté whole spices substitute cumin, bay substitute curry leaves, onion, and mixed veg in ghee.",
      },
      {
        step: 3,
        text: "Add rice, water, salt; cook covered on low until rice is fluffy.",
      },
    ],
    ingredients: [
      {
        canonical: "rice",
        quantity: "1.5 cups",
      },
      {
        canonical: "carrot",
      },
      {
        canonical: "peas",
      },
      {
        canonical: "potato",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "ghee",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
    ],
    name_hi: "वेज पुलाव",
    homemade_score: 8,
  },
  {
    slug: "jeera-rice",
    name: "Jeera Rice",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 25,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Boil rice with salt until done; drain if needed.",
      },
      {
        step: 2,
        text: "Temper cumin in ghee until fragrant; toss rice gently.",
      },
      {
        step: 3,
        text: "Fluff and serve with any dal or curry.",
      },
    ],
    ingredients: [
      {
        canonical: "rice",
        quantity: "2 cups cooked",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "ghee",
      },
      {
        canonical: "salt",
      },
    ],
    name_hi: "जीरा चावल",
    homemade_score: 9,
  },
  {
    slug: "steamed-rice",
    name: "Steamed Rice",
    region: "pan_india",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 20,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Wash rice until water runs clear.",
      },
      {
        step: 2,
        text: "Boil with measured water and salt, or pressure cook 2 whistles.",
      },
      {
        step: 3,
        text: "Rest 5 minutes and fluff with a fork.",
      },
    ],
    ingredients: [
      {
        canonical: "rice",
        quantity: "1 cup",
      },
      {
        canonical: "water",
        quantity: "2 cups",
      },
      {
        canonical: "salt",
      },
    ],
    name_hi: "चावल",
    homemade_score: 10,
  },
  {
    slug: "chapati",
    name: "Chapati",
    region: "pan_india",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 25,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Knead wheat flour, salt, and water to a soft dough; rest 15 minutes.",
      },
      {
        step: 2,
        text: "Roll thin discs and cook on hot tawa until puffed spots appear.",
      },
      {
        step: 3,
        text: "Optional brush of ghee on top.",
      },
    ],
    ingredients: [
      {
        canonical: "wheat_flour",
        quantity: "2 cups",
      },
      {
        canonical: "water",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "ghee",
        required: false,
      },
    ],
    name_hi: "चपाती",
    homemade_score: 10,
  },
  {
    slug: "phulka",
    name: "Phulka",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 25,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Knead atta dough; roll small rounds.",
      },
      {
        step: 2,
        text: "Cook on tawa, then puff directly on flame for a few seconds.",
      },
      {
        step: 3,
        text: "Wrap in a cloth to keep soft until serving.",
      },
    ],
    ingredients: [
      {
        canonical: "wheat_flour",
      },
      {
        canonical: "water",
      },
      {
        canonical: "salt",
      },
    ],
    name_hi: "फुल्का",
    homemade_score: 10,
  },
  {
    slug: "cucumber-raita",
    name: "Kheera Raita",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 10,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Whisk yogurt with salt and roasted cumin.",
      },
      {
        step: 2,
        text: "Stir in grated cucumber; chill briefly before serving.",
      },
      {
        step: 3,
        text: "Serve cold alongside paratha, pulao, or biryani.",
      },
    ],
    ingredients: [
      {
        canonical: "yogurt",
      },
      {
        canonical: "cucumber",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "red_chili_powder",
        required: false,
      },
    ],
    name_hi: "खीरा रायता",
    homemade_score: 10,
  },
  {
    slug: "onion-tomato-raita",
    name: "Onion Tomato Raita",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 10,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Beat yogurt smooth with salt.",
      },
      {
        step: 2,
        text: "Mix in finely chopped onion and tomato; garnish with coriander.",
      },
      {
        step: 3,
        text: "Chill 10 minutes before serving as a cooling side.",
      },
    ],
    ingredients: [
      {
        canonical: "yogurt",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cumin",
        required: false,
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    homemade_score: 9,
  },
  {
    slug: "coconut-chutney",
    name: "Coconut Chutney",
    region: "south",
    meal_type: "snack",
    veg: true,
    prep_time_min: 15,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Grind coconut with green chili, ginger, and salt to a coarse paste.",
      },
      {
        step: 2,
        text: "Temper mustard and curry leaves in oil; pour over chutney.",
      },
      {
        step: 3,
        text: "Serve fresh with dosa, idli, or upma the same day.",
      },
    ],
    ingredients: [
      {
        canonical: "coconut",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "curry_leaves",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "water",
        quantity: "2 tbsp",
      },
    ],
    name_hi: "नारियल चटनी",
    homemade_score: 9,
  },
  {
    slug: "tomato-chutney",
    name: "Tomato Chutney",
    region: "south",
    meal_type: "snack",
    veg: true,
    prep_time_min: 20,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Sauté tomato with green chili, garlic, and salt until mushy.",
      },
      {
        step: 2,
        text: "Cool and mash; temper mustard and curry leaves in oil.",
      },
      {
        step: 3,
        text: "Serve at room temperature with snacks or rice.",
      },
    ],
    ingredients: [
      {
        canonical: "tomato",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "curry_leaves",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "टमाटर चटनी",
    homemade_score: 9,
  },
  {
    slug: "onion-pakoda",
    name: "Pyaz Pakoda",
    region: "north",
    meal_type: "snack",
    veg: true,
    prep_time_min: 25,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Slice onion; mix with besan, salt, red chili, and little water to coat.",
      },
      {
        step: 2,
        text: "Drop spoonfuls into hot oil and fry till crisp and golden.",
      },
      {
        step: 3,
        text: "Drain on paper and serve hot with chai or chutney.",
      },
    ],
    ingredients: [
      {
        canonical: "onion",
      },
      {
        canonical: "besan",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "प्याज पकोड़ा",
    homemade_score: 9,
  },
  {
    slug: "aloo-pakoda",
    name: "Aloo Pakoda",
    region: "north",
    meal_type: "snack",
    veg: true,
    prep_time_min: 25,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Slice potato thin; dip in thick besan batter seasoned with salt and chili.",
      },
      {
        step: 2,
        text: "Deep-fry in hot oil until crisp.",
      },
      {
        step: 3,
        text: "Sprinkle a little extra salt and serve immediately.",
      },
    ],
    ingredients: [
      {
        canonical: "potato",
      },
      {
        canonical: "besan",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "आलू पकोड़ा",
    homemade_score: 9,
  },
  {
    slug: "bread-pakora",
    name: "Bread Pakora",
    region: "north",
    meal_type: "snack",
    veg: true,
    prep_time_min: 20,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Make potato masala with cumin, chili, and salt.",
      },
      {
        step: 2,
        text: "Sandwich between bread slices, dip in besan batter, and fry till golden.",
      },
      {
        step: 3,
        text: "Cut into triangles and serve with tomato chutney.",
      },
    ],
    ingredients: [
      {
        canonical: "bread",
      },
      {
        canonical: "potato",
      },
      {
        canonical: "besan",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    homemade_score: 8,
  },
  {
    slug: "kachumber",
    name: "Kachumber Salad",
    region: "north",
    meal_type: "snack",
    veg: true,
    prep_time_min: 10,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Finely dice cucumber, tomato, and onion.",
      },
      {
        step: 2,
        text: "Toss with lemon juice, salt, and optional green chili.",
      },
      {
        step: 3,
        text: "Rest 5 minutes so flavors meld before serving.",
      },
    ],
    ingredients: [
      {
        canonical: "cucumber",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "lemon",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "green_chili",
        required: false,
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    name_hi: "कचूंबर",
    homemade_score: 10,
  },
  {
    slug: "cucumber-salad",
    name: "Kheera Salad",
    region: "pan_india",
    meal_type: "snack",
    veg: true,
    prep_time_min: 5,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Slice cucumber and sprinkle salt and lemon juice.",
      },
      {
        step: 2,
        text: "Toss well and chill 5 minutes if you have time.",
      },
      {
        step: 3,
        text: "Serve immediately as a refreshing side.",
      },
    ],
    ingredients: [
      {
        canonical: "cucumber",
      },
      {
        canonical: "lemon",
      },
      {
        canonical: "salt",
      },
    ],
    homemade_score: 10,
  },
  {
    slug: "besan-halwa",
    name: "Besan Halwa",
    region: "north",
    meal_type: "snack",
    veg: true,
    prep_time_min: 30,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Roast besan in ghee until deep golden and fragrant.",
      },
      {
        step: 2,
        text: "Add warm water and sugar; stir until halwa leaves sides of pan.",
      },
      {
        step: 3,
        text: "Serve warm in small bowls.",
      },
    ],
    ingredients: [
      {
        canonical: "besan",
      },
      {
        canonical: "ghee",
      },
      {
        canonical: "sugar",
      },
      {
        canonical: "water",
      },
    ],
    name_hi: "बेसन हलवा",
    homemade_score: 8,
  },
  {
    slug: "potato-sandwich",
    name: "Aloo Sandwich",
    region: "west",
    meal_type: "snack",
    veg: true,
    prep_time_min: 15,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Season mashed boiled potato with cumin, chili, and salt.",
      },
      {
        step: 2,
        text: "Spread on bread, grill with butter on tawa until crisp.",
      },
      {
        step: 3,
        text: "Cut diagonally and serve hot.",
      },
    ],
    ingredients: [
      {
        canonical: "bread",
      },
      {
        canonical: "potato",
      },
      {
        canonical: "butter",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "salt",
      },
    ],
    homemade_score: 8,
  },
  {
    slug: "bread-butter",
    name: "Bread Butter",
    region: "pan_india",
    meal_type: "snack",
    veg: true,
    prep_time_min: 5,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Toast or warm bread slices on tawa.",
      },
      {
        step: 2,
        text: "Spread butter while hot.",
      },
      {
        step: 3,
        text: "Serve immediately while the bread is still warm.",
      },
    ],
    ingredients: [
      {
        canonical: "bread",
      },
      {
        canonical: "butter",
      },
    ],
    homemade_score: 10,
  },
  {
    slug: "paneer-tikka-pan",
    name: "Pan Paneer Tikka",
    region: "north",
    meal_type: "snack",
    veg: true,
    prep_time_min: 25,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Marinate paneer cubes in yogurt, ginger, garlic, and spice powders 20 minutes.",
      },
      {
        step: 2,
        text: "Pan-sear in little oil until charred spots appear.",
      },
      {
        step: 3,
        text: "Serve with lemon and onion rings.",
      },
    ],
    ingredients: [
      {
        canonical: "paneer",
      },
      {
        canonical: "yogurt",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "lemon",
      },
      {
        canonical: "onion",
        required: false,
      },
      {
        canonical: "cooking_oil",
      },
    ],
    homemade_score: 8,
  },
  {
    slug: "chicken-curry",
    name: "Ghar ka Chicken Curry",
    region: "pan_india",
    meal_type: "dinner",
    veg: false,
    prep_time_min: 50,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Marinate chicken with salt, turmeric, and lemon 20 minutes.",
      },
      {
        step: 2,
        text: "Brown onion-ginger-garlic masala in oil; add tomato and spice powders.",
      },
      {
        step: 3,
        text: "Add chicken and water; simmer covered until cooked and gravy thickens.",
      },
    ],
    ingredients: [
      {
        canonical: "chicken",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "coriander_powder",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "lemon",
        required: false,
      },
    ],
    name_hi: "चिकन करी",
    homemade_score: 9,
  },
  {
    slug: "chicken-potato",
    name: "Aloo Chicken",
    region: "north",
    meal_type: "dinner",
    veg: false,
    prep_time_min: 45,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Sauté onion, ginger, garlic, and spices in oil.",
      },
      {
        step: 2,
        text: "Add chicken and potato cubes; brown lightly.",
      },
      {
        step: 3,
        text: "Add water and salt; pressure cook or simmer until done.",
      },
    ],
    ingredients: [
      {
        canonical: "chicken",
      },
      {
        canonical: "potato",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "coriander_powder",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    homemade_score: 9,
  },
  {
    slug: "chicken-spinach",
    name: "Chicken Palak",
    region: "north",
    meal_type: "dinner",
    veg: false,
    prep_time_min: 45,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Cook spinach puree with ginger and green chili.",
      },
      {
        step: 2,
        text: "Brown chicken separately with onion and spices.",
      },
      {
        step: 3,
        text: "Combine and simmer until chicken is tender.",
      },
    ],
    ingredients: [
      {
        canonical: "chicken",
      },
      {
        canonical: "spinach",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    homemade_score: 8,
  },
  {
    slug: "chicken-roast",
    name: "Dry Chicken Masala",
    region: "south",
    meal_type: "dinner",
    veg: false,
    prep_time_min: 40,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Marinate chicken with turmeric, red chili, salt, and ginger-garlic.",
      },
      {
        step: 2,
        text: "Cook covered with little water until almost dry.",
      },
      {
        step: 3,
        text: "Roast on high with curry leaves and coconut optional until browned.",
      },
    ],
    ingredients: [
      {
        canonical: "chicken",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "curry_leaves",
      },
      {
        canonical: "coconut",
        quantity: "2 tbsp grated",
        required: false,
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    homemade_score: 8,
  },
  {
    slug: "egg-curry",
    name: "Egg Curry",
    region: "east",
    meal_type: "lunch",
    veg: false,
    prep_time_min: 30,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Boil eggs, peel, and prick lightly.",
      },
      {
        step: 2,
        text: "Prepare onion-tomato gravy with ginger-garlic and spices.",
      },
      {
        step: 3,
        text: "Add eggs and simmer 8 minutes in gravy.",
      },
    ],
    ingredients: [
      {
        canonical: "egg",
        quantity: "4",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "coriander_powder",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "water",
      },
    ],
    name_hi: "अंडा करी",
    homemade_score: 9,
  },
  {
    slug: "egg-masala",
    name: "Egg Masala",
    region: "pan_india",
    meal_type: "lunch",
    veg: false,
    prep_time_min: 25,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Hard-boil eggs and halve.",
      },
      {
        step: 2,
        text: "Cook thick onion-tomato masala with spices.",
      },
      {
        step: 3,
        text: "Place eggs cut-side down in masala; coat and simmer 5 minutes.",
      },
    ],
    ingredients: [
      {
        canonical: "egg",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "garam_masala",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "अंडा मसाला",
    homemade_score: 9,
  },
  {
    slug: "egg-fried-rice",
    name: "Egg Fried Rice",
    region: "east",
    meal_type: "lunch",
    veg: false,
    prep_time_min: 25,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Scramble eggs in oil; set aside.",
      },
      {
        step: 2,
        text: "Stir-fry onion, carrot, peas, and green chili; add cold rice and salt.",
      },
      {
        step: 3,
        text: "Toss in eggs and soy substitute extra salt and pepper chili.",
      },
    ],
    ingredients: [
      {
        canonical: "rice",
        quantity: "2 cups cooked",
      },
      {
        canonical: "egg",
        quantity: "2",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "carrot",
      },
      {
        canonical: "peas",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    homemade_score: 8,
  },
  {
    slug: "mustard-egg-curry",
    name: "Mustard Egg Curry",
    region: "east",
    meal_type: "lunch",
    veg: false,
    prep_time_min: 30,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Grind mustard seeds soaked substitute with green chili and turmeric.",
      },
      {
        step: 2,
        text: "Boil eggs in this mustard gravy with water and salt.",
      },
      {
        step: 3,
        text: "Temper nigella substitute cumin in mustard oil.",
      },
    ],
    ingredients: [
      {
        canonical: "egg",
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "mustard_oil",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
    ],
    name_hi: "सरसों अंडा",
    description: "Bengali-style egg in mustard gravy—home adaptation without fish.",
    homemade_score: 8,
  },
  {
    slug: "lauki-dahi",
    name: "Lauki with Yogurt",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 30,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Cook bottle gourd with turmeric and salt until soft.",
      },
      {
        step: 2,
        text: "Stir in beaten yogurt off heat; temper cumin and red chili in ghee.",
      },
      {
        step: 3,
        text: "Serve lukewarm with chapati—do not boil after adding yogurt.",
      },
    ],
    ingredients: [
      {
        canonical: "bottle_gourd",
      },
      {
        canonical: "yogurt",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "ghee",
      },
      {
        canonical: "salt",
      },
    ],
    homemade_score: 8,
  },
  {
    slug: "brinjal-yogurt",
    name: "Baingan Raita Style",
    region: "south",
    meal_type: "snack",
    veg: true,
    prep_time_min: 35,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Roast brinjal, peel, and mash.",
      },
      {
        step: 2,
        text: "Mix into yogurt with salt and temper mustard and curry leaves.",
      },
      {
        step: 3,
        text: "Chill 15 minutes before serving as a side dish.",
      },
    ],
    ingredients: [
      {
        canonical: "brinjal",
      },
      {
        canonical: "yogurt",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "curry_leaves",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    homemade_score: 7,
  },
  {
    slug: "moong-salad",
    name: "Moong Sprout Salad",
    region: "west",
    meal_type: "snack",
    veg: true,
    prep_time_min: 20,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Soak moong dal 8 hours; drain and tie in cloth until sprouted lightly.",
      },
      {
        step: 2,
        text: "Toss with cucumber, onion, lemon, and salt.",
      },
      {
        step: 3,
        text: "Serve fresh the same day for best crunch.",
      },
    ],
    ingredients: [
      {
        canonical: "lentil_moong",
      },
      {
        canonical: "cucumber",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "lemon",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "green_chili",
        required: false,
      },
    ],
    name_hi: "मूंग सलाद",
    homemade_score: 8,
  },
  {
    slug: "tamarind-rice",
    name: "Puliyodharai Style Rice",
    region: "south",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 35,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Cook rice and cool.",
      },
      {
        step: 2,
        text: "Fry tamarind paste with mustard, urad, peanuts substitute peas, and spice powders.",
      },
      {
        step: 3,
        text: "Mix into rice with salt and curry leaves.",
      },
    ],
    ingredients: [
      {
        canonical: "rice",
        quantity: "2 cups cooked",
      },
      {
        canonical: "tamarind",
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "black_gram_urad",
      },
      {
        canonical: "curry_leaves",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "peas",
        required: false,
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    name_hi: "पुलियोधरै",
    homemade_score: 8,
  },
  {
    slug: "urad-dosa-batter",
    name: "Urad Rice Dosa",
    region: "south",
    meal_type: "breakfast",
    veg: true,
    prep_time_min: 480,
    difficulty: "hard",
    instructions: [
      {
        step: 1,
        text: "Soak rice and urad dal separately 6 hours; grind to smooth batter.",
      },
      {
        step: 2,
        text: "Ferment overnight until bubbly.",
      },
      {
        step: 3,
        text: "Spread thin on hot tawa, drizzle oil, and cook till crisp.",
      },
    ],
    ingredients: [
      {
        canonical: "rice",
        quantity: "2 cups",
      },
      {
        canonical: "black_gram_urad",
        quantity: "1/2 cup",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "water",
      },
    ],
    name_hi: "दोसा",
    description: "South Indian fermented crepe—plan ahead for soaking and fermenting.",
    homemade_score: 9,
  },
  {
    slug: "wheat-dosa",
    name: "Godhuma Dosa",
    region: "south",
    meal_type: "breakfast",
    veg: true,
    prep_time_min: 20,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Mix wheat flour, rice flour substitute semolina pinch, salt, and water to thin batter.",
      },
      {
        step: 2,
        text: "Rest 10 minutes; cook lacy dosas on greased pan.",
      },
      {
        step: 3,
        text: "Stack and serve with coconut chutney or pickle.",
      },
    ],
    ingredients: [
      {
        canonical: "wheat_flour",
      },
      {
        canonical: "semolina",
        quantity: "2 tbsp",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "cumin",
        required: false,
      },
    ],
    name_hi: "गेहूं दोसा",
    homemade_score: 8,
  },
  {
    slug: "bengali-ghonto",
    name: "Labra Style Mixed Veg",
    region: "east",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 40,
    difficulty: "medium",
    instructions: [
      {
        step: 1,
        text: "Cut potato, brinjal, ridge gourd, and peas-sized pieces.",
      },
      {
        step: 2,
        text: "Cook together with panch phoron substitute mustard and cumin in mustard oil.",
      },
      {
        step: 3,
        text: "Add turmeric, salt, and a little sugar; slow-cook until mushy homestyle.",
      },
    ],
    ingredients: [
      {
        canonical: "potato",
      },
      {
        canonical: "brinjal",
      },
      {
        canonical: "ridge_gourd",
      },
      {
        canonical: "peas",
      },
      {
        canonical: "mustard_oil",
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "sugar",
        quantity: "1/2 tsp",
      },
    ],
    name_hi: "লাভড়া",
    description: "East Indian mixed vegetable mishmash cooked dry-moist.",
    homemade_score: 8,
  },
  {
    slug: "pitla",
    name: "Besan Pitla",
    region: "west",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 20,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Roast besan in oil with turmeric and red chili.",
      },
      {
        step: 2,
        text: "Whisk in water briskly to avoid lumps; boil to thick pourable consistency.",
      },
      {
        step: 3,
        text: "Temper mustard and curry leaves; serve with bhakri substitute roti.",
      },
    ],
    ingredients: [
      {
        canonical: "besan",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "red_chili_powder",
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "curry_leaves",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "garlic",
        required: false,
      },
    ],
    name_hi: "पिठला",
    homemade_score: 9,
  },
  {
    slug: "zunka",
    name: "Zunka Bhakar Style",
    region: "west",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 25,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Sauté onion, garlic, and green chili in oil.",
      },
      {
        step: 2,
        text: "Stir in besan and dry roast; add water to a thick paste.",
      },
      {
        step: 3,
        text: "Season with turmeric, salt, and mustard temper.",
      },
    ],
    ingredients: [
      {
        canonical: "besan",
      },
      {
        canonical: "onion",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "green_chili",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "curry_leaves",
      },
      {
        canonical: "cooking_oil",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
    ],
    name_hi: "झुणका",
    homemade_score: 9,
  },
  {
    slug: "spinach-dal",
    name: "Palak Moong Dal",
    region: "pan_india",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 35,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Boil moong dal with turmeric and salt.",
      },
      {
        step: 2,
        text: "Add chopped spinach and simmer until wilted.",
      },
      {
        step: 3,
        text: "Temper cumin and garlic in ghee; pour over dal.",
      },
    ],
    ingredients: [
      {
        canonical: "lentil_moong",
      },
      {
        canonical: "spinach",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "ghee",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "garlic",
      },
    ],
    name_hi: "पालक मूंग दाल",
    homemade_score: 9,
  },
  {
    slug: "chicken-soup",
    name: "Chicken Clear Soup",
    region: "pan_india",
    meal_type: "dinner",
    veg: false,
    prep_time_min: 40,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Simmer chicken bones substitute pieces with ginger, garlic, and salt in water.",
      },
      {
        step: 2,
        text: "Skim foam; cook until light broth forms.",
      },
      {
        step: 3,
        text: "Add pepper chili and coriander to serve.",
      },
    ],
    ingredients: [
      {
        canonical: "chicken",
      },
      {
        canonical: "ginger",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
      {
        canonical: "green_chili",
        required: false,
      },
      {
        canonical: "coriander_leaves",
        required: false,
      },
    ],
    homemade_score: 8,
  },
  {
    slug: "stir-fry-cabbage-peas",
    name: "Band Gobi Matar",
    region: "north",
    meal_type: "lunch",
    veg: true,
    prep_time_min: 20,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Heat oil with cumin; add cabbage and peas together.",
      },
      {
        step: 2,
        text: "Stir-fry on high with turmeric and salt until cabbage wilts.",
      },
      {
        step: 3,
        text: "Serve as a quick weeknight side with dal-rice.",
      },
    ],
    ingredients: [
      {
        canonical: "cabbage",
      },
      {
        canonical: "peas",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "cooking_oil",
      },
    ],
    homemade_score: 9,
  },
  {
    slug: "pepper-rasam-rice",
    name: "Rasam Sadam",
    region: "south",
    meal_type: "dinner",
    veg: true,
    prep_time_min: 15,
    difficulty: "easy",
    instructions: [
      {
        step: 1,
        text: "Prepare thin rasam or use leftover rasam.",
      },
      {
        step: 2,
        text: "Pour hot over steamed rice with ghee.",
      },
      {
        step: 3,
        text: "Mix gently and eat warm.",
      },
    ],
    ingredients: [
      {
        canonical: "rice",
      },
      {
        canonical: "tomato",
      },
      {
        canonical: "tamarind",
      },
      {
        canonical: "lentil_toor",
        quantity: "2 tbsp",
      },
      {
        canonical: "mustard_seeds",
      },
      {
        canonical: "curry_leaves",
      },
      {
        canonical: "cumin",
      },
      {
        canonical: "garlic",
      },
      {
        canonical: "turmeric",
      },
      {
        canonical: "ghee",
      },
      {
        canonical: "salt",
      },
      {
        canonical: "water",
      },
    ],
    homemade_score: 9,
  },
];
