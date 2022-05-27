import { gql } from "@apollo/client";
import { errorFieldsFragment } from "../fragments/errorFieldsFragment";

export const loginWithGoogleMutation = gql`
  mutation LoginWithGoogleMutation {
    loginWithGoogle {
      ok
      errors {
        ...ErrorFieldsFragment
      }
      accessToken
    }
  }

  ${errorFieldsFragment}
`;
