"use client";

import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const router = useRouter();
  const { search } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    router.push(`?search=${value}`);
  };

  return (
    <form className="flex-1">
      <Input
        onChange={handleChange}
        className="bg-white dark:bg-gray-950"
        type="text"
        id="search-id"
        name="search"
        placeholder="Search threads..."
        value={search}
      />
      <Button className="sr-only" type="submit">
        Submit
      </Button>
    </form>
  );
}
