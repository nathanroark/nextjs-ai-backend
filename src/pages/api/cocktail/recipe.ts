import type { NextApiRequest, NextApiResponse } from "next";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

// export const maxDuration = 30; // This function can run for a maximum of 5 seconds
//

// Pre-generated backup recipes for fallback
const backupRecipes = [
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

// type Recipe = {
//   name: string;
//   ingredients: { name: string; amount: string }[];
//   instructions: string[];
// };
//
export const maxDuration = 30;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (for development)
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      // temperature: 2.0,
      maxRetries: 3,
      maxTokens: 250,
      // maxDuration: 30,
      schema: z.object({
        recipe: z.object({
          name: z.string(),
          ingredients: z.array(
            z.object({ name: z.string(), amount: z.string() }),
          ),
          instructions: z.array(z.string()),
        }),
      }),
      prompt:
        "Generate a unique, short cocktail recipe with up to 5 ingredients",
    });

    return res.json(object);
  } catch (error) {
    console.error("OpenAI API Error:", error);
    const fallback =
      backupRecipes[Math.floor(Math.random() * backupRecipes.length)];
    return res.json(fallback);
    // res.status(500).json({ message: "Failed to generate cocktail." });
    //
  }
}
