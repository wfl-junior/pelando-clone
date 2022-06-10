import { gql } from "@apollo/client";
import { errorFieldsFragment } from "../fragments/errorFieldsFragment";

export const deleteCommentMutation = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      ok
      errors {
        ...ErrorFieldsFragment
      }
    }
  }

  ${errorFieldsFragment}
`;
