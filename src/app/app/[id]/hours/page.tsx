import { PageTitle } from "@/components/PageTitle";
import { ShopHoursForm } from "@/components/panel/ShopHoursForm";
import { db } from "@/db";

export default async function AppShopHoursPage({
  params: { id },
}: {
  params: { id: number };
}) {
  const shopHours = await db.query.shopHours.findMany({
    where: (shopHours, { eq }) => eq(shopHours.shop, id),
  });
  return (
    <>
      <PageTitle title="Horarios" />
      <ShopHoursForm shop={id} />
    </>
  );
}
