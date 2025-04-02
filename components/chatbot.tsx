"use client";

import { Send, Bot, RefreshCcw, Loader2, Search, Database } from "lucide-react";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useChat } from "@ai-sdk/react";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { PromptSuggestions } from "./prompt-suggestions";
import { TagSelector } from "./tag-selector";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { ChatBubble } from "./chat-bubble";

// type Message = {
// role: "user" | "assistant";
// content: string;
// };

interface ChatBotProps {
  movement?: boolean;
}

export default function ChatBot({ movement = true }: ChatBotProps) {
  const pathname = usePathname();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [queryKnowledgeBase, setQueryKnowledgeBase] = useState(true);
  const [search, setSearch] = useState(false);
  const {
    messages,
    input,
    handleSubmit,
    append,
    handleInputChange,
    setMessages,
    status,
    stop,
    error,
    reload,
  } = useChat({
    body: {
      queryDB: queryKnowledgeBase,
      tags: selectedTags,
      search,
    },
  });

  const session = useSession();

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!input.trim()) return;
  //
  //   // Add user message
  //   const userMessage: Message = { role: "user", content: input };
  //   setMessages((prev) => [...prev, userMessage]);
  //   setInput("");
  //
  //   // Simulate assistant response
  //   setTimeout(() => {
  //     const responses = [
  //       `'I found several notes related to that topic in your Second Brain. Would you like me to summarize them?',
  //       'I found several notes related to that topic in your Second Brain. Would you like me to summarize them?',
  //       'I found several notes related to that topic in your Second Brain. Would you like me to summarizeyy them?'`,
  //       "Based on your saved content, here are some relevant insights that might help you with that.",
  //       "I've analyzed your notes and found some interesting connections you might want to explore.",
  //       "I don't have enough information about that in your Second Brain yet. Would you like to add some content on this topic?",
  //     ];
  //
  //     const randomResponse =
  //       responses[Math.floor(Math.random() * responses.length)];
  //     setMessages((prev) => [
  //       ...prev,
  //       { role: "assistant", content: randomResponse },
  //     ]);
  //   }, 1000);
  // };

  useEffect(() => {
    if (pathname === "/" && !session?.data?.user.id) {
      setMessages([
        {
          id: "jdhakhdkas",
          role: "assistant",
          content:
            "Hello! I'm your Brain Assistant. I can help you only if you are logged in with your Second Brain account. Please log in to get started.",
        },
      ]);
    }
    return () => {
      setMessages([]);
      setSelectedTags([]);
      setQueryKnowledgeBase(true);
    };
  }, [setMessages, pathname, session.data]);

  useEffect(() => {
    if (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: "error",
          role: "assistant",
          content: "An error occurred. Please try again.",
        },
      ]);
      toast.error("An error occurred. Please try again.");
    }
  }, [error, setMessages]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    }
  };
  const handlePromptSelect = (prompt: string) => {
    append({
      id: "cjasdbakhdoacnlasdnl",
      role: "user",
      content: prompt,
    });
  };

  return (
    <div
      className={`max-w-3xl mx-auto max-h-screen ${
        !movement ? "md:min-w-[60%] min-w-[100%]" : ""
      }`}
    >
      <motion.div
        className="bg-card border border-border rounded-xl overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          rotate: movement ? [-1, 1, -1] : 0,
          transition: {
            rotate: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            },
            opacity: { duration: 0.5 },
            y: { duration: 0.5 },
          },
        }}
        whileHover={{
          rotate: 0,
          scale: movement ? 1.1 : 1.05,
          boxShadow: "0 8px 30px hsl(var(--primary)/0.45)",
          transition: {
            type: "spring",
            stiffness: 300,
          },
        }}
        viewport={{ once: true }}
      >
        <div className="p-4 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Brain Assistant</h3>
          </div>
        </div>

        <div
          ref={chatContainerRef}
          className={`h-96 overflow-y-auto scroll-smooth ${
            !movement ? "h-[60vh]" : ""
          }`}
        >
          <div className="p-4 space-y-4">
            {messages.map((message, index) => (
              <ChatBubble
                key={message.id || index}
                message={message}
                isLoading={
                  message.role === "assistant" &&
                  index === messages.length - 1 &&
                  (status === "streaming" || status === "submitted")
                }
              />
            ))}

            {status === "submitted" &&
              messages[messages.length - 1]?.role !== "assistant" && (
                <ChatBubble
                  message={{
                    id: "loading",
                    role: "assistant",
                    content: "",
                    parts: [],
                  }}
                  isLoading={true}
                />
              )}
          </div>

          <div
            className={cn(
              "top-2/5 justify-center w-full border-2 mx-auto px-auto py-2 rounded-3xl flex sticky flex-col",
              (messages.length > 1 || status === "submitted") && "md:hidden",
            )}
          >
            <div className="mb-6 text-center text-primary font-space-grotesk">
              <span className="text-xl md:text-2xl font-bold">
                How can I help you today?
              </span>
              <br />
              Your Second Brain assistant can access all your saved content to
              provide relevant answers.
            </div>

            <PromptSuggestions onSelectPrompt={handlePromptSelect} />
          </div>
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative p-4 border-t border-border"
        >
          {error && (
            <div className="text-red-500 text-sm mb-2">{error.message}</div>
          )}

          <div className="flex flex-col gap-4">
            <Textarea
              rows={3}
              value={input}
              disabled={status !== "ready" || error != null}
              autoFocus={pathname === "/" ? false : true}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              onChange={handleInputChange}
              placeholder="Ask your Second Brain..."
              className="flex-1 px-4 py-2 bg-background border border-input rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/50"
            />

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-secondary/30 p-1 rounded-lg">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setSearch(!search)}
                        className={cn(
                          "h-8 w-8 p-0 rounded-md",
                          search && "bg-primary/10 text-primary",
                        )}
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Search</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-8 w-8 p-0 rounded-md",
                          queryKnowledgeBase && "bg-primary/10 text-primary",
                        )}
                        onClick={() =>
                          setQueryKnowledgeBase(!queryKnowledgeBase)
                        }
                      >
                        <Database className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {queryKnowledgeBase ? "Disable" : "Enable"} Knowledge Base
                      Query
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipContent>
                      <p>Add/Remove Tags</p>
                    </TooltipContent>

                    <TooltipTrigger asChild>
                      <TagSelector
                        selectedTags={selectedTags}
                        onTagsChange={setSelectedTags}
                        buttonClassName="h-8 w-8 p-0 rounded-md"
                        iconOnly
                      />
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>
                <div className="flex flex-col gap-2">
                  {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md flex items-center gap-1"
                        >
                          #{tag}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => handleTagSelect(tag)}
                          >
                            ×
                          </Button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit/Loading/Error buttons */}
          {(status === "submitted" || status === "streaming") && (
            <Button
              onClick={() => stop()}
              className="absolute right-6 bottom-6 z-10"
            >
              <Loader2 className="h-5 w-5 animate-spin" />
            </Button>
          )}
          {status === "ready" && !error && (
            <Button
              type="submit"
              className="absolute right-6 bottom-6 z-10"
              disabled={!input.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          )}
          {error && (
            <Button
              onClick={() => reload()}
              className="absolute right-6 bottom-6 z-10"
            >
              <RefreshCcw className="h-5 w-5" />
            </Button>
          )}
        </form>
      </motion.div>
    </div>
  );
}
