'use server';

import { db } from '@/lib/db';
import { hashPassword } from '@/lib/passwordUtil';
import { signInSchema, signUpSchema } from '@/lib/schema/auth.schema';
import { SignUpResponseType } from '@/types/auth.type';
import { ServerActionProps, ServerActionResponseType } from '@/types/common.type';

/**
 * 로그인 서버 액션 함수
 */
export const signin = async (props: ServerActionProps) => {};

/**
 * 회원가입 서버 액션 함수
 */
export const signup = async (
  props: ServerActionProps
): Promise<ServerActionResponseType<SignUpResponseType>> => {
  const { formData } = props;

  const data = signUpSchema.parse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
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
