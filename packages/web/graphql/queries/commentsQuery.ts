import { gql } from "@apollo/client";

// importante atualizar outros campos de info quando adicionar comentário caso adicione para pegar outros campos de info aqui no futuro

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
