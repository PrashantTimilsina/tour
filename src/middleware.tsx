import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const publicPath = ["/resetpassword", "/login", "/signup"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = publicPath.includes(path);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/resetpassword",

    "/login",
    "/signup",
    "/profile",
    "/wishlist",
    "/payment/:id*",
    "/bookings",

    "/changepassword",
  ],
};
