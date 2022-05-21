import { gql } from "@apollo/client";

export const meQuery = gql`
  query MeQuery {
    me {
      user {
        createdAt
        email
        username
        image
      }
    }
  }
`;
