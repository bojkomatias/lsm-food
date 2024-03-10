"use client";

import { Tag } from "@/db/schema/tags";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<Tag>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: ({ row }) => <Link href={`/admin/tags/1`}>Edit</Link>,
  },
];
