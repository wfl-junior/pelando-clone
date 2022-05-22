import { gql } from "@apollo/client";

export const productsQuery = gql`
  query ProductsQuery($input: ProductsQueryInput) {
    products(input: $input) {
      products {
        info {
          hasNextPage
        }
        edges {
          id
          createdAt
          price
          sourceUrl
          title
          image
          temperature
          store {
            name
          }
        }
      }
    }
  }
`;
