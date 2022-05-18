export function isObject(
  value: any,
): value is Record<string | number | symbol, any> {
  return Object.prototype.toString.call(value) === "[object Object]";
}
