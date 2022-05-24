import { gql } from "@apollo/client";
import { errorFieldsFragment } from "../fragments/errorFieldsFragment";

export const voteOnProductMutation = gql`
  mutation VoteOnProduct($input: VoteOnProductInput!) {
    voteOnProduct(input: $input) {
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
