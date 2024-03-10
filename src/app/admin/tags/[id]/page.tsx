import { db } from "@/db";

export default async function AdminShopPage({
  params: { id },
}: {
  params: { id: number };
}) {
  const tag = await db.query.tags.findFirst({
    where: (shops, { eq }) => eq(shops.id, id),
  });
  return (
    <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm font-semibold">
      {JSON.stringify(tag, null, 2)}
    </pre>
  );
}
