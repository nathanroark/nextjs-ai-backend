import type { NextApiRequest, NextApiResponse } from "next";

interface EnvResponse {
  secretKey?: string;
  anotherVar?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EnvResponse>,
) {
  if (req.method !== "GET") {
    return res.status(405).json({});
  }

  // Access your env variables on the server side
  const secretKey = process.env.MY_SECRET_KEY;
  const anotherVar = process.env.ANOTHER_VAR;

  return res.status(200).json({
    secretKey,
    anotherVar,
  });
}
