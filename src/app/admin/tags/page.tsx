import { PageTitle } from "@/components/PageTitle";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { db } from "@/db";
import { Button } from "@/components/ui/button";

export default async function AdminShopsPage() {
  const tags = await db.query.tags.findMany();

  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between px-4">
        <h2 className="font-serif text-2xl font-semibold">Tags</h2>
        <Button>Add tag</Button>
      </div>
      <DataTable columns={columns} data={tags} />
    </div>
  );
}
