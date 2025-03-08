import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { share } = await req.json();

  if (share) {
  }
};
