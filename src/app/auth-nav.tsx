"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkTo, LogoutIcon } from "@/components/icons";
import { signOut } from "next-auth/react";
import { User } from "@/db/schema/users";

export function AuthNav({ user }: { user: User | undefined }) {
  const pathname = usePathname();
  return (
    <div className="flex items-center p-3">
      <div className="flex-grow" />
      <Header />

      {user ? (
        <UserDropdown user={user} />
      ) : pathname.startsWith("/login") ? null : (
        <Button asChild>
          <Link href={"/login"}>Login</Link>
        </Button>
      )}
    </div>
  );
}

function UserDropdown({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback>MB</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LinkTo className="mr-2" />
          Volver a pagina
        </DropdownMenuItem>
        <DropdownMenuItem className="font-semibold" onClick={() => signOut()}>
          <LogoutIcon className="mr-2" />
          Cerrar session
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Header() {
  const pathname = usePathname();
  const isShop = pathname.startsWith("/shop");
  const isPanel = pathname.startsWith("/app");
  const isAdminPanel = pathname.startsWith("/admin");

  if (isAdminPanel)
    return (
      <h2 className="flex-grow text-xs uppercase drop-shadow">
        Panel de Super Admin
      </h2>
    );
  if (isPanel)
    return (
      <h2 className="flex-grow text-xs uppercase text-accent drop-shadow">
        Panel de Administración
      </h2>
    );
  if (isShop)
    return (
      <h2 className="flex-grow text-xs uppercase text-accent drop-shadow">
        Menu
      </h2>
    );
  return (
    <h2 className="flex-grow text-xs uppercase text-accent drop-shadow">
      ¿Donde comer en la villa?
    </h2>
  );
}
