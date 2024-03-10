import { PageTitle } from "@/components/PageTitle";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { db } from "@/db";
import { Button } from "@/components/ui/button";

async function getShops() {
  return db.query.shops.findMany();
}

export default async function AdminShopsPage() {
  const shops = await getShops();
  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between px-4">
        <h2 className="font-serif text-2xl font-semibold">Shops</h2>
        <Button>Add shop</Button>
      </div>
      <DataTable columns={columns} data={shops} />
    </div>
  );
}
