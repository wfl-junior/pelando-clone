import { gql } from "@apollo/client";
import { fieldErrorFieldsFragment } from "../fragments/fieldErrorFieldsFragment";
import { userFieldsFragment } from "../fragments/userFieldsFragment";

export const meQuery = gql`
  query MeQuery {
    me {
      ok
      errors {
        ...FieldErrorFieldsFragment
      }
      user {
        ...UserFieldsFragment
      }
    }
  }

  ${fieldErrorFieldsFragment}
  ${userFieldsFragment}
`;
