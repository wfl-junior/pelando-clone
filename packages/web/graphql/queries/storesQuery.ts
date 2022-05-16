import { gql } from "@apollo/client";

export const storesQuery = gql`
  query ($input: PaginatedQueryInput) {
    stores(input: $input) {
      ok
      errors {
        path
        message
      }
      stores {
        info {
          perPage
          from
          to
          total
          hasNextPage
          hasPreviousPage
        }
        edges {
          id
          name
          slug
        }
      }
    }
  }
`;
