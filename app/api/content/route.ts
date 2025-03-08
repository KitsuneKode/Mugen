import { authOptions, type session } from '@/lib/auth';
import type { ContentType } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';

interface RequestBody {
  type: ContentType;
  link: string;
  title: string;
  tags: string[];
}

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);

    if (!session || !session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized: No userId found' },
        { status: 401 }
      );
    }
    const { type, link, title, tags }: RequestBody = await req.json();

    const { id: userId } = (session as session).user;

    // Validate required fields
    if (!type || !link || !title) {
      return NextResponse.json(
        { error: 'Missing required fields: type, link, or title' },
        { status: 400 }
      );
    }

    const result = await db.$transaction(async (tx) => {
      return await tx.content.create({
        data: {
          type,
          link,
          title,
          userId: Number(userId),
          Tags: {
            connectOrCreate:
              tags?.map((tag: string) => ({
                where: { tags: tag },
                create: { tags: tag },
              })) || [],
          },
        },
      });
    });

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to create content' },
        { status: 500 }
      );
    }

    console.log('Content added successfully');

    return NextResponse.json(
      {
        message: 'Content added successfully',
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error during adding content:', err);
    return NextResponse.json(
      { error: 'Internal Server Error while creating content' },
      { status: 500 }
    );
  }
};
