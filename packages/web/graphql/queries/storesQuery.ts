import { gql } from "@apollo/client";

export const storesQuery = gql`
  query StoresQuery($input: PaginatedQueryInput) {
    stores(input: $input) {
      stores {
        edges {
          id
          name
          slug
        }
      }
    }
  }
`;
