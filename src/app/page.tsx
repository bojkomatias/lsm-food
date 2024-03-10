import { ShopCard } from "@/components/ShopCard";
import { SearchBar } from "@/components/SearchBar";
import { PageTitle } from "@/components/PageTitle";
import { db } from "@/db";
import { Filter } from "@/components/Filter";
import { Sort } from "@/components/Sort";
import { ResultQuantity } from "@/components/ResultQuantity";
import { ScrollArea } from "@/components/ui/scroll-area";
import { tagToShops } from "@/db/schema/tags";

const getShops = async (searchParams: { [key: string]: string }) => {
  const res = await db.query.shops.findMany({
    with: {
      tagToShops: {
        columns: { tagId: true },
        with: { tag: true },
      },
      reviews: {
        orderBy:
          searchParams["sort"] == "rating"
            ? (reviews, { desc }) => [desc(reviews.qualification)]
            : undefined,
      },
      shopHours: true,
    },

    orderBy:
      searchParams["sort"] == "name"
        ? (shops, { desc }) => [desc(shops.name)]
        : undefined,
  });
  const result = searchParams["filter"]
    ? res.filter(
        (e) =>
          e.tagToShops.filter((x) =>
            searchParams["filter"].split("-").includes(String(x.tagId)),
          ).length >= searchParams["filter"].split("-").length,
      )
    : res;

  return result;
};

const getTags = async () => {
  return await db.query.tags.findMany();
};

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const shops = await getShops(searchParams);
  const tags = await getTags();
  return (
    <>
      <PageTitle title="Places" />
      <SearchBar />
      <Filter tags={tags} />
      <div className="flex items-center justify-between">
        <ResultQuantity quantity={shops.length} />
        <Sort />
      </div>
      <ScrollArea className="h-[75svh]">
        <div className="grid grid-cols-1 gap-4 px-2 lg:grid-cols-2 lg:space-y-0 lg:px-4">
          {shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
