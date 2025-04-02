import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/api/:path", "/dashboard", "/chat", "/brains/:path*", "/brains"],
};

const withAuth = async (req: NextRequestWithAuth) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
};

export async function middleware(req: NextRequestWithAuth) {
  return await withAuth(req);
}

export default withAuth;
