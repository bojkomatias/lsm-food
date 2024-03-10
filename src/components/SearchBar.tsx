"use client";
import { useRouter } from "next/navigation";
import { Magnifier } from "./icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useQueryParams } from "@/lib/use-query-params";

export function SearchBar() {
  const router = useRouter();
  const setQueryParams = useQueryParams();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // @ts-ignore stupid react not recognizing default html form
        router.push(setQueryParams("search", e.target[0].value));
      }}
      className="flex w-full items-center space-x-1 px-1"
    >
      <Input
        id="search"
        type="text"
        placeholder="I'm looking for..."
        className="-mr-6"
        onChange={(e) => {
          if (!e.target.value) router.push(setQueryParams("search", ""));
        }}
      />
      <Button type="submit">
        <Magnifier />
      </Button>
    </form>
  );
}
