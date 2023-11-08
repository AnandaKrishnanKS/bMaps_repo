import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { refreshTokens } from "@/app/api/auth";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // Refresh the access_token and refresh_token every time the request url changes
    // try {
    //     await refreshTokens()
    // } catch (error) {
    //     console.log(error);
    //     return NextResponse.redirect(new URL("http://localhost:3000/login"));
    // }
    // console.log(new URL(request.url));
    return NextResponse.rewrite(new URL(request.url));
  }
}
