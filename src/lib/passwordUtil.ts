import { User } from '@prisma/client';
import { compare, hash } from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, 10);
  return {
    hashedPassword,
  };
};

export const comparePassword = async (password: string, hashedPassword: string) => {
  const isMatch = await compare(password, hashedPassword);
  return {
    isMatch,
  };
};

export const excludePassword = (user: User): Omit<User, 'password'> => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
