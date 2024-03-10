import { PageTitle } from "@/components/PageTitle";
import { ShopForm } from "@/components/panel/ShopForm";
import { db } from "@/db";

export default async function AppShopPage({
  params: { id },
}: {
  params: { id: number };
}) {
  // const shop = await db.query.shops.findFirst({
  //   where: (shops, { eq }) => eq(shops.id, id),
  // });
  return (
    <>
      <PageTitle title="Negocio" />

      <ShopForm />
    </>
  );
}
