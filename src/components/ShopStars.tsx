import { Review } from "@/db/schema/reviews";
import { Star } from "./icons";
import { useMemo } from "react";

export function ShopStars({ reviews }: { reviews: Review[] }) {
  const averageRating = useMemo(
    () =>
      reviews.reduce((acc, curr) => {
        return acc + curr.qualification;
      }, 0) / reviews.length,
    [reviews],
  );

  return (
    <div className="float-right ml-auto flex h-0 w-fit items-center text-card-foreground">
      <span className="mt-0.5 text-sm">
        {averageRating ? averageRating : ""}
      </span>
      <Star />
    </div>
  );
}
