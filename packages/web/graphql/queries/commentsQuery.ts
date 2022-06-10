import { gql } from "@apollo/client";

export const commentsQuery = gql`
  query CommentsQuery($input: CommentsQueryInput!) {
    comments(input: $input) {
      comments {
        info {
          hasNextPage
          hasPreviousPage
        }
        edges {
          id
          createdAt
          body
          user {
            username
            image
          }
        }
      }
    }
  }
`;
