import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type SafeParseReturnType, z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validate<T>(schema: z.ZodSchema<T>, data: T) {
  return schema.safeParse(data);
}

export const getValidationErrors = <T>(result: SafeParseReturnType<T, T>) => {
  return (
    result.error?.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    })) || []
  );
};
