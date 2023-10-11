import { Suspense } from "react";
import { PrismaClient } from "@prisma/client";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

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
    <main className="container flex flex-col text-center">
      <header className="text-center mt-10 mb-6 w-full">
        <h1 className="text-4xl font-bold">Clerk Discord Warehouse</h1>
        <Suspense fallback={<div className="mt-2">Falling Back</div>}>
          <SearchBar />
        </Suspense>
      </header>
      {forumPosts.map((forumPost) => {
        const { id, threadPostTitle, author, messages } = forumPost;
        return (
          <Collapsible key={id}>
            <ul className="border border-gray-300 rounded-md p-4 mx-auto">
              <CollapsibleTrigger className="flex justify-between items-baseulne">
                <h2 className="text-xl font-bold">Title: {threadPostTitle}</h2>
                <h3 className="text-lg">AuthorID: {author}</h3>
              </CollapsibleTrigger>

              <CollapsibleContent className={"grid gap-1.5 text-center mt-4"}>
                {messages.map((obj, idx) => {
                  return (
                    <article
                      key={obj.id}
                      className="border border-gray-200 rounded-md p-2"
                    >
                      <p className="block mb-1 font-bold">post {idx}</p>
                      <p className="mb-2">{obj.content}</p>
                      {obj.images.map(({ url, id }) => (
                        <div key={id} className="mb-1">
                          <b className="block mb-1">Image URL</b>
                          <p>{url}</p>
                        </div>
                      ))}
                    </article>
                  );
                })}
              </CollapsibleContent>
            </ul>
          </Collapsible>
        );
      })}
    </main>
  );
}
