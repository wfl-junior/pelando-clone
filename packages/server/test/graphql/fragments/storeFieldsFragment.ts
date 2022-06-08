import { gql } from "@apollo/client";

export const storeFieldsFragment = gql`
  fragment StoreFieldsFragment on Store {
    id
    createdAt
    slug
    name
    url
    image
  }
`;
