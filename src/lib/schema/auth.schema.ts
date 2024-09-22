import { z } from 'zod';

/**
 * 로그인 스키마입니다
 */
export const signInSchema = z.object({
  email: z.string().email({ message: '유효하지 않은 이메일 형식입니다.' }),
  password: z
    .string()
    .min(1, { message: '비밀번호를 입력해주세요.' })
    .max(12, { message: '비밀번호는 최대 12자입니다.' })
    .regex(/[A-Z]/, { message: '비밀번호에는 최소 1개의 대문자가 포함되어야 합니다.' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: '비밀번호에는 최소 1개의 특수문자가 포함되어야 합니다.',
    })
    .regex(/[a-zA-Z]/, { message: '비밀번호는 영어와 숫자의 조합이어야 합니다.' })
    .regex(/\d/, { message: '비밀번호는 영어와 숫자의 조합이어야 합니다.' }),
});
export type SignInType = z.infer<typeof signInSchema>;

/**
 * 회원가입 스키마입니다
 */
export const signUpSchema = z.object({
  username: z
    .string()
    .min(1, { message: '닉네임을 입력해주세요' })
    .max(20, { message: '넥네임은 최대 20자입니다.' }),
  email: z.string().email({ message: '유효하지 않은 이메일 형식입니다.' }),
  password: z
    .string()
    .min(1, { message: '비밀번호를 입력해주세요.' })
    .max(12, { message: '비밀번호는 최대 12자입니다.' })
    .regex(/[A-Z]/, { message: '비밀번호에는 최소 1개의 대문자가 포함되어야 합니다.' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: '비밀번호에는 최소 1개의 특수문자가 포함되어야 합니다.',
    })
    .regex(/[a-zA-Z]/, { message: '비밀번호는 영어와 숫자의 조합이어야 합니다.' })
    .regex(/\d/, { message: '비밀번호는 영어와 숫자의 조합이어야 합니다.' }),
});
