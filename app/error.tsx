"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Home, Brain, Mail, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Add proper type for the error prop
interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  const errorMessages = [
    "Looks like our brain had a minor malfunction!",
    "Even the smartest systems stumble sometimes.",
    "We've hit a neural roadblock.",
    "This thought process needs a reboot.",
    "Our synapses are experiencing technical difficulties.",
  ];

  const handleNewMessage = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * errorMessages.length);
    } while (newIndex === messageIndex);
    setMessageIndex(newIndex);
  };

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-destructive/30 to-background -z-10" />

      {/* Animated dots */}
      <div className="absolute inset-0 -z-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-destructive/20"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: Math.random() * 2 + 1,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md z-10">
        <motion.div
          className="bg-card border border-border rounded-xl p-8 shadow-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="flex justify-center mb-6"
            animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
          >
            <AlertTriangle className="h-24 w-24 text-destructive" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold font-space-grotesk mb-2 text-destructive">
              Something went wrong!
            </h1>
            <h2 className="text-xl font-medium mb-6">
              We&apos;re working on it
            </h2>
          </motion.div>

          <motion.p
            className="text-lg text-muted-foreground mb-8"
            key={messageIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {errorMessages[messageIndex]}
            <Button
              onClick={handleNewMessage}
              variant="ghost"
              size="sm"
              className="ml-2"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </motion.p>

          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => reset()}
                variant="secondary"
                className="w-full"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>

              <Button variant="destructive" className="w-full" asChild>
                <Link href="mailto:bhuyanmanash2002@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Admin
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Link href="/" className="w-full">
                <Button className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>

              <Link href="/dashboard" className="w-full">
                <Button variant="outline" className="w-full">
                  <Brain className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="mt-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {error.digest && <p className="mb-2">Error Code: {error.digest}</p>}
            <p>If this problem persists, please contact our support team.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
