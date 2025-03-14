import { PrismaClient } from '@prisma/client';
import { inferAsyncReturnType } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export const prisma = new PrismaClient();

export async function createContext({ req }: FetchCreateContextFnOptions) {
  return {
    req,
    prisma,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
