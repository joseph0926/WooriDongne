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
