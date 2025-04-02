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

    console.log(tags);

    const result = await db.$transaction(async (tx) => {
      // First upsert all tags and get their IDs
      const tagObjects = await Promise.all(
        tags?.map(async (tag: string) => {
          return await tx.tag.upsert({
            where: { tag },
            create: {
              tag,
              Users: {
                connect: { id: Number(userId) },
              },
            },
            update: {
              Users: {
                connect: { id: Number(userId) },
              },
            },
          });
        })
      );

      // Then create content with the tags
      return await tx.content.create({
        data: {
          type,
          link,
          title,
          userId: Number(userId),
          Tags: {
            connect: tagObjects.map((tag) => ({ id: tag.id })),
          },
        },
        include: {
          Tags: true,
          user: {
            include: {
              Tags: true,
            },
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
      data: result,
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

    const result = await db.$transaction(async (tx) => {
      // Get the content with its tags and count of tag usage in a single query
      const contentWithTagUsage = await tx.content.findFirst({
        where: {
          id: Number(id),
          userId: Number(userId),
        },
        include: {
          Tags: {
            include: {
              _count: {
                select: {
                  Contents: {
                    where: {
                      userId: Number(userId),
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!contentWithTagUsage) {
        return {
          message:
            'Content not found or you do not have permission to delete it',
          status: 500,
        };
      }

      // Get tags that are only used by this content
      const tagsToDisconnect = contentWithTagUsage.Tags.filter(
        (tag) => tag._count.Contents === 1
      ).map((tag) => ({ id: tag.id }));

      // Bulk disconnect tags from user if any found
      if (tagsToDisconnect.length > 0) {
        await tx.user.update({
          where: { id: Number(userId) },
          data: {
            Tags: {
              disconnect: tagsToDisconnect,
            },
          },
        });
      }

      // Delete the content
      const deleted = await tx.content.delete({
        where: {
          id: Number(id),
          userId: Number(userId),
        },
      });

      if (!deleted) {
        return {
          message: 'Failed to delete content',
          status: 500,
        };
      }

      return {
        message: 'Content deleted successfully',
        status: 200,
      };
    });

    return NextResponse.json(
      {
        message: result.message,
      },
      { status: result.status }
    );
  } catch (err) {
    console.error('Error during deleting content:', err);
    return NextResponse.json(
      { error: 'Internal Server Error error while deleting content' },
      { status: 500 }
    );
  }
};
