import { AddressType, RegionalInfo } from '@/types/profile.type';

/**
 * daum-postcode 데이터에서 필요한 데이터만 추출하는 함수
 * @param data
 * @returns { city, district, neighborhood }
 */
export function parseAddress(data: AddressType): RegionalInfo {
  const { sido, sigungu, bname } = data;

  const city = sido.trim();
  const district = sigungu.trim();
  const neighborhood = bname.trim();

  return { city, district, neighborhood };
}

/**
 * address 대표 네임 생성 함수
 * @param city
 * @param district
 * @param neighborhood
 * @returns `${district} ${neighborhood}`
 */
export function createRegionName(city: string, district: string, neighborhood: string): string {
  return `${district} ${neighborhood}`;
}
