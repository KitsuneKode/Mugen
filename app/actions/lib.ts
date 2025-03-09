'use server';
import db from '@/db';

export const getPublicBrains = async () => {
  const publicBrains = await db.brain.findMany({
    where: {
      share: true,
    },

    include: {
      user: {
        select: {
          name: true,
          avatarId: true,
        },
      },
      Link: {
        select: {
          hash: true,
        },
      },
      Tags: {
        select: { tag: true },
      },
    },
  });

  return publicBrains;
};

export const getPublicBrainContents = async (hash: string) => {
  const publicBrainContents = await db.link.findUnique({
    where: { hash },
    select: {
      Brain: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              avatarId: true,
            },
          },
          name: true,
          description: true,
          stars: true,
          Contents: {
            select: {
              user: {
                select: {
                  name: true,
                  avatarId: true,
                },
              },
              createdAt: true,
              id: true,
              title: true,
              type: true,
              link: true,
              Tags: {
                select: {
                  tag: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return publicBrainContents;
};
