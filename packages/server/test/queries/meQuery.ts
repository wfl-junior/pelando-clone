import { gql } from "@apollo/client";

export const meQuery = gql`
  query MeQuery {
    me {
      ok
      errors {
        path
        message
      }
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
