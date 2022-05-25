import { BasicObjectType } from "@/src/@types/app";
import { isObject } from "@/src/utils/isObject";

type EntityDatesTransformed<T extends BasicObjectType> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
};

/**
 * Necessário para testes porque TypeORM retorna dates como object,
 * porém na api graphql serializa como string
 */
export function transformEntitiesDatesToString<T>(
  entities: T[],
): Array<EntityDatesTransformed<T>> {
  const copy = [...entities];

  copy.forEach((entity, index) => {
    copy[index] = transformEntityDatesToString(entity) as any;
  });

  return copy as any;
}

export function transformEntityDatesToString<T extends {}>(
  entity: T,
): EntityDatesTransformed<T> {
  const copy = { ...entity };

  for (const key in copy) {
    const value = copy[key];

    if (value instanceof Date) {
      copy[key] = value.toISOString() as any;
    }

    if (isObject(value)) {
      copy[key] = transformEntityDatesToString(value) as any;
    }
  }

  return copy as any;
}
