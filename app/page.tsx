import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Page() {
  const forumPosts = await prisma.thread.findMany({
    include: {
      messages: {
        include: {
          emojis: true,
          images: true,
        },
      },
    },
  });

  return (
    <main>
      <header>
        <h1>Clerk Discord Warehouse</h1>
      </header>
      <article>
        <ul>
          {forumPosts.map((forumPost) => {
            const { id, threadPostTitle, author, messages } = forumPost;
            return (
              <li key={id}>
                <h2>Title: {threadPostTitle}</h2>
                <h3>AuthorID: {author}</h3>

                <select>
                  {messages.map((obj) => {
                    return (
                      <div>
                        {obj.images.map(({ url, id }) => (
                          <option key={id}>
                            <h3>Image URL</h3>
                            <p>{url}</p>
                          </option>
                        ))}
                      </div>
                    );
                  })}
                </select>
              </li>
            );
          })}
        </ul>
      </article>
    </main>
  );
}
