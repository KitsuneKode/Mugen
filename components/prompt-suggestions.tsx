import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface PromptSuggestionsProps {
  onSelectPrompt: (prompt: string) => void;
  userId: string | undefined;
}

const PROMPT_SUGGESTIONS = [
  "Summarize my content about React",
  "Find articles about productivity",
  "Who tweeted about TrumpCoin?",
  "What was the youtube video on AI agents that got 100k views?",
];

export function PromptSuggestions({
  onSelectPrompt,
  userId,
}: PromptSuggestionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-2 w-full max-w-2xl mx-auto"
    >
      <div className="flex flex-wrap justify-center gap-2 w-full">
        {PROMPT_SUGGESTIONS.map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            disabled={!userId}
            className="text-xs bg-card hover:bg-secondary/80 transition-colors"
            onClick={() => {
              onSelectPrompt(prompt);
            }}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
