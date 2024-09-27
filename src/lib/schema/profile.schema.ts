import { z } from 'zod';

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, { message: '이름을 입력해주세요.' })
    .max(6, { message: '이름은 최대 6자입니다.' })
    .regex(/^[가-힣]+$/, { message: '이름은 한글만 입력 가능합니다.' }),
  address: z.object({
    address: z.string(),
    zonecode: z.string(),
    sido: z.string(),
    sigungu: z.string(),
    bname: z.string(),
  }),
  tags: z.array(z.string().min(1).max(15)).min(1).max(5),
});
export type ProfileType = z.infer<typeof profileSchema>;

export const stepOneSchema = z.object({
  name: z
    .string()
    .min(1, { message: '이름을 입력해주세요.' })
    .max(6, { message: '이름은 최대 6자입니다.' })
    .regex(/^[가-힣]+$/, { message: '이름은 한글만 입력 가능합니다.' }),
});

export const stepTwoSchema = z.object({
  address: z.object({
    address: z.string(),
    zonecode: z.string(),
    sido: z.string(),
    sigungu: z.string(),
    bname: z.string(),
  }),
});

export const stepThreeSchema = z.object({
  tags: z.array(z.string().min(1).max(15)).min(1).max(5),
});

export const profileStepSchema = stepOneSchema.merge(stepTwoSchema).merge(stepThreeSchema);

export type ProfileStepType = z.infer<typeof profileStepSchema>;
