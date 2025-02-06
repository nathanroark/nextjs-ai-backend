import type { NextApiRequest, NextApiResponse } from "next";

interface EnvResponse {
  varOne?: string;
  varTwo?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EnvResponse>,
) {
  if (req.method !== "GET") {
    return res.status(405).json({});
  }

  // Access your env variables on the server side
  const varOne = process.env.VAR_ONE;
  const varTwo = process.env.VAT_TWO;

  return res.status(200).json({
    varOne,
    varTwo,
  });
}
