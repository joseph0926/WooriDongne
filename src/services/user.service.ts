import { db } from '@/lib/db';
import { excludePassword } from '@/lib/passwordUtil';
import { getUserId } from '@/lib/tokenUtil';
import { UserResponseType } from '@/types/auth.type';
import { CustomResponseType } from '@/types/common.type';

export const getUserInfo = async (): Promise<CustomResponseType<UserResponseType>> => {
  try {
    const userId = getUserId();

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return {
        data: null,
        message: '유저 정보를 찾을 수 없습니다.',
        success: false,
      };
    }

    return {
      data: {
        user: excludePassword(user),
      },
      message: '유저 정보를 불러왔습니다.',
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      message: '유저 정보를 찾을 수 없습니다.',
      success: false,
    };
  }
};
