import { isDate, isPlainObject } from "./utils";

export function encode(val: string) {
  return encodeURIComponent(val)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}

export function buildUrl(url: string, params?: any) {
  const parts: string[] = [];

  Object.keys(params).forEach(key => {
    let val = params[key];

    let values = [];
    if (Array.isArray(val)) {
      values = val;
      key += "[]";
    } else {
      values = [val];
    }

    values.forEach(value => {
      if (isDate(value)) {
        value = value.toISOString();
      } else if (isPlainObject(value)) {
        value = JSON.stringify(value);
      }
      parts.push(`${encode(key)}=${encode(value)}`);
    });
  });

  const nomalizerParams = parts.join("&");
  if (nomalizerParams) {
    const markIndex = url.indexOf("#");
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }

    url += (url.includes("?") ? "&" : "?") + nomalizerParams;
  }

  return url;
}
