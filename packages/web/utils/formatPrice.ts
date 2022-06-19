/**
 * @description formata preço em BRL
 *
 * @example
 * 69 -> R$69,00
 * 0 -> Grátis
 */
export function formatPrice(price: number): string {
  if (price <= 0) {
    return "Grátis";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(price)
    .replace(/\s/g, "");
}
