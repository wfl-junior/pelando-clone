import { gql } from "@apollo/client";
import { productFieldsFragment } from "./productFieldsFragment";
import { userFieldsFragment } from "./userFieldsFragment";

export const commentFieldsFragment = gql`
  fragment CommentFieldsFragment on Comment {
    id
    createdAt
    body
    edited
    user {
      ...UserFieldsFragment
    }
    product {
      ...ProductFieldsFragment
    }
  }

  ${userFieldsFragment}
  ${productFieldsFragment}
`;
