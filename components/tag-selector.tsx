"use client";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown, Tags } from "lucide-react";
import { cn } from "../lib/utils";
import { useState, useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { toast } from "sonner";
import { getUserTags } from "@/app/actions/lib";
import { useSession } from "next-auth/react";

interface TagSelectorProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  buttonClassName?: string;
  iconOnly?: boolean;
}

export function TagSelector({
  selectedTags,
  onTagsChange,
  buttonClassName,
  iconOnly = false,
}: TagSelectorProps) {
  const [open, setOpen] = useState(false);
  const [firstOpen, setFirstOpen] = useState(true);
  const [availableTags, setAvailableTags] = useState<string[] | null>(null);

  const session = useSession();
  useEffect(() => {
    if (firstOpen && open) {
      toast.warning(
        "Selecting Tags will make your search restricted to tags. If you don't know which tag to choose, Please keep it empty",
        { duration: 10000 },
      );
    }
    const setTags = async () => {
      const tags = await getUserTags(Number(session.data?.user.id));
      //@ts-ignore
      const userTags = tags?.Tags.map((t) => t.tag) ?? [];

      toast.info(
        userTags.length > 0 ? `${userTags.length} tags found` : "No tags found",
      );
      setAvailableTags(userTags);
      setFirstOpen(false);
    };

    if (firstOpen && open && session.data?.user.id && !availableTags) {
      setTags();
    }
  }, [session.data?.user, firstOpen, open, availableTags]);

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 5) {
      onTagsChange([...selectedTags, tag]);
    } else {
      toast.error("You can only select up to 5 tags");
    }
    // Don't close popover after selection to allow multiple selections
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          disabled={!session.data?.user.id}
          className={cn(
            "justify-between",
            iconOnly && "w-8 h-8 p-0",
            buttonClassName,
          )}
        >
          <Tags
            className={cn(
              "h-4 w-4",
              !iconOnly && "mr-2",
              selectedTags.length > 0 && "text-primary bg-primary/10",
            )}
          />

          {!iconOnly && (
            <>
              {selectedTags.length === 0
                ? "Select tags..."
                : `${selectedTags.length} selected`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search tags..." />
          <CommandEmpty>No tags found.</CommandEmpty>
          <CommandGroup>
            {availableTags?.map((tag) => (
              <CommandItem key={tag} onSelect={() => handleTagSelect(tag)}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 border rounded-sm ${
                      selectedTags.includes(tag)
                        ? "bg-primary border-primary"
                        : "border-muted-foreground"
                    }`}
                  >
                    {selectedTags.includes(tag) && (
                      <Check className="h-3 w-3 text-primary-foreground" />
                    )}
                  </div>
                  {tag}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
