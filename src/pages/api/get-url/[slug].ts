//src/pages/api/get-link/[slug].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const link = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];
  // type of string[] not allowed
  if (!slug || typeof slug !== "string") {
    res.status(404).json({ message: "please provide a slug" });
    return;
  }

  const data = await prisma.shortLink.findFirst({
    where: { slug: { equals: slug } },
  });
  if (!data) {
    res.status(404).json({ message: "slug not found", status: 404 });

    return;
  }
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=1000000000, stale-while-revalidate");

  res.json(data);
  return;
};

export default link;
