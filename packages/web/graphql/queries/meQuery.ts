import { gql } from "@apollo/client";

export const meQuery = gql`
  query MeQuery {
    me {
      user {
        id
        createdAt
        email
        username
        image
      }
    }
  }
`;
