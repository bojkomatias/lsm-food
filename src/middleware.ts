import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export default withAuth(
  async function middleware(req: NextRequest) {
    const token = await getToken({ req });

    const url = new URL(req.url);
    const origin = url.origin;
    const pathname = url.pathname;
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-url", req.url);
    requestHeaders.set("x-origin", origin);
    requestHeaders.set("x-pathname", pathname);

    if (req.nextUrl.pathname !== "/")
      if (
        !req.nextUrl.pathname.startsWith("/shop") &&
        !req.nextUrl.pathname.startsWith("/login")
      )
        if (!token) return NextResponse.redirect(new URL("/", req.url));

    // Only admins protection
    if (req.nextUrl.pathname.startsWith("/admin"))
      if (token?.user.role !== "admin")
        return NextResponse.redirect(new URL("/app", req.url));

    // If admin in /app push to admin only panel
    if (req.nextUrl.pathname.startsWith("/app"))
      if (token?.user.role === "admin")
        return NextResponse.redirect(new URL("/admin/shops", req.url));
  },
  {
    callbacks: {
      // Always return true, to execute middleware in every matched route
      authorized: async () => true,
    },
  },
);
