import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default function middleware(req) {
  // const token = req.nextauth.token;
  // const path = req.nextUrl.pathname;

  // If token is still undefined (loading state), allow the request to proceed
  // if (token === undefined) return NextResponse.next();

  // Protect admin routes
  // if (path.startsWith("/admin") && token.role !== "admin") {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }

  // Prevent unnecessary redirects on login/signup
  // if ((path === "/login" || path === "/signup") && token) {
  //   return NextResponse.next(); // ✅ Let them stay if they just logged in
  // }

  // Protect dashboard routes
  // if (path.startsWith("/dashboard") && !token) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  return NextResponse.next(); // ✅ Allow all users
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/signup"]
};
