import axios from "axios";

import { YoutubeTranscript } from "youtube-transcript";
import type { ContentType } from "@prisma/client";

interface ScrapeTypeProps {
  type: ContentType;
  url: string;
}
// export const instagramJSON = (html: string, id: string) => {
//   const json = JSON.parse(html)?.graphql?.shortcode_media;
//   const content = {
//     id,
//     mainContent: {
//       displayUrl: json?.display_url,
//     },
//     user: {
//       username: json?.owner?.username,
//       isVerified: json?.owner?.is_verified,
//       profilePic: json?.owner?.profile_pic_url,
//     },
//     caption: {
//       main: json?.edge_media_to_caption.edges[0]?.node.text,
//       accessibile: json?.accessibility_caption,
//     },
//     location: json?.location,
//     comments: json?.edge_media_to_parent_comment?.count,
//     likes: json?.edge_media_preview_like?.count,
//     isVideo: json?.is_video,
//     videoUrl: json?.video_url,
//     //@ts-ignore
//     allImages: json?.edge_sidecar_to_children?.edges?.map((item) => ({
//       displayUrl: item?.node?.display_url,
//     })),
//   };
//
//   return content;
// };

export const scrapeData = async ({ type, url }: ScrapeTypeProps) => {
  if (
    type === "reddit" ||
    type === "other" ||
    type === "article" ||
    type === "embed_link"
  ) {
    const response = await axios.get(`https://r.jina.ai/${url}`);

    return response.data;
  } else if (type === "twitter") {
    const id = url.split("/").pop();

    console.log("id", id);

    const response = await axios.get(
      `https://api.twitterapi.io/twitter/tweets?tweet_ids=${id}`,
      {
        headers: { "X-API-Key": process.env.TWITTER_IO_API_SECRET },
      },
    );

    console.log("response", response.data);
    return response.data.toString();
  } else if (type === "youtube") {
    const responseTranscript = await YoutubeTranscript.fetchTranscript(url);

    const content = responseTranscript.map((item) => item.text).join(" ");

    return content;
  } else {
    // const instagramPostContent =  await axios.get();

    return url;
  }
};
