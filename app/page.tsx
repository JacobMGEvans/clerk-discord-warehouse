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
        <Suspense fallback={<div>Falling Back</div>}>
          <SearchBar />
        </Suspense>
      </header>
      <article>
        <ul>
          {forumPosts.map((forumPost) => {
            const { id, threadPostTitle, author, messages } = forumPost;
            return (
              <li key={id}>
                <h2>Title: {threadPostTitle}</h2>
                <h3>AuthorID: {author}</h3>

                <section className={"grid grid-cols-1 gap-1.5 text-center"}>
                  {messages.map((obj) => {
                    return (
                      <article key={obj.id}>
                        {obj.images.map(({ url, id }) => (
                          <div key={id}>
                            <h3>Image URL</h3>
                            <p>{url}</p>
                          </div>
                        ))}
                      </article>
                    );
                  })}
                </section>
              </li>
            );
          })}
        </ul>
      </article>
    </main>
  );
}
