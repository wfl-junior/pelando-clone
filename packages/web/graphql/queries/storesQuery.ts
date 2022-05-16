import { gql } from "@apollo/client";
import { errorFieldsFragment } from "../fragments/errorFieldsFragment";
import { pageInfoFieldsFragment } from "../fragments/pageInfoFieldsFragment";

export const storesQuery = gql`
  query StoresQuery($input: PaginatedQueryInput) {
    stores(input: $input) {
      ok
      errors {
        ...ErrorFieldsFragment
      }
      stores {
        info {
          ...PageInfoFieldsFragment
        }
        edges {
          id
          name
          slug
        }
      }
    }
  }

  ${errorFieldsFragment}
  ${pageInfoFieldsFragment}
`;
