'use client';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Brain } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { getValidationErrors, validate } from '@/lib/utils';
import { userObject } from '@/lib/zod-schema';
import { motion } from 'framer-motion';

export default function SignUp() {
  const router = useRouter();
  const email = useRef('');
  const password = useRef('');
  const checkbox = useRef('');
  const firstNameRef = useRef('');
  const lastNameRef = useRef('');

  const [requiredError, setRequiredError] = useState({
    emailReq: false,
    checkboxReq: false,
    passReq: false,
    fnameReq: false,
    lnameReq: false,
  });
  const passwordRef = useRef<HTMLInputElement>(null);
  const [checkingPassword, setCheckingPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    email.current = e.target.value;
    setRequiredError((prevState) => ({
      ...prevState,
      emailReq: false,
    }));
  };
  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkbox.current = e.target.value;
    setRequiredError((prevState) => ({
      ...prevState,
      checkboxReq: false,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    password.current = e.target.value;
    setRequiredError((prevState) => ({
      ...prevState,
      passReq: false,
    }));
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLButtonElement>) => {
    const loadId = toast.loading('Creating an Account...');
    if (e) {
      e.preventDefault();
    }

    if (
      !email.current ||
      !password.current ||
      !lastNameRef.current ||
      !checkbox.current ||
      !firstNameRef.current
    ) {
      toast.dismiss(loadId);

      setRequiredError({
        emailReq: email.current ? false : true,
        passReq: password.current ? false : true,
        checkboxReq: checkbox.current ? false : true,
        fnameReq: firstNameRef.current ? false : true,
        lnameReq: lastNameRef.current ? false : true,
      });
      return;
    }
    setCheckingPassword(true);

    const result = validate(userObject, {
      email: email.current,
      firstName: firstNameRef.current,
      lastName: lastNameRef.current,
      password: password.current,
    });
    if (!result.success) {
      toast.dismiss(loadId);

      const errors = getValidationErrors(result);

      toast.error(errors[0].message);
      setCheckingPassword(false);

      return;
    }
    try {
      const res = await axios.post(
        '/api/signup',
        {
          firstName: firstNameRef.current,
          email: email.current,
          lastName: lastNameRef.current,
          password: password.current,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast.dismiss(loadId);
      if (res.status === 200) {
        router.push('/signin');
        toast.success('Account Created');
      }
    } catch (error: any) {
      toast.dismiss(loadId);
      console.error(error);
      const res = error?.response;
      if (res?.status === 401) {
        toast.error('Invalid Credentials, try again!');
      } else if (res?.status === 400) {
        toast.error('Missing Credentials!');
      } else if (res?.status === 404) {
        toast.error('Account creation failed');
      } else if (res?.status === 403) {
        toast.error('Account already exists!');
      } else {
        toast.error('oops something went wrong..!');
      }
    }
    setCheckingPassword(false);
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
              <Brain className="h-12 w-12 text-primary mb-4" />
            </motion.div>
            <h1 className="text-2xl font-bold halloween-font">
              Create Your Second Brain
            </h1>
            <p className="text-muted-foreground text-center mt-2">
              Sign up to start organizing your digital life
            </p>
          </motion.div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/50"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    firstNameRef.current = e.target.value;
                    setRequiredError((prevState) => ({
                      ...prevState,
                      fnameReq: false,
                    }));
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    lastNameRef.current = e.target.value;
                    setRequiredError((prevState) => ({
                      ...prevState,
                      lnameReq: false,
                    }));
                  }}
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

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

            <div className="flex items-center gap-2">
              <Input
                id="terms"
                type="checkbox"
                onChange={handleTermChange}
                className="h-4 w-4 rounded border-input bg-background text-primary focus:outline-hidden focus:ring-2 focus:ring-primary/50"
              />
              <Label htmlFor="terms" className="text-xs text-muted-foreground">
                I agree to the{' '}
                <Link href="#terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
              {requiredError.checkboxReq && (
                <span className="text-red-500">Agree to terms is required</span>
              )}
            </div>
            <Button
              className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:opacity-90"
              disabled={
                !email.current ||
                !password.current ||
                !checkbox.current ||
                !lastNameRef.current ||
                !firstNameRef.current ||
                checkingPassword
              }
              onClick={handleSubmit}
            >
              Create an Account
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
