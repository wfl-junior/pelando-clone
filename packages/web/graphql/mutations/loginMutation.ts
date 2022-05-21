import { gql } from "@apollo/client";
import { errorFieldsFragment } from "../fragments/errorFieldsFragment";

export const loginMutation = gql`
  mutation LoginMutation($input: LoginInput!) {
    login(input: $input) {
      ok
      errors {
        ...ErrorFieldsFragment
      }
      accessToken
    }
  }

  ${errorFieldsFragment}
`;
