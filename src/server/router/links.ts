import { createRouter } from "./context";
import { z } from "zod";
import { prisma } from "../db/client";

export const exampleRouter = createRouter()
  .query("checkSlug", {
    input: z.object({
      slug: z.string(),
    }),

    async resolve({ input }) {
      const slugCount = await prisma.shortLink.count({
        where: {
          slug: {
            equals: input.slug,
          },
        },
      });
      return { used: slugCount > 0 };
    },
  })
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.shortLink.findMany();
    },
  })
  .mutation("createShortLink", {
    input: z.object({
      slug: z
        .string()
        .min(2)
        .regex(/^[a-zA-Z0-9-_]+$/, "Only alphanumeric characters allowed"),
      url: z.string(),
    }),
    async resolve({ input }) {
      try {
        await prisma.shortLink.create({
          data: {
            slug: input.slug,
            url: input.url,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
  });
