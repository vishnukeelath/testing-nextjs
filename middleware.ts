import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-current-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: { headers },
  });
}

// Apply to all non-API/static paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
