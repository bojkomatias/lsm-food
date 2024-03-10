"use client";

import { useQueryParams } from "@/lib/use-query-params";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useRouter, useSearchParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Tag } from "@/db/schema/tags";

export function Filter({ tags }: { tags: Tag[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setQueryParams = useQueryParams();

  return (
    <div className=" px-1">
      <div className="flex items-center justify-between tracking-wider">
        <span className="text-xs font-thin uppercase leading-loose">
          Filter by pref
        </span>
        <Button
          size={"sm"}
          variant={"link"}
          className="text-xs font-thin tracking-wider"
          onClick={() => router.push(setQueryParams("filter", ""))}
        >
          Clear
        </Button>
      </div>
      <ScrollArea className="whitespace-nowrap pb-2">
        <ToggleGroup
          type="multiple"
          variant="accent"
          size="sm"
          className="w-max"
          value={
            searchParams.get("filter")
              ? searchParams.get("filter")?.split("-")
              : []
          }
          onValueChange={(e) =>
            router.push(setQueryParams("filter", e.join("-")))
          }
        >
          {tags.map((tag) => (
            <ToggleGroupItem
              key={tag.id}
              value={String(tag.id)}
              aria-label={tag.name}
            >
              {tag.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
