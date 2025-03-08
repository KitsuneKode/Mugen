import db from '@/db';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const brains = await db.brain.findMany({
      where: { share: true },
      include: {
        Contents: true,
        Link: true,
        user: true,
      },
    });
    console.log(brains);
    return NextResponse.json({ brains });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Error', error: err });
  }
};
