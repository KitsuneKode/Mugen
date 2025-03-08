'use client';
import { motion } from 'framer-motion';

export default function () {
  return (
    <div className="container mx-auto my-auto px-4 mb-2">
      <motion.div
        className="text-center mb-4"
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
    </div>
  );
}
