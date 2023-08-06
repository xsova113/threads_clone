"use client";
import React, { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter } from "next/navigation";

const SearchBar = () => {
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
    <Input
      type="text"
      placeholder="Search for users"
      onChange={(e) => search(e)}
    />
  );
};

export default SearchBar;
