/**
 * Similar ao operador match de PHP
 * @description retorna options[possibleKey] se existir, caso contrário, retorna defaultValue
 */
export function match<
  TOptions extends Record<string | number, any>,
  TDefaultValue,
>(
  possibleKey: unknown,
  options: TOptions,
  defaultValue: TDefaultValue,
): TOptions[keyof TOptions] | TDefaultValue {
  if (typeof possibleKey !== "string" && typeof possibleKey !== "number") {
    return defaultValue;
  }

  if (possibleKey in options) {
    return options[possibleKey];
  }

  return defaultValue;
}
