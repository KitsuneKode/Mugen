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
                where: { tag },
                create: { tag },
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

    return NextResponse.json({
      message: 'Content added successfully',
    });
  } catch (err) {
    console.error('Error during adding content:', err);
    return NextResponse.json(
      { error: 'Internal Server Error while creating content' },
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
    const userId = (session as session).user.id;

    const id = req.nextUrl.searchParams.get('contentId');

    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized - No userId found' },
        { status: 401 }
      );
    }

    await db.$transaction(async (tx) => {
      const existingContent = await tx.content.findFirst({
        where: {
          id: Number(id),
          userId: Number(userId),
        },
      });

      if (!existingContent) {
        return NextResponse.json(
          {
            error:
              'Content not found or you do not have permission to delete it',
          },
          { status: 500 }
        );
      }

      await tx.content.delete({
        where: {
          id: Number(id),
          userId: Number(userId),
        },
      });

      return NextResponse.json(
        {
          message: 'Content successfully deleted',
          deletedContentId: id,
        },
        { status: 200 }
      );
    });
  } catch (err) {
    console.error('Error during deleting content:', err);
    return NextResponse.json(
      { error: 'Internal Server Error error while deleting content' },
      { status: 500 }
    );
  }
};
