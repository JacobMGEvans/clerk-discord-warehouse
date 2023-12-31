import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import slugify from "slugify";
import { PrismaClient } from "@prisma/client";
import { URLPattern } from "next/server";
import SearchBar from "./search";
// import { useRouter, useParams } from "next/navigation";

const prisma = new PrismaClient();

export default async function Threads({ searchParams }) {
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
        search: searchParams["search"],
      },
    },
  });
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="flex h-16 shrink-0 items-center border-b px-4 md:px-6">
        <Link
          className="flex items-center gap-2 text-lg font-semibold sm:text-base"
          href="/"
        >
          {/* <ClerkIcon className="w-8 h-8" />  Do a link back to the Discord possibly even the direct thread */}
          <span>Discord Threads</span>
        </Link>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          {/* Make this handle the user search and update the Prisma response */}
          <SearchBar />
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-gray-100/40 p-4 dark:bg-gray-800/40 md:gap-8 md:p-10">
        {forumPosts.map((thread) => (
          <div
            className="grid w-full max-w-6xl gap-6 self-center"
            key={thread.id}
          >
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                {/* <ClerkIcon className="w-8 h-8" /> */}
                <div className="grid gap-1">
                  <CardTitle>{thread.threadPostTitle}</CardTitle>
                  <CardDescription>
                    {thread.messages[0].content}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Link
                  className="text-sm font-semibold"
                  href={`/messages/${slugify(
                    `${thread.threadPostTitle}-${thread.id}`,
                  )}`}
                >
                  View Messages
                </Link>
              </CardContent>
            </Card>
          </div>
        ))}
      </main>
    </div>
  );
}
