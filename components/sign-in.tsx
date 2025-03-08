'use client';

import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { motion } from 'framer-motion';

export default function SignInComponent() {
  const router = useRouter();
  const email = useRef('');
  const password = useRef('');

  const [requiredError, setRequiredError] = useState({
    emailReq: false,
    passReq: false,
  });
  const passwordRef = useRef<HTMLInputElement>(null);
  const [checkingPassword, setCheckingPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    email.current = e.target.value;
    console.log(email.current);
    setRequiredError((prevState) => ({
      ...prevState,
      emailReq: false,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    password.current = e.target.value;
    console.log(password.current);
    setRequiredError((prevState) => ({
      ...prevState,
      passReq: false,
    }));
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLButtonElement>) => {
    const loadId = toast.loading('Signing in...');
    if (e) {
      e.preventDefault();
    }

    if (!email.current || !password.current) {
      toast.dismiss(loadId);
      setRequiredError({
        emailReq: email.current ? false : true,
        passReq: password.current ? false : true,
      });
      return;
    }
    email.current = email.current.trim();

    setCheckingPassword(true);
    const res = await signIn('credentials', {
      email: email.current,
      password: password.current,
      redirect: false,
    });

    toast.dismiss(loadId);
    if (res?.error) {
      // router.push('/error');
      if (res.status === 401) {
        toast.error('Invalid Credentials, try again!');
      } else if (res.status === 400) {
        toast.error('Missing Credentials!');
      } else if (res.status === 404) {
        toast.error('Account not found!');
      } else if (res.status === 403) {
        toast.error('Forbidden!');
      } else {
        toast.error('oops something went wrong..!');
      }
      setCheckingPassword(false);
    } else {
      setCheckingPassword(false);
      router.push('/dashboard');
    }
    toast.success('Signed In Successfully');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 star-bg"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          whileHover={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
          transition={{ duration: 0.3 }}
          className="bg-card border border-border rounded-xl p-8 shadow-xl"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col items-center mb-8"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex items-center hover:scale-105 ">
                <Brain className="h-12 w-12 text-primary mb-4" />
              </Link>
            </motion.div>
            <h1 className="text-2xl font-bold halloween-font">Welcome Back</h1>
            <p className="text-muted-foreground text-center mt-2">
              Sign in to access your Second Brain
            </p>
          </motion.div>

          <div className="space-y-4">
            <form className="space-y-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="focus:ring-none border-none bg-primary/5 focus:outline-none"
                  name="email"
                  id="email"
                  placeholder="name@email.com"
                  onChange={handleEmailChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit();
                    }
                  }}
                />

                {requiredError.emailReq && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    href="mailto:bhuyanmanash2002@gmail.com"
                    target="_blank"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    ref={passwordRef}
                    onChange={(e) => {
                      console.log('ficlll');
                      handlePasswordChange(e);
                    }}
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/50"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setIsPasswordVisible(false);
                        handleSubmit();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 flex h-10 items-center px-4 text-neutral-500"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {requiredError.passReq && (
                  <span className="text-red-500">Password is required</span>
                )}
              </div>

              <Button
                className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:opacity-90"
                disabled={
                  !email.current || !password.current || checkingPassword
                }
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </form>
          </div>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
