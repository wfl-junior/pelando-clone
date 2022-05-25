import { gql } from "apollo-server-express";

export const storesQuery = gql`
  query StoresQuery($input: PaginatedQueryInput) {
    stores(input: $input) {
      stores {
        edges {
          id
          createdAt
          slug
          name
          url
          image
        }
      }
    }
  }
`;
