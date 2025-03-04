import db from '@/db';
import { type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { validate } from './utils';
import { signInObject } from './zod-schema';
import { randomUUID } from 'crypto';
import { importJWK, JWTPayload, SignJWT } from 'jose';
import bcrypt from 'bcrypt';

const generateJWT = async (payload: JWTPayload) => {
  const secret = process.env.JWT_SECRET || 'secret';

  const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });

  const jwt = await new SignJWT({
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    jti: randomUUID(), // Adding a unique jti to ensure each token is unique. This helps generate a unique jwtToken on every login
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('365d')
    .sign(jwk);

  return jwt;
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email',

      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            return null;
          }
          const { email, password } = credentials;

          const result = validate(signInObject, { password, email });

          if (!result.success) {
            return null;
          }

          const user = await db.user.findUnique({
            where: {
              email,
            },
            select: {
              id: true,
              password: true,
              name: true,
            },
          });

          if (process.env.NODE_ENV !== 'production') console.log(user);

          if (!user || !(await bcrypt.compare(password, user.password))) {
            return null;
          }

          const token = await generateJWT({
            id: user.id,
          });

          return {
            id: user.id.toString(),
            name: user.name,
            email,
            token,
          };
        } catch (err) {
          if (process.env.NODE_ENV !== 'production') console.error(err);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || 'secr3t',
  pages: {
    signIn: '/signin',
  },
};
