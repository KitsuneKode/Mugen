'use client';
import Link from 'next/link';
import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SignIn() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 star-bg">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-xl p-8 shadow-xl">
          <div className="flex flex-col items-center mb-8">
            <Brain className="h-12 w-12 text-primary mb-4" />
            <h1 className="text-2xl font-bold halloween-font">Welcome Back</h1>
            <p className="text-muted-foreground text-center mt-2">
              Sign in to access your Second Brain
            </p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <Button className="w-full">Sign In</Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
