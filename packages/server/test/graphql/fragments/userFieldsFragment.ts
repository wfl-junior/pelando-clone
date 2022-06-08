import { gql } from "@apollo/client";

export const userFieldsFragment = gql`
  fragment UserFieldsFragment on User {
    id
    createdAt
    username
    email
    image
  }
`;
