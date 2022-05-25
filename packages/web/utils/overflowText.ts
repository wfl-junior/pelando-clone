export function overflowText(text: string, max: number) {
  if (text.length > max) {
    return `${text.substring(0, max)}...`;
  }

  return text;
}
