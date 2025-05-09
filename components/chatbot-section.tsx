'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import ChatBot from './chatbot';

export default function ChatbotSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!scrollRef.current) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const [entry] = entries;
  //       if (entry.isIntersecting) {
  //         const targetPosition =
  //           scrollRef.current!.offsetTop - window.innerHeight / 5;
  //         window.scrollTo({
  //           top: targetPosition,
  //           behavior: 'smooth',
  //         });
  //       }
  //     },
  //     {
  //       threshold: 0.1,
  //       rootMargin: '100px',
  //     }
  //   );

  //   observer.observe(scrollRef.current);

  //   return () => observer.disconnect();
  // }, []);

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
        <div>
          <ChatBot />
        </div>
      </div>
    </section>
  );
}
