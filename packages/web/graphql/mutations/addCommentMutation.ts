import { gql } from "@apollo/client";
import { commentFieldsFragment } from "../fragments/commentFieldsFragment";
import { errorFieldsFragment } from "../fragments/errorFieldsFragment";

export const addCommentMutation = gql`
  mutation AddCommentMutation($input: AddCommentInput!) {
    addComment(input: $input) {
      ok
      errors {
        ...ErrorFieldsFragment
      }
      comment {
        ...CommentFieldsFragment
      }
    }
  }

  ${errorFieldsFragment}
  ${commentFieldsFragment}
`;
