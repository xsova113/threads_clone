"use client";
import React, { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";

const SearchBar = ({ type }: { type: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    let params = new URLSearchParams(window.location.search);

    if (e.target.value) {
      params.set("input", e.target.value);
    } else {
      params.delete("input");
    }
    router.push(`${pathname}/?${params}`);
  };

  return (
    <div className="flex items-center bg-slate-800 px-3 py-1 rounded-lg">
      <Search size={25} className="text-slate-500" />
      <Input
        type="text"
        placeholder={`Search for ${type}`}
        onChange={(e) => search(e)}
        className="bg-transparent border-none text-white focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default SearchBar;
