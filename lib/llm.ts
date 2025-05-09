import { google } from "@ai-sdk/google";
import { type Message, streamText } from "ai";
import { systemPrompt1 } from "./prompts";

export interface queryResponseObject {
  id: string;
  title: string;
  score: number;
  data: string;
  tags: string[];
}

interface StreamProps {
  messages: Message[];
  search: boolean;
  queryResponse: queryResponseObject[];
  tags: string[];
  userId: string | number;
  queryDB: boolean;
}

export const getStream = ({
  messages,
  search,
  queryResponse,
  tags,
  queryDB,
  userId,
}: StreamProps) => {
  const contextMessage = `
TAGS USED BY USER: ${tags}
USERID: userId${userId}
WEB SEARCH ENABLED: ${search}
VECTOR SEARCH ENABLED: ${queryDB}
-------------------------
START CONTEXT
${JSON.stringify(queryResponse, null, 2)}
END CONTEXT
-------------------------
`;

  // const finalMessages = [
  //   ...messages.slice(0, messages.length - 1), // previous messages
  //   contextMessage, // context injection
  //   messages[messages.length - 1], // the actual latest user message
  // ];
  //

  const systemPrompt = `
  ${systemPrompt1}

  ------------------------
  ADDITIONAL DATA FROM USER(specific to questions)
    
  ${contextMessage}
  -------------------------
  `;

  return streamText({
    model: google("gemini-2.5-pro-exp-03-25", {
      useSearchGrounding: search,
      dynamicRetrievalConfig: {
        mode: "MODE_DYNAMIC",
        dynamicThreshold: 0.8,
      },
    }),
    system: systemPrompt,
    messages,
  });
};
