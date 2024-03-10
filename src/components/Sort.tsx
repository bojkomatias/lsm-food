"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryParams } from "@/lib/use-query-params";
import { useRouter } from "next/navigation";

export function Sort() {
  const router = useRouter();
  const setQueryParams = useQueryParams();

  return (
    <Select onValueChange={(e) => router.push(setQueryParams("sort", e))}>
      <SelectTrigger className="ml-auto w-fit border-none text-xs font-thin uppercase tracking-wider shadow-none focus:ring-0">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-muted-foreground">Sort by</SelectLabel>
          <SelectItem value="rating" className="text-xs font-thin uppercase">
            high rated
          </SelectItem>
          <SelectItem value="name" className="text-xs font-thin uppercase">
            name
          </SelectItem>
          <SelectItem value="products" className="text-xs font-thin uppercase">
            products
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
