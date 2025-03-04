import db from '@/db';
import { getValidationErrors, validate } from '@/lib/utils';
import { userObject } from '@/lib/zod-schema';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest) => {
  try {
    const { email, firstName, lastName, password } = await req.json();

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
        email,
        password: hashedPassword,
        name,
      },
    });

    return NextResponse.json({
      message: 'Sign up Successful',
    });
  } catch (err: any) {
    if (process.env.NODE_ENV !== 'production') console.error(err);

    return NextResponse.json(
      {
        message:
          err?.code === 'P2002'
            ? 'User already exists'
            : err.code
            ? 'An error occurred during signup'
            : 'Internal Server Error',
      },
      {
        status: err?.code === 'P2002' ? 403 : 500,
      }
    );
  }
};
