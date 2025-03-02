'use client';

import type React from 'react';

import { motion } from 'framer-motion';
import {
  Brain,
  MessageSquare,
  FileText,
  Share2,
  Globe,
  Lock,
  Video,
  Zap,
  MessageCircleCodeIcon,
  Instagram,
  YoutubeIcon,
} from 'lucide-react';

export default function BentoFeatures() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 font-space-grotesk"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="text-[#5f2b8f]"
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              Mugen:{' '}
            </motion.span>
            Your Digital Brain,{' '}
            <motion.span
              className="text-primary"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              Supercharged
            </motion.span>
          </motion.h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Organize, connect, and interact with your digital content in ways
            you never thought possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <FeatureCard
            className="md:col-span-2 md:row-span-2"
            content={
              <div className="h-full flex flex-col">
                <motion.h3
                  className="text-3xl font-bold mb-3 font-space-grotesk text-primary"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  Embed Anything
                </motion.h3>
                <p className="text-muted-foreground mb-6">
                  Save and organize content from across the web. Twitter
                  threads, YouTube videos, articles, and more - all in one
                  place.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  {[
                    { icon: YoutubeIcon, label: 'Youtube' },
                    { icon: Instagram, label: 'Insta-posts' },
                    { icon: FileText, label: 'Articles' },
                    { icon: MessageSquare, label: 'Tweets' },
                    // { icon: FileText, label: 'Notes' },
                    { icon: MessageCircleCodeIcon, label: 'Reddit' },
                    { icon: Video, label: 'Videos' },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center text-center"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: 'hsl(var(--primary) / 0.1)',
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        type: 'spring',
                        delay: index * 0.1,
                        stiffness: 300,
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className="h-8 w-8 text-primary mb-2" />
                      </motion.div>
                      <span className="text-sm">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            }
          />

          <FeatureCard
            content={
              <div className="h-full flex flex-col">
                <motion.h3
                  className="text-2xl font-bold mb-3 font-space-grotesk text-primary"
                  whileHover={{ scale: 1.05 }}
                >
                  AI-Powered Chat
                </motion.h3>
                <p className="text-muted-foreground">
                  Ask questions and get insights from your personal knowledge
                  base with our AI assistant.
                </p>
                <motion.div
                  className="mt-4 p-3 bg-muted rounded-lg"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="flex items-start gap-2 mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Brain className="h-5 w-5 text-primary mt-1" />
                    </motion.div>
                    <motion.p
                      className="text-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      How can I improve my productivity workflow?
                    </motion.p>
                  </motion.div>
                  <motion.div
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <MessageSquare className="h-5 w-5 text-primary mt-1" />
                    </motion.div>
                    <motion.p
                      className="text-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Based on your saved articles, try time blocking and the
                      Pomodoro technique...
                    </motion.p>
                  </motion.div>
                </motion.div>
              </div>
            }
          />

          <FeatureCard
            content={
              <div className="h-full flex flex-col">
                <motion.h3
                  className="text-2xl font-bold mb-3 font-space-grotesk text-primary"
                  whileHover={{ scale: 1.05 }}
                >
                  Connect Ideas
                </motion.h3>
                <p className="text-muted-foreground mb-4">
                  Build a network of knowledge by connecting related concepts
                  and content.
                </p>
                <motion.div
                  className="relative h-32 mt-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <svg viewBox="0 0 200 100" className="w-full h-full">
                      <line
                        x1="40"
                        y1="20"
                        x2="80"
                        y2="40"
                        stroke="#FF7A00"
                        strokeWidth="1"
                      />
                      <line
                        x1="80"
                        y1="40"
                        x2="120"
                        y2="20"
                        stroke="#FF7A00"
                        strokeWidth="1"
                      />
                      <line
                        x1="80"
                        y1="40"
                        x2="80"
                        y2="80"
                        stroke="#FF7A00"
                        strokeWidth="1"
                      />
                      <line
                        x1="80"
                        y1="80"
                        x2="120"
                        y2="60"
                        stroke="#FF7A00"
                        strokeWidth="1"
                      />
                      <line
                        x1="120"
                        y1="20"
                        x2="160"
                        y2="40"
                        stroke="#FF7A00"
                        strokeWidth="1"
                      />
                      <line
                        x1="120"
                        y1="60"
                        x2="160"
                        y2="40"
                        stroke="#FF7A00"
                        strokeWidth="1"
                      />

                      <circle
                        cx="40"
                        cy="20"
                        r="8"
                        fill="#1E293B"
                        stroke="#FF7A00"
                        strokeWidth="1"
                      />
                      <circle
                        cx="80"
                        cy="40"
                        r="8"
                        fill="#1E293B"
                        stroke="#FF7A00"
                        strokeWidth="1"
                      />
                      <circle
                        cx="120"
                        cy="20"
                        r="8"
                        fill="#1E293B"
                        stroke="#FF7A00"
                        strokeWidth="1"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="8"
                        fill="#1E293B"
                        stroke="#FF7A00"
                        strokeWidth="1"
                      />
                      <circle
                        cx="120"
                        cy="60"
                        r="8"
                        fill="#1E293B"
                        stroke="#FF7A00"
                        strokeWidth="1"
                      />
                      <circle
                        cx="160"
                        cy="40"
                        r="8"
                        fill="#1E293B"
                        stroke="#FF7A00"
                        strokeWidth="1"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            }
          />

          <FeatureCard
            content={
              <div className="h-full flex flex-col">
                <motion.h3
                  className="text-2xl font-bold mb-3 font-space-grotesk text-primary"
                  whileHover={{ scale: 1.05 }}
                >
                  Share Publicly
                </motion.h3>
                <p className="text-muted-foreground mb-4">
                  Share your knowledge with the world or keep it private - you
                  decide.
                </p>
                <motion.div
                  className="flex gap-4 mt-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="flex-1 bg-muted rounded-lg p-3 flex flex-col items-center justify-center text-center"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'hsl(var(--primary) / 0.1)',
                    }}
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Globe className="h-6 w-6 text-primary mb-2" />
                    </motion.div>
                    <span className="text-xs">Public</span>
                  </motion.div>
                  <motion.div
                    className="flex-1 bg-muted rounded-lg p-3 flex flex-col items-center justify-center text-center"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'hsl(var(--primary) / 0.1)',
                    }}
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Lock className="h-6 w-6 text-primary mb-2" />
                    </motion.div>
                    <span className="text-xs">Private</span>
                  </motion.div>
                  <motion.div
                    className="flex-1 bg-muted rounded-lg p-3 flex flex-col items-center justify-center text-center"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'hsl(var(--primary) / 0.1)',
                    }}
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Share2 className="h-6 w-6 text-primary mb-2" />
                    </motion.div>
                    <span className="text-xs">Shared</span>
                  </motion.div>
                </motion.div>
              </div>
            }
          />

          <FeatureCard
            className="md:col-span-2"
            content={
              <div className="h-full flex flex-col md:flex-row gap-6">
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.h3
                    className="text-2xl font-bold mb-3 font-space-grotesk text-primary"
                    whileHover={{ scale: 1.05 }}
                  >
                    Bento Grid Layout
                  </motion.h3>
                  <motion.p
                    className="text-muted-foreground mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Organize your content in a beautiful, customizable grid
                    layout that makes information easy to find.
                  </motion.p>
                  <motion.ul
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.li
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Zap className="h-5 w-5 text-primary mt-0.5" />
                      </motion.div>
                      <span>Drag and drop interface</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Zap className="h-5 w-5 text-primary mt-0.5" />
                      </motion.div>
                      <span>Customizable card sizes</span>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Zap className="h-5 w-5 text-primary mt-0.5" />
                      </motion.div>
                      <span>Filter by tags and categories</span>
                    </motion.li>
                  </motion.ul>
                </motion.div>
                <motion.div
                  className="flex-1 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="grid grid-cols-2 gap-2 w-full max-w-xs"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      className="aspect-square bg-muted rounded-lg"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    ></motion.div>
                    <motion.div
                      className="aspect-square bg-muted rounded-lg"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    ></motion.div>
                    <motion.div
                      className="aspect-square bg-muted rounded-lg"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    ></motion.div>
                    <motion.div
                      className="aspect-square bg-muted rounded-lg"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    ></motion.div>
                  </motion.div>
                </motion.div>
              </div>
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            content={
              <div className="h-full flex flex-col">
                <motion.h3
                  className="text-3xl font-bold mb-3 font-space-grotesk text-primary"
                  whileHover={{ scale: 1.05 }}
                >
                  Calendar View
                </motion.h3>
                <motion.p
                  className="text-muted-foreground mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Organize your content chronologically and never miss important
                  information.
                </motion.p>
                <motion.div
                  className="mt-auto bg-muted rounded-lg p-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="grid grid-cols-7 gap-1 text-center text-xs mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      S
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      M
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      T
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      W
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      T
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      F
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                    >
                      S
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="grid grid-cols-7 gap-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {[...Array(31)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`aspect-square flex items-center justify-center text-xs rounded-full
                          ${
                            i === 30
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-accent-foreground/10'
                          }
                        `}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          type: 'spring',
                          delay: i * 0.1,
                          stiffness: 300,
                        }}
                      >
                        {i + 1}
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            }
          />

          <FeatureCard
            content={
              <div className="h-full flex flex-col">
                <motion.h3
                  className="text-3xl font-bold mb-3 font-space-grotesk text-primary"
                  whileHover={{ scale: 1.05 }}
                >
                  Spooky Discounts
                </motion.h3>
                <motion.p
                  className="text-muted-foreground mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Get an additional discount on all premium plans this October!
                </motion.p>
                <motion.div
                  className="mt-auto p-4 bg-secondary/50 rounded-lg border border-primary/30"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.h4
                    className="text-xl font-bold font-space-grotesk text-primary mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Limited Time Offer
                  </motion.h4>
                  <motion.p
                    className="text-sm mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Use code{' '}
                    <motion.span
                      className="font-bold text-primary"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      SPOOKY2024
                    </motion.span>{' '}
                    for 31% off any annual plan!
                  </motion.p>
                  <motion.div
                    className="flex justify-between items-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.div
                      className="text-xs text-muted-foreground"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      Offer ends October 31
                    </motion.div>
                    <motion.button
                      className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      Claim Now
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  content,
  className = '',
}: {
  content: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`bento-card bg-card border border-border/50 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        duration: 0.5,
      }}
      viewport={{ once: true }}
    >
      <div className="p-6 h-full">{content}</div>
    </motion.div>
  );
}
