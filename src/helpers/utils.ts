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
