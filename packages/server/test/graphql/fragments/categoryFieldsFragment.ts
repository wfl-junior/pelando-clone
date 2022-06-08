import { gql } from "@apollo/client";

export const categoryFieldsFragment = gql`
  fragment CategoryFieldsFragment on Category {
    id
    createdAt
    slug
    title
  }
`;
