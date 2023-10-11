"use client";

import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const router = useRouter();
  const { threadPostTitle } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    router.push(`?threadPostTitle=${value}`);
  };

  return (
    <div className="flex w-full max-w-sm items-center">
      <Label htmlFor="threadPostTitle">Forum Title: </Label>
      <Input
        type="text"
        name="threadPostTitle"
        id="threadPostTitle"
        value={threadPostTitle}
        onChange={handleChange}
      />

      <Button type="submit">Clear</Button>
    </div>
  );
}
