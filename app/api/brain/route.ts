import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';

export const GET = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession(authOptions);
};
