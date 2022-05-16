export function getReadableDate(date: string | Date): string {
  if (typeof date === "string") {
    date = new Date(date);
  }

  const now = new Date();

  const differenceInSeconds = Math.ceil((+now - +date) / 1000);

  const seconds = Math.floor(differenceInSeconds % 60);
  const minutes = Math.floor((differenceInSeconds / 60) % 60);
  const hours = Math.floor((differenceInSeconds / (60 * 60)) % 24);
  const days = Math.floor(differenceInSeconds / (60 * 60 * 24));

  if (days) {
    if (days === 1) {
      return "ontem";
    }

    const monthNames = [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ];

    return `${date.getDate()} ${monthNames[date.getMonth()]}`;
  }

  if (hours) {
    return `${hours} h`;
  }

  if (minutes) {
    return `${minutes} min`;
  }

  return `${seconds} seg`;
}
