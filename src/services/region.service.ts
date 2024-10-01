import { db } from '@/lib/db';
import { getUserId } from '@/lib/tokenUtil';
import { CustomResponseType } from '@/types/common.type';
import { ProfileResponseType } from '@/types/profile.type';
import { RegionalGroup } from '@prisma/client';

export const getProfile = async (): Promise<CustomResponseType<ProfileResponseType>> => {
  try {
    const userId = getUserId();
    if (!userId || userId === '') {
      return {
        data: null,
        message: '로그인 후 이용해주세요.',
        success: false,
      };
    }

    const profile = await db.profile.findUnique({
      where: {
        userId,
      },
      include: {
        regionalGroup: true,
      },
    });
    if (!profile) {
      return {
        data: null,
        message: '프로필을 불러오는데 실패하였습니다.',
        success: false,
      };
    }

    return {
      success: true,
      data: profile,
      message: '프로필을 불러왔습니다.',
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      message: '프로필을 불러오는데 실패하였습니다.',
      success: false,
    };
  }
};

export const getRegion = async (regionId: string): Promise<CustomResponseType<RegionalGroup>> => {
  try {
    if (!regionId || regionId === '') {
      return {
        data: null,
        message: '지역 정보를 불러오는데 실패하였습니다.',
        success: false,
      };
    }

    const region = await db.regionalGroup.findUnique({
      where: {
        id: regionId,
      },
    });
    if (!region) {
      return {
        data: null,
        message: '지역 정보를 불러오는데 실패하였습니다.',
        success: false,
      };
    }

    return {
      data: region,
      success: true,
      message: '지역 정보를 불러왔습니다.',
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      message: '지역 정보를 불러오는데 실패하였습니다.',
      success: false,
    };
  }
};
