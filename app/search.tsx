"use client";

import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const router = useRouter();
  const { search } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) =>
    router.push(`?search=${e.target.value}`);

  return (
    <form className="flex w-3/5" onChange={handleChange}>
      <Input
        className=" bg-white dark:bg-gray-950"
        type="text"
        id="search-id"
        name="search"
        placeholder="Search threads..."
        value={search}
      />
      <Button className="sr-only" type="submit">
        Submit
      </Button>
      <ResetButton
        className="flex items-center rounded-md border px-4 py-2 shadow-sm"
        type="reset"
        onClick={() => router.push("/")}
      />
    </form>
  );
}

function ResetButton(props) {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Button {...props}>
        Reset
        <XIcon className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
