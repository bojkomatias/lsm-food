import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="space-x-2 p-2">
        <Button asChild variant={"link"} className="shadow-none">
          <Link href={"/admin/shops"}>Shops</Link>
        </Button>
        <Button asChild variant={"link"} className="shadow-none">
          <Link href={"/admin/tags"}>Tags</Link>
        </Button>
        <Button asChild variant={"link"} className="shadow-none">
          <Link href={"/admin/modalities"}>Modalities</Link>
        </Button>
        <Button asChild variant={"link"} className="shadow-none">
          <Link href={"/admin/users"}>Users</Link>
        </Button>
      </nav>
      {children}
    </div>
  );
}
