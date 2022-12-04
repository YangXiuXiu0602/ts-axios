import { AxiosRequestConfig, AxiosResponce } from "../types";

class AxiosError extends Error {
  isAxiosError: boolean = true;
  constructor(
    message: string,
    public config: AxiosRequestConfig,
    public code: string | null,
    public request?: any,
    public responce?: AxiosResponce
  ) {
    super(message);

    Object.setPrototypeOf(this, AxiosError.prototype);
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code: string | null,
  request?: any,
  responce?: AxiosResponce
) {
  const error = new AxiosError(message, config, code, request, responce);

  return error;
}
