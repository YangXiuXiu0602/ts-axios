const tostring = Object.prototype.toString;

export function isDate(val: any): val is Date {
  return tostring.call(val) === "[object Date]";
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === "object";
// }

export function isPlainObject(val: any): val is Object {
  return tostring.call(val) === "[object Object]";
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any;
  }

  return to as T & U;
}
