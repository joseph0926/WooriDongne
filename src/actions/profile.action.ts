'use server';

import { db } from '@/lib/db';
import { createRegionName, parseAddress } from '@/lib/regionUtil';
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

    const { city, district, neighborhood } = parseAddress(data.address);
    const regionName = createRegionName(city, district, neighborhood);

    let regionalGroup = await db.regionalGroup.findFirst({
      where: {
        city,
        district,
        neighborhood,
      },
    });

    if (!regionalGroup) {
      regionalGroup = await db.regionalGroup.create({
        data: {
          name: regionName,
          city,
          district,
          neighborhood,
        },
      });
    }

    const profile = await db.profile.create({
      data: {
        name: data.name,
        tags: data.tags,
        userId: userId,
        regionalGroupId: regionalGroup.id,
      },
      select: {
        name: true,
        tags: true,
        regionalGroup: true,
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
