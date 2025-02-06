// pages/api/custom-cocktail/recipe.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { backupRecipes } from "../../../data/backupRecipes";

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
    // Grab query params for spirit and ingredients
    const spiritQuery = Array.isArray(req.query.spirit)
      ? req.query.spirit[0]
      : req.query.spirit || "";

    const ingredientsQuery = Array.isArray(req.query.ingredients)
      ? req.query.ingredients[0]
      : req.query.ingredients || "";

    // Convert comma-separated string into an array
    const additionalIngredients = ingredientsQuery
      .split(",")
      .map((ing) => ing.trim())
      .filter(Boolean);

    // Build a dynamic prompt
    let prompt = `Generate a unique, short cocktail recipe with up to 5 ingredients. 
Use ${spiritQuery || "any spirit"} as the base spirit.`;

    if (additionalIngredients.length > 0) {
      prompt += ` Also try to incorporate some or all of these ingredients if they pair well: ${additionalIngredients.join(
        ", ",
      )}.`;
    }

    // Call the AI with the dynamic prompt
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      maxRetries: 3,
      maxTokens: 250,
      schema: z.object({
        recipe: z.object({
          name: z.string(),
          ingredients: z.array(
            z.object({ name: z.string(), amount: z.string() }),
          ),
          instructions: z.array(z.string()),
        }),
      }),
      prompt,
    });

    return res.json(object);
  } catch (error) {
    console.error("OpenAI API Error:", error);
    const fallback =
      backupRecipes[Math.floor(Math.random() * backupRecipes.length)];
    return res.json(fallback);
  }
}
