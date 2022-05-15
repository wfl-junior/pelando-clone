import { PageInfo } from "../graphql-types/Object/PageInfo";

type GetPageInfo = (data: {
  count: number;
  perPage: number;
  offset: number;
}) => PageInfo;

export const getPageInfo: GetPageInfo = ({ count, perPage, offset }) => ({
  total: count,
  perPage,
  from: offset + 1,
  to: Math.min(offset + perPage, count),
  hasNextPage: perPage + offset < count,
  hasPreviousPage: offset > 0,
});
