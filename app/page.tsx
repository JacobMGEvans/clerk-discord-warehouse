import { Suspense } from "react";
import { PrismaClient } from "@prisma/client";
import SearchBar from "./search";

const prisma = new PrismaClient();

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const forumPosts = await prisma.thread.findMany({
    include: {
      messages: {
        include: {
          images: true,
        },
      },
    },
    where: {
      threadPostTitle: {
        search: searchParams["threadPostTitle"],
      },
    },
  });

  return (
    <main>
      <header>
        <h1>Clerk Discord Warehouse</h1>
      </header>
      <Suspense fallback={<div>Falling Back</div>}>
        <SearchBar />
      </Suspense>
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
