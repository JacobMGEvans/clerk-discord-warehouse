import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/Card";

export default function Component() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link
          className="flex items-center gap-2 text-lg font-semibold sm:text-base"
          href="#"
        >
          {/* <ClerkIcon className="w-6 h-6" /> */}
          <span>Discord Threads</span>
        </Link>
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="flex-1">
            <Input
              className="bg-white dark:bg-gray-950"
              placeholder="Search threads..."
            />
            <Button className="sr-only" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full mx-auto">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              {/* <ClerkIcon className="w-8 h-8" /> */}
              <div className="grid gap-1">
                <CardTitle>Thread 1</CardTitle>
                <CardDescription>Thread 1 Description</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Link className="text-sm font-semibold" href="#">
                View Messages
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
