import { RegionalGroup } from '@prisma/client';

export type AddressType = {
  address: string;
  zonecode: string;
  sido: string;
  sigungu: string;
  bname: string;
};

export type ProfilePayloadType = {
  name: string;
  address: AddressType;
  tags: string[];
};

export type ProfileResponseType = {
  name: string;
  regionalGroup: RegionalGroup;
  tags: string[];
  userId: string;
};

export type RegionalInfo = {
  city: string;
  district: string;
  neighborhood: string;
};
