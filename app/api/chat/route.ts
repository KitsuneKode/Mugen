import { authOptions } from "@/lib/auth";
import { getStream, queryResponseObject } from "@/lib/llm";
import { queryContextFromVecDB } from "@/lib/upstash-index";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, search, queryDB, tags } = await req.json();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  //@ts-ignore
  let queryResponse = [];

  if (queryDB && session.user.id) {
    queryResponse = (await queryContextFromVecDB({
      data: messages[messages.length - 1].content,
      tags,
      userId: session.user.id,
    })) as queryResponseObject[];
  }

  console.log(queryDB);
  const result = getStream({
    messages,
    //@ts-ignore
    queryDB,
    search,
    //@ts-ignore
    queryResponse,
    tags,
    userId: session?.user.id,
  });

  return result.toDataStreamResponse();
}
