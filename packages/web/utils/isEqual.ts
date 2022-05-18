import { isObject } from "./isObject";

export function isEqual(first: any, second: any): boolean {
  if (first === second) {
    return true;
  }

  if (Array.isArray(first) && Array.isArray(second)) {
    if (first.length !== second.length) {
      return false;
    }

    return first.every((v, i) => isEqual(v, second[i]));
  }

  if (isObject(first) && isObject(second)) {
    const firstKeys = Object.keys(first);
    const secondKeys = Object.keys(second);

    if (firstKeys.length !== secondKeys.length) {
      return false;
    }

    return firstKeys.every(
      key => second.hasOwnProperty(key) && isEqual(first[key], second[key]),
    );
  }

  return false;
}
