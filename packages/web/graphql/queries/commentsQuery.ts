import { gql } from "@apollo/client";
import { commentFieldsFragment } from "../fragments/commentFieldsFragment";

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
          ...CommentFieldsFragment
        }
      }
    }
  }

  ${commentFieldsFragment}
`;
