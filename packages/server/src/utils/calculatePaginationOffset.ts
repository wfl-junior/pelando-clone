export function calculatePaginationOffset(page: number, perPage: number) {
  return (page - 1) * perPage;
}
