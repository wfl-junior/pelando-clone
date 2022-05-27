import { ucfirst } from "./ucfirst";

export function getEntityNotFoundMessage(entity: string) {
  return `${ucfirst(entity)} not found`;
}
