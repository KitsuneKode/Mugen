"use server";

import { Index as UpstashIndex } from "@upstash/vector";
import { redis } from "./redis";
import type { ContentType } from "@prisma/client";
import { scrapeData } from "./scrapeData";

const index = new UpstashIndex();

export const updateContextToVecDB = async ({
  type,
  userId,
  url,
  tags,
  title,
  status,
}: {
  type?: ContentType;
  status: "add" | "delete";
  url: string;
  title?: string;
  userId: number;
  tags?: string[];
}) => {
  const isAlreadyIndexed = await redis.sismember("indexed-urls", url);
  const isUserIndexed = await redis.sismember(url, userId);

  if ((!isAlreadyIndexed || !isUserIndexed) && status === "add" && type) {
    if (!isAlreadyIndexed) {
      // console.log('Indexing new URL:', url);
      const content = await scrapeData({ type, url });
      // console.log(scrapeData, content);

      await index.upsert({
        id: url,
        data: content,
        metadata: {
          users: [userId],
          [`userId${userId}`]: { tags, title },
        },
      });

      await redis.sadd(url, userId);
      await redis.sadd(`${url}-tags`, {
        [`userId${userId}`]: { tags, title },
      });
      await redis.sadd("indexed-urls", url);
      // console.log('Added to indexed URLs');
    } else {
      // console.log('Updating existing URL:', url);
      const existingUsers = await redis.smembers(url);
      const existingTags = await redis.smembers(`${url}-tags`);

      const updatedMetadata = existingTags.reduce(
        (acc, curr) => {
          const [[userId, tags]] = Object.entries(curr);
          return {
            users: [...existingUsers, userId],
            ...acc,
            [`userId${userId}`]: { tags, title },
          };
        },
        {} as Record<string, string[]>,
      );
      // console.log(updatedMetadata);

      await index.update({
        id: url,
        metadata: updatedMetadata,
      });

      await redis.sadd(url, userId);
      await redis.sadd(`${url}-tags`, {
        [`userId${userId}`]: { tags, title },
      });
      // console.log('Updated existing URL');
    }
    // console.log('Indexed');
  } else if (status === "delete") {
    const existingUsers = await redis.smembers(url);

    const updatedUsers = existingUsers.filter(
      //@ts-ignore
      (user) => user?.userId != userId,
    );
    // console.log('Existing users:', existingUsers);
    // console.log('updatedUsers', updatedUsers);

    index.update({
      id: url,
      metadata: {
        users: updatedUsers,
        [`userId${userId}`]: {},
      },
    });
    await redis.srem(url, userId);
    await redis.srem(`${url}-tags`, { [`userId${userId}`]: {} });

    // console.log('Deleted user from URL');
  }
};

export const queryContextFromVecDB = async ({
  data,
  tags,
  userId,
}: {
  data: string;
  tags?: string[];
  userId: string;
}) => {
  const tagQuery =
    tags?.map((tag) => `userId${userId}.tags CONTAINS "${tag}"`).join(" OR ") ??
    "";
  const filterString = `users CONTAINS ${userId} ${
    tagQuery ? `AND (${tagQuery})` : ""
  }`;
  console.log(data, userId, tags);
  console.log("Filter string:", filterString);

  const queryResponse = await index.query({
    data,
    filter: filterString,
    topK: 5,
    includeMetadata: true,
    includeData: true,
  });

  if (!queryResponse) {
    return queryResponse ?? "";
  }

  const filteredResponse = queryResponse.map((query) => {
    //@ts-ignore
    const queryFiltered = {
      id: query.id,
      data: query.data,
      score: query.score,
      //@ts-ignore
      tags: query.metadata[`userId${userId}`].tags,
      //@ts-ignore
      title: query.metadata?.[`userId${userId}`].title,
    };
    return queryFiltered;
  });

  return filteredResponse;
};
