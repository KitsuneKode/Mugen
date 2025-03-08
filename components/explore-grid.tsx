'use client';

import { motion } from 'framer-motion';
import { Brain, User, Star, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ExploreGrid() {
  const publicBrains = [
    {
      title: 'Productivity Mastery',
      owner: 'Alex Johnson',
      description:
        'A collection of productivity techniques, tools, and insights to help you get more done with less stress.',
      tags: ['productivity', 'time-management', 'habits'],
      stars: 245,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      title: 'Web Development Resources',
      owner: 'Sarah Chen',
      description:
        'Curated list of articles, tutorials, and tools for modern web development.',
      tags: ['coding', 'web-dev', 'javascript'],
      stars: 189,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      title: 'Halloween Special',
      owner: 'Jack Skellington',
      description:
        'Everything you need for the spookiest time of the year - decorations, costumes, recipes, and more!',
      tags: ['halloween', 'diy', 'seasonal'],
      stars: 312,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      title: 'Book Summaries',
      owner: 'Bookworm42',
      description:
        'Concise summaries and key takeaways from popular non-fiction books.',
      tags: ['books', 'summaries', 'learning'],
      stars: 176,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      title: 'Digital Marketing Hub',
      owner: 'MarketingPro',
      description:
        'Strategies, case studies, and tools for effective digital marketing in 2024.',
      tags: ['marketing', 'social-media', 'seo'],
      stars: 203,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      title: 'Healthy Recipes Collection',
      owner: 'NutritionNerd',
      description:
        'Quick, healthy, and delicious recipes for busy professionals.',
      tags: ['food', 'health', 'recipes'],
      stars: 157,
      avatar: '/placeholder.svg?height=40&width=40',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {publicBrains.map((brain, index) => (
        <PublicBrainCard key={index} brain={brain} />
      ))}
    </div>
  );
}

function PublicBrainCard({ brain }: { brain: any }) {
  return (
    <motion.div
      className="bento-card bg-card border border-border/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="h-8 w-8 text-primary" />
          <div>
            <h3 className="font-bold text-lg">{brain.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{brain.owner}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-primary" />
                <span>{brain.stars}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2">
          {brain.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {brain.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Image
              src={brain.avatar || '/placeholder.svg'}
              alt={brain.owner}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-sm">{brain.owner}</span>
          </div>
          <Link
            href={`/explore/${brain.title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <button className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-md text-sm hover:bg-primary/20 transition-colors">
              <BookOpen className="h-4 w-4" />
              <span>View</span>
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
