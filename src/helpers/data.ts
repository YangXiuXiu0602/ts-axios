import { isPlainObject } from "./utils";

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }

  return data;
}

export function transformResponce(data: any): any {
  if (typeof data === "string") {
    try {
      data = JSON.stringify(data);
    } catch (error) {}
  }

  return data;
}
