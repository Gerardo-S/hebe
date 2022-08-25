import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const link = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  // type of string[] not allowed
  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "please use with a slug" }));
    return;
  }

  const data = await prisma.shortLink.findFirst({
    where: { slug: { equals: slug } },
  });
  if (!data) {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "slug not found" }));

    return;
  }

  return res.json(data);
};

export default link;
