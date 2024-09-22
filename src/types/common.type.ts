export type ServerActionResponseType<T> = {
  success: boolean;
  message: string;
  data: T | null;
};
