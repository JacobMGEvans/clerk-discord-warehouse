"use client";

import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SearchBar() {
  const router = useRouter();
  const { threadPostTitle } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    router.push(`?search=${value}`);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="threadPostTitle">Post Title</Label>
      <Input
        type="text"
        name="threadPostTitle"
        id="threadPostTitle"
        value={threadPostTitle}
        onChange={handleChange}
      />
    </div>
  );
}
