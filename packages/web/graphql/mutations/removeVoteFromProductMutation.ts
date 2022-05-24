import { gql } from "@apollo/client";
import { errorFieldsFragment } from "../fragments/errorFieldsFragment";

export const removeVoteFromProductMutation = gql`
  mutation RemoveVoteFromProduct($input: RemoveVoteFromProductInput!) {
    removeVoteFromProduct(input: $input) {
      ok
      errors {
        ...ErrorFieldsFragment
      }
      product {
        id
        temperature
        userVoteType
      }
    }
  }

  ${errorFieldsFragment}
`;
