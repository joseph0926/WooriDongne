import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = '7d';

export const createToken = (userId: string) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  cookies().set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
};

export const getUserId = () => {
  const tokenCookie = cookies().get('token');

  if (!tokenCookie) {
    throw new Error('유효하지 않은 자격증명입니다.');
  }

  const { userId } = jwt.verify(tokenCookie.value, JWT_SECRET) as { userId: string };

  return userId;
};
