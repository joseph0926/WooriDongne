export type CustomResponseType<T> = {
  success: boolean;
  message: string;
  data: T | null;
};
