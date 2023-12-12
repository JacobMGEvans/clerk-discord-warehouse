import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Page({ params }: { params: { thread: string } }) {
  console.log(JSON.stringify(params, null, 2));
  const forumPost = await prisma.thread.findUnique({
    include: {
      messages: {
        include: {
          images: true,
          emojis: true,
        },
      },
    },
    where: {
      id: params.thread.split("-").findLast((value) => Number(value) > 0),
    },
  });

  // Add a similar Header search bar as the one in the Threads page
  return (
    <>
      <div className="flex flex-row space-x-4">
        <Card className="w-64">
          <CardHeader className="flex items-center justify-between p-4">
            <h2 className="text-xl font-semibold">Threads</h2>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="flex items-start space-x-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=50&width=50" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1">
                <Link href="#">
                  <h3 className="font-medium">John Doe</h3>
                </Link>
                <p className="text-sm text-gray-500">Project updates</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=50&width=50" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1">
                <Link href="#">
                  <h3 className="font-medium">Alice Martin</h3>
                </Link>
                <p className="text-sm text-gray-500">Design discussion</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Fill horizontal length and render Cards vertically  */}
        <div className="flex w-full flex-col space-y-4">
          {forumPost.messages.map((message) => (
            <div className="flex w-full flex-col space-y-4">
              <Card className="p-4">
                <CardHeader className="flex items-center justify-between p-4">
                  <h2 className="text-xl font-semibold">{message.author}</h2>
                  {/* <Badge>New</Badge> ---->  We can figure out something for the Emojis */}
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{message.content}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
