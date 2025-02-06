import type { NextApiRequest, NextApiResponse } from "next";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    //
    // const exampleResponseFromGpt = {
    //   name: "Bad Cocktail",
    //   ingredients: [
    //     "1 oz vodka",
    //     "1 oz gin",
    //     "1 oz rum",
    //     "1 oz tequila",
    //     "1 oz triple sec",
    //     "1 oz sweet and sour mix",
    //     "1 oz cola",
    //   ],
    //   instructions:
    //     "Mix all ingredients together in a shaker with ice. Strain into a glass and serve.",
    // };

    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: z.object({
        recipe: z.object({
          name: z.string(),
          ingredients: z.array(
            z.object({ name: z.string(), amount: z.string() }),
          ),
          instructions: z.array(z.string()),
        }),
      }),
      prompt: "Generate a terrible cocktail recipe",
    });

    return res.json(object);
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ message: "Failed to generate cocktail." });
  }
}
