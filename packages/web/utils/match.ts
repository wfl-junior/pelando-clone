/**
 * Similar ao operador match de PHP
 * @description retorna options[value] se existir, caso contrário, retorna defaultValue
 */
export function match<
  TOptions extends Record<string | number, any>,
  TDefaultValue,
>(
  value: any,
  options: TOptions,
  defaultValue: TDefaultValue,
): TOptions[keyof TOptions] | TDefaultValue {
  return options[value] ?? defaultValue;
}
