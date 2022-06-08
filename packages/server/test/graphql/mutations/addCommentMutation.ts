import { gql } from "@apollo/client";
import { commentFieldsFragment } from "../fragments/commentFieldsFragment";
import { fieldErrorFieldsFragment } from "../fragments/fieldErrorFieldsFragment";

export const addCommentMutation = gql`
  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input) {
      ok
      errors {
        ...FieldErrorFieldsFragment
      }
      comment {
        ...CommentFieldsFragment
      }
    }
  }

  ${fieldErrorFieldsFragment}
  ${commentFieldsFragment}
`;
