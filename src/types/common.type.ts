export type ServerActionProps = {
  prevState: unknown;
  formData: FormData;
};

export type ServerActionResponseType<T> = {
  success: boolean;
  message: string;
  data: T | null;
};
