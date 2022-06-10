import { gql } from "@apollo/client";

export const commentsQuery = gql`
  query CommentsQuery($input: CommentsQueryInput!) {
    comments(input: $input) {
      comments {
        info {
          total
          hasNextPage
          hasPreviousPage
        }
        edges {
          id
          createdAt
          body
          user {
            id
            username
            image
          }
        }
      }
    }
  }
`;
