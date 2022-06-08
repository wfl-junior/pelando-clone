import { gql } from "@apollo/client";
import { fieldErrorFieldsFragment } from "../fragments/fieldErrorFieldsFragment";
import { productFieldsFragment } from "../fragments/productFieldsFragment";

export const voteOnProductMutation = gql`
  mutation VoteOnProduct($input: VoteOnProductInput!) {
    voteOnProduct(input: $input) {
      ok
      errors {
        ...FieldErrorFieldsFragment
      }
      product {
        ...ProductFieldsFragment
      }
    }
  }

  ${fieldErrorFieldsFragment}
  ${productFieldsFragment}
`;
