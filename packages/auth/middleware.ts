import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function authMiddleware(
  middlewareFn?: (
    _auth: { req: NextRequest; authorized: boolean },
    request: NextRequest,
  ) => Promise<Response> | Response,
) {
  return async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);
    const authorized = Boolean(sessionCookie);

    if (middlewareFn) {
      const response = await middlewareFn(
        { req: request, authorized },
        request,
      );

      if (
        response &&
        (!response.headers.get("x-middleware-next") ||
          response.headers.get("Location"))
      ) {
        return response;
      }
    }

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  };
}