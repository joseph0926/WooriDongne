export type ProfilePayloadType = {
  name: string;
  address: string;
  tags: string[];
};

export type ProfileResponseType = {
  name: string;
  address: string;
  tags: string[];
  userId: string;
};
