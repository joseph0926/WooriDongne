import { db } from '@/lib/db';
import { profileSchema } from '@/lib/schema/profile.schema';
import { getUserId } from '@/lib/tokenUtil';
import { CustomResponseType } from '@/types/common.type';
import { ProfilePayloadType, ProfileResponseType } from '@/types/profile.type';

/**
 * 프로필 생성 서버 액션 함수
 */
export const createProfile = async (
  payload: ProfilePayloadType
): Promise<CustomResponseType<ProfileResponseType>> => {
  const { name, address, tags } = payload;

  const data = profileSchema.parse({
    name,
    address,
    tags,
  });

  try {
    const userId = getUserId();
    if (!userId) {
      return {
        success: false,
        message: '로그인 후 이용해주세요.',
        data: null,
      };
    }
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return {
        success: false,
        message: '로그인 후 이용해주세요.',
        data: null,
      };
    }

    const profile = await db.profile.create({
      data: {
        name: data.name,
        address: data.address,
        tags: data.tags,
        userId: userId,
      },
      select: {
        name: true,
        address: true,
        tags: true,
        userId: true,
      },
    });

    return {
      success: true,
      message: '프로필 생성에 성공하였습니다.',
      data: profile,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: '프로필 생성 중 오류가 발생하였습니다.',
      data: null,
    };
  }
};
