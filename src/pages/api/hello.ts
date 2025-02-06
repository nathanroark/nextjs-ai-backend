import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

// An API route in Next.js is just a function that receives
// a request and response. We'll only allow GET here.
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method === "GET") {
    return res
      .status(200)
      .json({ message: "Hello from Next.js (TypeScript)!" });
  }

  // Return 405 if we don't allow the method
  return res.status(405).json({ message: "Method Not Allowed" });
}
