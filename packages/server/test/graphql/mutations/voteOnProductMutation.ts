import { gql } from "@apollo/client";
import { fieldErrorFieldsFragment } from "../fragments/fieldErrorFieldsFragment";

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
`;
