import { BasicObjectType } from "../@types/app";

export function isObject(value: any): value is BasicObjectType {
  return Object.prototype.toString.call(value) === "[object Object]";
}
