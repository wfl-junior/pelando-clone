import { gql } from "@apollo/client";
import { commentFieldsFragment } from "../fragments/commentFieldsFragment";
import { errorFieldsFragment } from "../fragments/errorFieldsFragment";

export const editCommentMutation = gql`
  mutation EditCommentMutation($input: EditCommentInput!) {
    editComment(input: $input) {
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
