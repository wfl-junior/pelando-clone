import { gql } from "apollo-server-express";
import { fieldErrorFieldsFragment } from "../fragments/fieldErrorFieldsFragment";
import { storeFieldsFragment } from "../fragments/storeFieldsFragment";

export const storesQuery = gql`
  query StoresQuery($input: PaginatedQueryInput) {
    stores(input: $input) {
      ok
      errors {
        ...FieldErrorFieldsFragment
      }
      stores {
        edges {
          ...StoreFieldsFragment
        }
      }
    }
  }

  ${fieldErrorFieldsFragment}
  ${storeFieldsFragment}
`;
