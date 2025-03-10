import db from '@/db';
import { authOptions } from '@/lib/auth';
import { randomUUID as uuidv4 } from 'crypto';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  share: boolean;
  brainId: number;
}
export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized: No userId found' },
        { status: 401 }
      );
    }

    const { share, brainId }: RequestBody = await req.json();

    // Validate required fields
    if (share === null || !brainId) {
      return NextResponse.json(
        { error: 'Missing required fields: share, brainId' },
        { status: 400 }
      );
    }

    const response = await db.$transaction(async (tx) => {
      if (!share) {
        await tx.brain.update({
          where: {
            id: brainId,
          },
          data: {
            share: false,
            Link: { delete: true },
          },
        });

        return {
          message: 'Shareable links removed successfully',
        };
      }

      const existingLink = await tx.link.findUnique({
        where: {
          brainId,
        },
        select: {
          hash: true,
        },
      });

      if (existingLink) {
        return {
          link: `${process.env.NEXTAUTH_URL}/explore/${existingLink.hash}`,
        };
      }

      const shareableLink = await tx.brain.update({
        where: {
          id: brainId,
          share: false,
        },
        data: {
          share: true,
          Link: {
            create: {
              hash: uuidv4(),
            },
          },
        },
        select: {
          Link: {
            select: {
              hash: true,
            },
          },
        },
      });

      return {
        link: `${process.env.NEXTAUTH_URL}/explore/${shareableLink.Link?.hash}`,
      };
    });
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.error('Error during creating shareable link', err);
    return NextResponse.json(
      {
        error: 'Internal Server Error during creating shareable link',
      },
      { status: 500 }
    );
  }
};
