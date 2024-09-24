import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const isPrismaNotFound = (error: any) => {
  return (
    error instanceof PrismaClientKnownRequestError && error.code === 'P2025'
  );
};

export const isPrismaUniqueConstraintViolation = (error: any) => {
  return (
    error instanceof PrismaClientKnownRequestError && error.code === 'P2002'
  );
};
