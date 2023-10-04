import { getXataClient } from "../utils/xata.codegen";
import { z } from "zod";

export default async function Page() {
  const xata = getXataClient();
  const links = await xata.db.forum_posts.getAll();

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
          {links.map((forumPost) => {
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
