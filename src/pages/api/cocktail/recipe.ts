import type { NextApiRequest, NextApiResponse } from "next";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export const maxDuration = 30; // This function can run for a maximum of 5 seconds

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
      // temperature: 2, // value <= 2
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
        "Generate a random good cocktail recipe. Try to make it unique enough so that you don't generate the same recipe too many times.",
    });

    return res.json(object);
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ message: "Failed to generate cocktail." });
  }
}
