import { gql } from "@apollo/client";
import { commentFieldsFragment } from "../fragments/commentFieldsFragment";
import { fieldErrorFieldsFragment } from "../fragments/fieldErrorFieldsFragment";

export const editCommentMutation = gql`
  mutation EditComment($input: EditCommentInput!) {
    editComment(input: $input) {
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
