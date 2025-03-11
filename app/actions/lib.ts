'use server';
import db from '@/db';
import { randomUUID as uuidv4 } from 'crypto';
import { revalidatePath } from 'next/cache';

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

export const getMyBrainsWithNotContent = async (
  userId: number,
  contentId: number
) => {
  const myBrains = await db.brain.findMany({
    where: {
      userId,
      Contents: {
        none: {
          id: contentId,
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
  });
  return myBrains;
};

export const getMyContentsNotInBrain = async (
  userId: number,
  brainId: number
) => {
  const myContents = await db.content.findMany({
    where: {
      userId,
      Brains: {
        none: {
          id: brainId,
        },
      },
    },
    select: {
      id: true,
      title: true,
    },
  });
  return myContents;
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

export const shareBrain = async (brainId: number, share: boolean) => {
  const brainsPublicLink = await db.$transaction(async (tx) => {
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

  revalidatePath('/explore');

  return brainsPublicLink;
};
