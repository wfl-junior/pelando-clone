import { gql } from "apollo-server-express";

export const productsQuery = gql`
  query ProductsQuery($input: ProductsQueryInput) {
    products(input: $input) {
      products {
        edges {
          id
        }
      }
    }
  }
`;
