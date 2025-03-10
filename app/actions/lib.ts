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
                  id: true,
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

export const getMyBrains = async (userId: number) => {
  const myBrains = await db.brain.findMany({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          name: true,
          avatarId: true,
        },
      },

      Tags: {
        select: {
          tag: true,
        },
      },
    },
  });

  return myBrains;
};

export const getMyContents = async (userId: number) => {
  const myContents = await db.content.findMany({
    where: {
      userId,
    },
    select: {
      user: {
        select: {
          id: true,
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
  });
  return myContents;
};

export const getMyContentsName = async (userId: number) => {
  const myContents = await db.content.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
    },
  });
  return myContents;
};

export const getMyPrivateBrainsNames = async (userId: number) => {
  const myBrains = await db.brain.findMany({
    where: {
      userId,
      share: false,
    },
    select: {
      id: true,
      name: true,
    },
  });
  return myBrains;
};

export const getMyBrainContents = async (brainId: number) => {
  const myBrainContents = await db.brain.findUnique({
    where: { id: brainId },
    select: {
      name: true,
      stars: true,
      share: true,
      description: true,
      user: {
        select: {
          name: true,
        },
      },
      Contents: {
        select: {
          user: {
            select: {
              id: true,
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
  });

  return myBrainContents;
};
