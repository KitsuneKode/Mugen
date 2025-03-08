'use client';

import type React from 'react';

import Image from 'next/image';
import EmbedCard from './embed-card';

export default function EmbedsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <EmbedCard
        type="twitter"
        title="Twitter Thread"
        author="@productivityguru"
        date="October 15, 2024"
        content={
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold">Productivity Guru</span>
                  <span className="text-muted-foreground">
                    @productivityguru
                  </span>
                </div>
                <p className="mt-1">
                  10 tools that have transformed my productivity workflow this
                  year:
                </p>
                <ol className="list-decimal pl-5 space-y-1 mt-2">
                  <li>Notion</li>
                  <li>Obsidian</li>
                  <li>Raycast</li>
                  <li>Arc Browser</li>
                  <li>Linear</li>
                </ol>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                #tools
              </span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                #productivity
              </span>
            </div>
          </div>
        }
      />

      <EmbedCard
        type="youtube"
        title="How to Build a Second Brain"
        author="Productivity Channel"
        date="September 28, 2024"
        content={
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
              <Image
                src="/placeholder.svg?height=200&width=350"
                alt="Video thumbnail"
                width={350}
                height={200}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                #productivity
              </span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                #learning
              </span>
            </div>
          </div>
        }
      />

      <EmbedCard
        type="article"
        title="The Power of Atomic Habits"
        author="James Clear"
        date="October 10, 2024"
        content={
          <div className="space-y-4">
            <div className="aspect-3/2 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Article thumbnail"
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-foreground line-clamp-3">
              Small changes can lead to remarkable results. Focus on systems
              rather than goals to achieve long-term success. This article
              explores how tiny habits can transform your life.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                #habits
              </span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                #growth
              </span>
            </div>
          </div>
        }
      />

      <EmbedCard
        type="reddit"
        title="Reddit Thread: Productivity Tips"
        author="r/productivity"
        date="October 5, 2024"
        content={
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Subreddit"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="font-medium">r/productivity</span>
              </div>
              <h3 className="font-bold mb-2">
                What&apos;s your #1 productivity hack that changed everything?
              </h3>
              <p className="text-sm line-clamp-3">
                After years of trying different systems, I&apos;ve found that
                time blocking combined with the Pomodoro technique has been the
                most effective for me. What&apos;s worked for you?
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                #reddit
              </span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                #productivity
              </span>
            </div>
          </div>
        }
      />

      <EmbedCard
        type="website"
        title="Halloween Decorations Guide"
        author="HalloweenFanatics.com"
        date="October 12, 2024"
        content={
          <div className="space-y-4">
            <div className="aspect-3/2 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Website thumbnail"
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-foreground line-clamp-3">
              The ultimate guide to creating a spooky atmosphere for Halloween.
              From pumpkin carving tips to DIY decorations that will impress
              your neighbors.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                #halloween
              </span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                #diy
              </span>
            </div>
          </div>
        }
      />

      <EmbedCard
        type="youtube"
        title="Pumpkin King Unboxing"
        author="CollectiblesChannel"
        date="October 18, 2024"
        content={
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
              <Image
                src="/"
                alt="Pumpkin King"
                width={350}
                height={200}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                  #collectibles
                </span>
                <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                  #halloween
                </span>
              </div>
              <div className="text-primary font-bold">$18.00</div>
            </div>
          </div>
        }
      />
    </div>
  );
}
