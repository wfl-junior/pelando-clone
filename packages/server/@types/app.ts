export interface Class<T> {
  new (...args: unknown[]): T;
}
