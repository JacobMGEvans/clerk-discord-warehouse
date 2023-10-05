import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Page() {
  const forumPosts = await prisma.forumPost.findMany({
    include: {
      messages: {
        include: {
          emojis: true,
          images: true,
        },
      },
    },
  });

  const forumPostsValidator = z.object({
    id: z.string(),
    threadPostTitle: z.string(),
    author: z.string(),
    messages: z.array(
      z.optional(
        z.object({
          id: z.string(),
          author: z.string(),
          userID: z.string(),
          content: z.string(),
          emojis: z.array(
            z.optional(
              z.object({
                animated: z.nullable(z.boolean()),
                name: z.string(),
                id: z.nullable(z.string()),
                reaction: z.string(),
                identifier: z.string(),
              })
            )
          ),
          images: z.array(z.optional(z.string())),
          timestamp: z.number(),
        })
      )
    ),
  });

  return (
    <main>
      <header>
        <h1>Clerk Discord Warehouse</h1>
      </header>
      <article>
        <ul>
          {forumPosts.map((forumPost) => {
            const { id, threadPostTitle, author, messages } =
              forumPostsValidator.parse(forumPost);
            return (
              <li key={id}>
                <h2>{threadPostTitle}</h2>
                <h3>{author}</h3>

                <p>
                  {messages.map((obj) => {
                    return (
                      <div>
                        {obj.images.map((url) => (
                          <p>{url}</p>
                        ))}
                      </div>
                    );
                  })}
                </p>
              </li>
            );
          })}
        </ul>
      </article>
    </main>
  );
}
