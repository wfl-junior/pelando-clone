import { gql } from "@apollo/client";
import { fieldErrorFieldsFragment } from "../fragments/fieldErrorFieldsFragment";
import { productFieldsFragment } from "../fragments/productFieldsFragment";

export const removeVoteFromProductMutation = gql`
  mutation RemoveVoteFromProduct($input: RemoveVoteFromProductInput!) {
    removeVoteFromProduct(input: $input) {
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
