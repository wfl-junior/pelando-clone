import { gql } from "@apollo/client";
import { commentFieldsFragment } from "../fragments/commentFieldsFragment";
import { fieldErrorFieldsFragment } from "../fragments/fieldErrorFieldsFragment";
import { productFieldsFragment } from "../fragments/productFieldsFragment";
import { userFieldsFragment } from "../fragments/userFieldsFragment";

export const commentsQuery = gql`
  query CommentsQuery($input: CommentsQueryInput!) {
    comments(input: $input) {
      ok
      errors {
        ...FieldErrorFieldsFragment
      }
      comments {
        edges {
          ...CommentFieldsFragment
          user {
            ...UserFieldsFragment
          }
          product {
            ...ProductFieldsFragment
          }
        }
      }
    }
  }

  ${fieldErrorFieldsFragment}
  ${commentFieldsFragment}
  ${userFieldsFragment}
  ${productFieldsFragment}
`;
