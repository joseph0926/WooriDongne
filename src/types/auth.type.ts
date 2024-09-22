import { User } from '@prisma/client';

/** 회원가입 응답 데이터입니다. */
export type SignUpResponseType = {
  userId: string;
};
/** 회원가입 페이로드입니다 */
export type SignUpPayloadType = {
  username: string;
  email: string;
  password: string;
};

/** 로그인 응답 데이터입니다 */
export type SignInResponseType = {
  user: Omit<User, 'password'>;
};
/** 로그인 페이로드입니다. */
export type SignInPayloadType = {
  email: string;
  password: string;
};
