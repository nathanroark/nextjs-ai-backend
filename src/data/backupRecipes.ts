export type Recipe = {
  name: string;
  ingredients: { name: string; amount: string }[];
  instructions: string[];
};

// Pre-generated backup recipes for fallback
export const backupRecipes = [
  {
    recipe: {
      name: "Old Fashioned",
      ingredients: [
        { name: "Bourbon", amount: "2 oz" },
        { name: "Simple Syrup", amount: "1 tsp" },
        { name: "Angostura Bitters", amount: "2 dashes" },
      ],
      instructions: [
        "Stir ingredients with ice in a glass.",
        "Garnish with orange twist.",
      ],
    },
  },
  {
    recipe: {
      name: "Whiskey Sour",
      ingredients: [
        { name: "Bourbon", amount: "2 oz" },
        { name: "Lemon Juice", amount: "1 oz" },
        { name: "Simple Syrup", amount: "1/2 oz" },
      ],
      instructions: [
        "Shake ingredients with ice.",
        "Strain into glass.",
        "Garnish with cherry.",
      ],
    },
  },
  {
    recipe: {
      name: "Fiery Margarita",
      ingredients: [
        { name: "Tequila", amount: "2 oz" },
        { name: "Lime juice", amount: "1 oz" },
        { name: "Agave syrup", amount: "0.5 oz" },
        { name: "Jalapeño slices", amount: "2-3 slices" },
        { name: "Ice", amount: "as needed" },
      ],
      instructions: [
        "Muddle jalapeño slices with agave syrup in a shaker.",
        "Add tequila, lime juice, and ice, then shake well.",
        "Strain into a salt-rimmed glass over fresh ice.",
        "Garnish with a jalapeño slice.",
      ],
    },
  },
  {
    recipe: {
      name: "Negroni",
      ingredients: [
        { name: "Gin", amount: "1 oz" },
        { name: "Campari", amount: "1 oz" },
        { name: "Sweet Vermouth", amount: "1 oz" },
      ],
      instructions: [
        "Stir ingredients with ice in a glass.",
        "Strain into a glass.",
        "Garnish with orange twist.",
      ],
    },
  },
  {
    recipe: {
      name: "Martini",
      ingredients: [
        { name: "Gin", amount: "2 oz" },
        { name: "Dry Vermouth", amount: "1/2 oz" },
      ],
      instructions: [
        "Stir ingredients with ice in a glass.",
        "Strain into a glass.",
        "Garnish with olive.",
      ],
    },
  },
  {
    recipe: {
      name: "Mojito",
      ingredients: [
        { name: "White Rum", amount: "2 oz" },
        { name: "Lime Juice", amount: "1 oz" },
        { name: "Mint Leaves", amount: "6" },
      ],
      instructions: [
        "Muddle mint leaves with lime juice in a glass.",
        "Add rum and ice.",
        "Top with soda water.",
        "Garnish with mint sprig.",
      ],
    },
  },
  {
    recipe: {
      name: "Gin & Tonic",
      ingredients: [
        { name: "Gin", amount: "2 oz" },
        { name: "Tonic Water", amount: "4 oz" },
      ],
      instructions: [
        "Pour gin over ice in a glass.",
        "Top with tonic water.",
        "Garnish with lime wedge.",
      ],
    },
  },
  {
    recipe: {
      name: "Sunny Margarita",
      ingredients: [
        { name: "Tequila", amount: "2 oz" },
        { name: "Orange Juice", amount: "1 oz" },
      ],
      instructions: [
        "Shake ingredients with ice.",
        "Strain into glass.",
        "Garnish with lime.",
      ],
    },
  },
];
