import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "./ui/badge";
import { ShopStars } from "./ShopStars";
import { CameraSquare, MapPoint, Phone } from "./icons";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Shop } from "@/db/schema/shops";
import type { ShopHours as ShopHoursT } from "@/db/schema/shop-hours";
import { Review } from "@/db/schema/reviews";
import { Tag } from "@/db/schema/tags";
import { ShopHours } from "./ShopHours";
import Link from "next/link";

export function ShopCard({
  shop,
}: {
  shop: Shop & {
    tagToShops: { tag: Tag }[];
    shopHours: ShopHoursT[];
    reviews: Review[];
  };
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <ShopStars reviews={shop.reviews} />
        <CardTitle className="font-serif text-3xl">{shop.name}</CardTitle>
        <CardDescription
          title={shop.description}
          className="space-x-1 opacity-90"
        >
          <Badge>Delivery</Badge>
          <Badge>Take away</Badge>
          <Badge>Dine in</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="uppercase tracking-wide">
        <div className="flex flex-wrap gap-x-6">
          <div className="flex items-center gap-1">
            <Phone />
            <span className="text-xs text-muted-foreground">{shop.phone}</span>
          </div>
          <div className="flex items-center gap-1">
            <CameraSquare />
            <span className="text-xs text-muted-foreground">
              {shop.instagram}
            </span>
          </div>
          {shop.address ? (
            <div className="flex items-center gap-1">
              <MapPoint />
              <span className="text-xs text-muted-foreground">
                {shop.address}
              </span>
            </div>
          ) : null}
        </div>

        <ShopHours shopHours={shop.shopHours} />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <ScrollArea className="mr-2 w-full whitespace-nowrap pb-1">
          <div className="flex w-max gap-1">
            {shop.tagToShops.map(({ tag }) => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <Button asChild>
          <Link href={`/shop/${shop.id}`}>Ver más</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
