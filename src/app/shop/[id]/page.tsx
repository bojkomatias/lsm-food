import { db } from "@/db";

export default async function ShopPage({
  params: { id },
}: {
  params: { id: number };
}) {
  const shop = await db.query.shops.findFirst({
    where: (shops, { eq }) => eq(shops.id, id),
  });
  return (
    <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm font-semibold">
      {JSON.stringify(shop, null, 2)}
    </pre>
  );
}
