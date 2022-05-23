import type { BasicObjectType, DeepNonNullable } from "@/src/@types/app";
import { isObject } from "./isObject";

export function removeNullPropertiesDeep<T extends BasicObjectType>(object: T) {
  const copy = { ...object };

  for (const key in copy) {
    const value = copy[key];

    if (value === null) {
      delete copy[key];
    } else if (isObject(value)) {
      copy[key] = removeNullPropertiesDeep(value);
    }
  }

  return copy as DeepNonNullable<T>;
}
