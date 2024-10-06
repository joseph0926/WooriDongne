'use server';

import { db } from '@/lib/db';
import { comparePassword, excludePassword, hashPassword } from '@/lib/passwordUtil';
import { signInSchema, signUpSchema } from '@/lib/schema/auth.schema';
import { createToken } from '@/lib/tokenUtil';
import {
  SignInPayloadType,
  UserResponseType,
  SignUpPayloadType,
  SignUpResponseType,
} from '@/types/auth.type';
import { CustomResponseType } from '@/types/common.type';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

/**
 * 로그인 서버 액션 함수
 */
export const signin = async (
  payload: SignInPayloadType
): Promise<CustomResponseType<UserResponseType>> => {
  const { email, password } = payload;

  const data = signInSchema.parse({
    email,
    password,
  });

  try {
    const user = await db.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return {
        success: false,
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
        data: null,
      };
    }

    const { isMatch } = await comparePassword(data.password, user.password);
    if (!isMatch) {
      return {
        success: false,
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
        data: null,
      };
    }

    createToken(user.id);

    return {
      success: true,
      message: '로그인에 성공하였습니다.',
      data: { user: excludePassword(user) },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: '로그인 중 오류가 발생하였습니다.',
      data: null,
    };
  }
};

/**
 * 회원가입 서버 액션 함수
 */
export const signup = async (
  payload: SignUpPayloadType
): Promise<CustomResponseType<SignUpResponseType>> => {
  const { username, email, password } = payload;

  const data = signUpSchema.parse({
    username,
    email,
    password,
  });

  try {
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });
    if (existingUser) {
      return {
        success: false,
        message: '이미 존재하는 아이디입니다.',
        data: null,
      };
    }

    const { hashedPassword } = await hashPassword(data.password);

    const user = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: '회원가입에 성공하였습니다.',
      data: {
        userId: user.id,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: '회원가입 중 오류가 발생하였습니다.',
      data: null,
    };
  }
};

/**
 * 로그아웃 서버 액션 함수
 */
export const logout = async (): Promise<CustomResponseType<null>> => {
  try {
    const cookieStore = cookies();
    cookieStore.delete('token');

    revalidatePath('/', 'layout');

    return {
      success: true,
      message: '로그아웃에 성공하였습니다.',
      data: null,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: '로그아웃 중 오류가 발생하였습니다.',
      data: null,
    };
  }
};
