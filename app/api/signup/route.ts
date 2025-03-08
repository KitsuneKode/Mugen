import db from '@/db';
import { getValidationErrors, validate } from '@/lib/utils';
import { userObject } from '@/lib/zod-schema';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

interface RequestBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const { email, firstName, lastName, password }: RequestBody =
      await req.json();
    const result = validate(userObject, {
      email,
      firstName,
      lastName,
      password,
    });
    if (!result.success) {
      if (process.env.NODE_ENV !== 'production')
        console.log(getValidationErrors(result));
      return NextResponse.json(
        {
          message: 'Errors in Input',
        },
        { status: 411 }
      );
    }
    const name = `${firstName} ${lastName}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
      },
    });
    return NextResponse.json({
      message: 'Sign up Successful',
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          {
            message: 'User already exists',
          },
          { status: 403 }
        );
      }
      return NextResponse.json(
        {
          message: 'Error :' + error.message,
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        message: 'Internal Server Error',
      },
      { status: 500 }
    );
  }
};
