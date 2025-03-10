import { authOptions, session } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';

interface RequestBody {
  contentIds: number[];
  name: string;
  description: string;
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
    const { contentIds, description, name }: RequestBody = await req.json();

    const { id: userId } = (session as session).user;
    if (!contentIds || !name || !description || contentIds.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: type, link, or title' },
        { status: 400 }
      );
    }

    const result = await db.$transaction(async (tx) => {
      const tags = await tx.tag.findMany({
        where: {
          Contents: {
            some: {
              id: {
                in: contentIds,
              },
            },
          },
        },
        select: {
          id: true,
        },
      });

      return await tx.brain.create({
        data: {
          userId: Number(userId),
          name,
          description,
          Contents: {
            connect: contentIds.map((id) => ({ id })),
          },
          Tags: {
            connect: tags.map((tag) => ({ id: tag.id })),
          },
        },
      });
    });

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to create brain' },
        { status: 500 }
      );
    }

    console.log('Brain created successfully');

    return NextResponse.json(
      {
        message: 'Brain created successfully',
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error during creating brain:', err);
    return NextResponse.json(
      { error: 'Internal Server Error while creating brain' },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized: No userId found' },
        { status: 401 }
      );
    }
    const { brainId } = await req.json();

    const { id: userId } = (session as session).user;
    if (!brainId) {
      return NextResponse.json(
        { error: 'Missing required fields: brainId' },
        { status: 400 }
      );
    }

    const result = await db.$transaction(async (tx) => {
      return await tx.brain.delete({
        where: {
          id: brainId,
          userId: Number(userId),
        },
      });
    });

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to create brain' },
        { status: 500 }
      );
    }

    console.log('Brain deleted successfully');

    return NextResponse.json(
      {
        message: 'Brain deleted successfully',
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error during creating brain:', err);
    return NextResponse.json(
      { error: 'Internal Server Error while deleted brain' },
      { status: 500 }
    );
  }
};
