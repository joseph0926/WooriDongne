import { AddressType, RegionalInfo } from '@/types/profile.type';

export function parseAddress(data: AddressType): RegionalInfo {
  const { sido, sigungu, bname } = data;

  const city = sido.trim();
  const district = sigungu.trim();
  const neighborhood = bname.trim();

  return { city, district, neighborhood };
}

export function createRegionName(city: string, district: string, neighborhood: string): string {
  return `${district} ${neighborhood}`;
}
