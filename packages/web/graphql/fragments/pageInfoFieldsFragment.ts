import { gql } from "@apollo/client";

export const pageInfoFieldsFragment = gql`
  fragment PageInfoFieldsFragment on PageInfo {
    perPage
    from
    to
    total
    hasNextPage
    hasPreviousPage
  }
`;
