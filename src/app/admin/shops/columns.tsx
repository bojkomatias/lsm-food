"use client";

import { Shop } from "@/db/schema/shops";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<Shop>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "modality",
    header: "Modality",
  },
  {
    accessorKey: "owner",
    header: "Owner",
  },
  {
    id: "actions",
    cell: ({ row }) => <Link href={`/admin/shops/1`}>Edit</Link>,
  },
];
