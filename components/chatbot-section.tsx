'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatbotSection() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi there! I'm your Second Brain assistant. I can help you find information, summarize content, or answer questions about your saved notes. How can I help you today?",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate assistant response
    setTimeout(() => {
      const responses = [
        'I found several notes related to that topic in your Second Brain. Would you like me to summarize them?',
        'Based on your saved content, here are some relevant insights that might help you with that.',
        "I've analyzed your notes and found some interesting connections you might want to explore.",
        "I don't have enough information about that in your Second Brain yet. Would you like to add some content on this topic?",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: randomResponse },
      ]);
    }, 1000);
  };
  // Add a ref for the chat container
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Only load messages when the component is in view
  useEffect(() => {
    if (!chatContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Auto-scroll to bottom once when the chat comes into view
          scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(chatContainerRef.current);

    return () => observer.disconnect();
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current && chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      if (scrollHeight > clientHeight) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);

  return (
    <section ref={scrollRef} className="relative py-16 px-4">
      <div className="absolute inset-0 bg-gradient-to-tl from-primary/11 to-secondary -z-10" />
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space-grotesk">
            Chat with Your <span className="text-primary">Second Brain</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ask questions, find connections, and get insights from your personal
            knowledge base.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            className="bg-card border border-border rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: [-1, 1, -1],
              transition: {
                rotate: {
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut',
                },
                opacity: { duration: 0.5 },
                y: { duration: 0.5 },
              },
            }}
            whileHover={{
              rotate: 0,
              scale: 1.1,
              transition: {
                type: 'spring',
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
              className="h-96 overflow-y-auto p-4 space-y-4"
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: message.role === 'user' ? 20 : -20,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: 'spring',
                    duration: 0.5,
                    delay: index * 0.1,
                    bounce: 0.3,
                  }}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      transition: { type: 'spring', stiffness: 400 },
                    }}
                    className={`
                      flex gap-3 max-w-[80%] rounded-lg p-3
                      ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-secondary text-secondary-foreground'
                      }
                    `}
                  >
                    {message.role === 'assistant' && (
                      <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        <Bot className="h-5 w-5 mt-1 shrink-0" />
                      </motion.div>
                    )}
                    <div>{message.content}</div>
                    {message.role === 'user' && (
                      <motion.div
                        initial={{ rotate: 10 }}
                        animate={{ rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        <User className="h-5 w-5 mt-1 shrink-0" />
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-border"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask your Second Brain..."
                  className="flex-1 px-4 py-2 bg-background border border-input rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="submit"
                  className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  disabled={!input.trim()}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
