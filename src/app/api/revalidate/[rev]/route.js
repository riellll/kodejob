import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res, { params }) {
  const { rev } = params;
  try {
    await res.revalidate("/");
    // await res.revalidate(`${rev}`);
    return res.json({ revalidated: true });
  } catch (error) {
    return res.status(500).send("Error revalidating");
  }
}
