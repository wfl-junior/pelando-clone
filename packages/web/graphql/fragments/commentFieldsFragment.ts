import { gql } from "@apollo/client";

export const commentFieldsFragment = gql`
  fragment CommentFieldsFragment on Comment {
    id
    createdAt
    body
    edited
    user {
      id
      username
      image
    }
  }
`;
