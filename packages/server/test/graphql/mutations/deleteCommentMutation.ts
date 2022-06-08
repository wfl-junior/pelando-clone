import { gql } from "@apollo/client";
import { fieldErrorFieldsFragment } from "../fragments/fieldErrorFieldsFragment";

export const deleteCommentMutation = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      ok
      errors {
        ...FieldErrorFieldsFragment
      }
    }
  }

  ${fieldErrorFieldsFragment}
`;
