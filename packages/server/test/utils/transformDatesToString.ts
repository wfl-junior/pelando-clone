import { isObject } from "@/src/utils/isObject";

type DateToString<T> = T extends Date ? string : T;

type EntityDatesTransformed<T extends {}> = {
  [K in keyof T]: DateToString<T[K]>;
};

/**
 * Necessário para testes porque TypeORM retorna dates como object,
 * porém na api graphql serializa como string
 */
export function transformEntitiesDatesToString<T extends {}>(
  entities: T[],
): Array<EntityDatesTransformed<T>> {
  return entities.map(entity => transformEntityDatesToString(entity));
}

export function transformEntityDatesToString<T extends {}>(
  entity: T,
): EntityDatesTransformed<T> {
  const copy: any = { ...entity };

  for (const key in copy) {
    const value = copy[key];

    if (value instanceof Date) {
      copy[key] = value.toISOString();
    } else if (Array.isArray(value)) {
      copy[key] = transformEntitiesDatesToString(value);
    } else if (isObject(value)) {
      copy[key] = transformEntityDatesToString(value);
    }
  }

  return copy;
}
