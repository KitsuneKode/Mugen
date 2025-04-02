"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ContentType } from "@prisma/client";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  InstagramIcon,
  LinkIcon,
  Twitter,
  X,
  YoutubeIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import Reddit from "./reddit";
import { updateContextToVecDB } from "@/lib/upstash-index";
import { useSession } from "next-auth/react";

interface AddContentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddContentDialog({
  open,
  onOpenChange,
}: AddContentDialogProps) {
  const [contentType, setContentType] = useState<ContentType | null>(null);
  const [contentTags, setContentTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const tagsRef = useRef<HTMLInputElement>(null);
  const session = useSession();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    if (!contentType) {
      toast.error("Please select a content type");
      return;
    }

    if (isLoading) return;
    e.preventDefault();
    setIsLoading(true);

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const getTags = () => {
      if (!tagsRef.current) return contentTags;
      if (tagsRef.current.value === "") return contentTags;
      const tags = tagsRef.current.value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      if (tags.length > 5) {
        toast.error("You can only add up to 5 tags");
        return contentTags; // Return contentTags if the limit is exceeded
      }

      const newTags = tags
        .slice(0, 5)
        .filter((tag) => !contentTags.includes(tag));
      tagsRef.current.value = "";

      return [...contentTags, ...newTags];
    };

    const data: Record<string, ContentType | string[] | string> = {
      type: contentType,
      tags: getTags(),
      title: formData.get("title") as string,
    };

    switch (contentType) {
      case "other":
        data.link = formData.get("url") as string;
        break;
      case "article":
        data.link = formData.get("content") as string;
        break;
      case "twitter":
        data.link = formData.get("tweet-url") as string;
        break;
      case "youtube":
      case "instagram":
      case "reddit":
        data.link = formData.get("video-url") as string;
        break;
    }

    const { title, link, tags, type } = data;

    try {
      await axios.post("/api/content", {
        title,
        link,
        tags,
        type,
      });

      const id = toast.success("Content added successfully");

      router.refresh();

      const ingestData: {
        type: ContentType;
        url: string;
        userId: number;
        status: "add";
        title: string;
        tags: string[];
      } = {
        type: type as ContentType,
        url: link as string,
        userId: Number(session.data?.user.id),
        status: "add",
        tags: tags as string[],
        title: title as string,
      };

      await updateContextToVecDB(ingestData);

      toast.dismiss(id);
      toast.success("Content indexed to your Second Brain Embeddings");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error("Failed to add Content");
      } else {
        toast.error("Failed to index Content");
      }
    } finally {
      setIsLoading(false);
      onOpenChange(false);
      setContentTags([]);
      setContentType(null);
    }
  };

  const contentTypes = [
    {
      type: "other",

      icon: LinkIcon,
      label: "Link",
      description: "Save a article to an article, website, or resource",
    },
    {
      type: "article",
      icon: FileText,
      label: "Note",
      description: "Create a new note or document",
    },
    {
      type: "twitter",
      icon: Twitter,
      label: "Tweet",
      description: "Save a tweet or thread",
    },
    {
      type: "youtube",
      icon: YoutubeIcon,
      label: "Youtube",
      description: "Save a video from YouTube or other platforms",
    },
    {
      type: "instagram",
      icon: InstagramIcon,
      label: "Instagram",
      description: "Save reel/post/ from Instagram",
    },
    {
      type: "reddit",
      icon: Reddit,
      label: "Reddit",
      description: "Save reddit posts or comments",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Content</DialogTitle>
          <DialogDescription>
            Choose the type of content you want to add to your Second Brain.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!contentType ? (
            <motion.div
              key="content-types"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 gap-4 py-4"
            >
              {contentTypes
                .slice()
                .reverse()
                .map((type) => (
                  <button
                    key={type.type}
                    onClick={() => {
                      setContentType(type.type as ContentType);
                      setContentTags([type.type]);
                    }}
                    disabled={isLoading}
                    className="group relative flex flex-col items-center gap-2 rounded-lg border border-border p-4 hover:cursor-pointer hover:border-primary/50 hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <type.icon className="h-8 w-8 text-primary" />
                    <div className="text-center">
                      <h3 className="font-medium">{type.label}</h3>
                      <p className="text-xs text-muted-foreground">
                        {type.description}
                      </p>
                    </div>
                  </button>
                ))}
            </motion.div>
          ) : (
            <motion.form
              key="content-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="space-y-4 py-4"
            >
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent hover:cursor-pointer"
                  onClick={() => setContentType(null)}
                  disabled={isLoading}
                >
                  <X className="h-4 w-4" />
                </Button>
                <h3 className="font-medium">
                  Add{" "}
                  {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
                </h3>
              </div>

              {contentType === "other" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      name="url"
                      placeholder="https://example.com"
                      type="url"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Title of the content"
                      required
                    />
                  </div>
                </>
              )}

              {contentType === "article" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Note title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="Write your note here..."
                      required
                      rows={5}
                    />
                  </div>
                </>
              )}

              {contentType === "twitter" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="title">Tweet Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Tweet title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tweet-url">Tweet URL</Label>
                    <Input
                      id="tweet-url"
                      name="tweet-url"
                      placeholder="Enter tweet URL"
                      required
                    />
                  </div>
                </>
              )}

              {contentType === "youtube" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="title">Youtube Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Youtube Video title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video-url">Youtube Video URL</Label>
                    <Input
                      id="video-url"
                      name="video-url"
                      placeholder="https://youtube.com/watch?v=..."
                      type="url"
                      required
                    />
                  </div>
                </>
              )}

              {contentType === "reddit" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="title">SubReddit</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="r/subreddit-name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-url">Reddit URL</Label>
                    <Input
                      id="video-url"
                      type="url"
                      name="video-url"
                      placeholder={`https://www.reddit.com/r/linux/as....`}
                      required
                    />
                  </div>
                </>
              )}

              {contentType === "instagram" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="title">Instagram post/reel title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Instagram title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-url">Video URL</Label>
                    <Input
                      id="video-url"
                      name="video-url"
                      placeholder="https://instagram.com/..."
                      type="url"
                      required
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="Add tags separated by commas and press enter"
                  ref={tagsRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      const tags = input.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter((tag) => tag !== "");
                      if (tags.length > 5) {
                        toast.error("You can only add up to 5 tags");
                        return;
                      }
                      setContentTags((prev) => [
                        ...prev,
                        ...tags
                          .slice(0, 5)
                          .filter((tag) => !prev.includes(tag)), // Limit to 5 tags
                      ]);
                      input.value = "";
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2 mt-4">
                  {contentTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md"
                    >
                      {`#${tag}`}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Adding...
                    </>
                  ) : (
                    "Add to Second Brain"
                  )}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
