import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify, importJWK, JWTPayload } from 'jose';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: ['/dashboard', '/chat' , '/brains/:path*', '/brains'],
};


const withAuth = async (req: NextRequestWithAuth) => {

  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

};

export async function middleware(req: NextRequestWithAuth) {

  return await withAuth(req);
}

export default withAuth;
