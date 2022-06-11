import { gql } from "@apollo/client";
import { errorFieldsFragment } from "../fragments/errorFieldsFragment";

export const addCommentMutation = gql`
  mutation AddCommentMutation($input: AddCommentInput!) {
    addComment(input: $input) {
      ok
      errors {
        ...ErrorFieldsFragment
      }
      comment {
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

  ${errorFieldsFragment}
`;
