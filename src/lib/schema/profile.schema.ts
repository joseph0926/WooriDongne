import { z } from 'zod';

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, { message: '이름을 입력해주세요.' })
    .max(6, { message: '이름은 최대 6자입니다.' })
    .regex(/^[가-힣]+$/, { message: '이름은 한글만 입력 가능합니다.' }),
  address: z
    .string()
    .min(1, { message: '주소를 입력해주세요.' })
    .max(100, { message: '주소는 100자 이내로 입력해주세요.' }),
  tags: z.array(z.string().min(1).max(15)).min(1).max(5),
});
export type ProfileType = z.infer<typeof profileSchema>;
